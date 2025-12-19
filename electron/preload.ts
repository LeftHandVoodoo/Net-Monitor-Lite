import { contextBridge, ipcRenderer } from 'electron'

export interface NetworkStats {
  downloadMbps: number
  uploadMbps: number
  timestamp: number
}

contextBridge.exposeInMainWorld('electronAPI', {
  onNetworkStats: (callback: (stats: NetworkStats) => void) => {
    const handler = (_event: any, stats: NetworkStats) => callback(stats)
    ipcRenderer.on('network-stats', handler)
    return () => ipcRenderer.removeListener('network-stats', handler)
  },
  toggleAlwaysOnTop: () => ipcRenderer.send('toggle-always-on-top'),
  closeApp: () => ipcRenderer.send('close-app'),
  minimizeApp: () => ipcRenderer.send('minimize-app'),
  setWindowSize: (expanded: boolean) => ipcRenderer.send('set-window-size', expanded),
})
