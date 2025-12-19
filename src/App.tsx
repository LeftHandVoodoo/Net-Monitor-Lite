/// <reference path="./types/global.d.ts" />
import { useEffect, useState } from 'react'
import ThroughputBar from './components/ThroughputBar'
import HistoricalGraph from './components/HistoricalGraph'
import type { NetworkStats } from './types/global'

function App() {
  const [stats, setStats] = useState<NetworkStats>({
    downloadMbps: 0,
    uploadMbps: 0,
    timestamp: Date.now(),
  })
  const [history, setHistory] = useState<NetworkStats[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Listen for network stats from main process
    if (window.electronAPI) {
      const cleanup = window.electronAPI.onNetworkStats((newStats) => {
        setStats(newStats)
        // Keep last 60 data points (1 minute of history)
        setHistory(prev => [...prev.slice(-59), newStats])
      })
      return cleanup
    }
  }, [])

  const handleClose = () => {
    window.electronAPI?.closeApp()
  }

  const handleMinimize = () => {
    window.electronAPI?.minimizeApp()
  }

  const toggleExpand = () => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    window.electronAPI?.setWindowSize(newExpanded)
  }

  return (
    <div className={`app-container ${isExpanded ? 'expanded' : 'compact'}`}>
      {/* Title bar for dragging */}
      <div className="title-bar">
        <span className="title">⚡ Net Monitor</span>
        <div className="window-controls">
          <button 
            className={`control-btn expand ${isExpanded ? 'expanded' : ''}`} 
            onClick={toggleExpand}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
          <button className="control-btn minimize" onClick={handleMinimize}>
            −
          </button>
          <button className="control-btn close" onClick={handleClose}>
            ×
          </button>
        </div>
      </div>

      {/* Throughput bars */}
      <div className="bars-container">
        <ThroughputBar
          label="Download ↓"
          value={stats.downloadMbps}
          maxValue={6000}
          type="download"
        />
        <ThroughputBar
          label="Upload ↑"
          value={stats.uploadMbps}
          maxValue={6000}
          type="upload"
        />
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="expanded-content">
          <div className="stats-header">Historical Data (Last 60s)</div>
          <HistoricalGraph history={history} maxValue={6000} />
        </div>
      )}

      {/* Resize handle */}
      <div className="resize-handle"></div>
    </div>
  )
}

export default App
