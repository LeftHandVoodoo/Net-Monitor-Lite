export interface NetworkStats {
  downloadMbps: number
  uploadMbps: number
  timestamp: number
}

export class NetworkMonitor {
  private intervalId: ReturnType<typeof setInterval> | null = null

  /**
   * Start monitoring network throughput
   */
  start(callback: (stats: NetworkStats) => void, intervalMs: number = 1000): void {
    // Use Windows netstat / typeperf for accurate byte counters
    this.pollWindowsNetworkStats(callback, intervalMs)
  }

  /**
   * Poll Windows network stats using PowerShell
   */
  private pollWindowsNetworkStats(callback: (stats: NetworkStats) => void, intervalMs: number): void {
    const { exec } = require('child_process')
    
    let lastRx = 0
    let lastTx = 0
    let lastTime = Date.now()
    let isFirstRun = true

    const poll = () => {
      // Get network adapter statistics using PowerShell
      const psCommand = `powershell -NoProfile -Command "Get-NetAdapterStatistics | Select-Object -Property ReceivedBytes,SentBytes | ConvertTo-Json"`
      
      exec(psCommand, { windowsHide: true }, (error: Error | null, stdout: string) => {
        if (error) {
          // Fallback: return zero values
          callback({ downloadMbps: 0, uploadMbps: 0, timestamp: Date.now() })
          return
        }

        try {
          const data = JSON.parse(stdout)
          const adapters = Array.isArray(data) ? data : [data]
          
          // Sum all adapter bytes
          let currentRx = 0
          let currentTx = 0
          
          for (const adapter of adapters) {
            currentRx += adapter.ReceivedBytes || 0
            currentTx += adapter.SentBytes || 0
          }

          const currentTime = Date.now()
          const deltaTime = (currentTime - lastTime) / 1000 // seconds

          if (!isFirstRun && deltaTime > 0) {
            const deltaRx = currentRx - lastRx
            const deltaTx = currentTx - lastTx

            // Convert bytes/second to Megabits/second
            // bytes * 8 = bits, / 1_000_000 = megabits
            const downloadMbps = Math.max(0, (deltaRx * 8) / (deltaTime * 1_000_000))
            const uploadMbps = Math.max(0, (deltaTx * 8) / (deltaTime * 1_000_000))

            callback({
              downloadMbps: Math.round(downloadMbps * 100) / 100,
              uploadMbps: Math.round(uploadMbps * 100) / 100,
              timestamp: currentTime,
            })
          }

          lastRx = currentRx
          lastTx = currentTx
          lastTime = currentTime
          isFirstRun = false
        } catch {
          callback({ downloadMbps: 0, uploadMbps: 0, timestamp: Date.now() })
        }
      })
    }

    // Initial poll
    poll()
    
    // Set up interval
    this.intervalId = setInterval(poll, intervalMs)
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
