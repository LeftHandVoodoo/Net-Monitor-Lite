import { useMemo } from 'react'
import type { NetworkStats } from '../types/global'

interface HistoricalGraphProps {
  history: NetworkStats[]
  maxValue: number
}

function HistoricalGraph({ history, maxValue }: HistoricalGraphProps) {
  const chartPoints = useMemo(() => {
    if (history.length < 2) return { download: '', upload: '' }

    const width = 420
    const height = 120
    const pointCount = Math.min(history.length, 60)
    const xStep = width / Math.max(pointCount - 1, 1)

    const downloadPoints = history.slice(-pointCount).map((stat, i) => {
      const x = i * xStep
      const y = height - (stat.downloadMbps / maxValue) * height
      return `${x},${y}`
    }).join(' ')

    const uploadPoints = history.slice(-pointCount).map((stat, i) => {
      const x = i * xStep
      const y = height - (stat.uploadMbps / maxValue) * height
      return `${x},${y}`
    }).join(' ')

    return { download: downloadPoints, upload: uploadPoints }
  }, [history, maxValue])

  const currentStats = useMemo(() => {
    if (history.length === 0) return { download: 0, upload: 0, peak: { download: 0, upload: 0 } }
    
    const latest = history[history.length - 1]
    const peakDownload = Math.max(...history.map(s => s.downloadMbps))
    const peakUpload = Math.max(...history.map(s => s.uploadMbps))
    
    return {
      download: latest.downloadMbps,
      upload: latest.uploadMbps,
      peak: { download: peakDownload, upload: peakUpload }
    }
  }, [history])

  return (
    <div className="historical-graph">
      <svg width="420" height="120" className="graph-svg">
        <defs>
          <linearGradient id="download-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--download-start)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--download-start)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="upload-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--upload-start)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--upload-start)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Download area */}
        {chartPoints.download && (
          <>
            <polyline
              points={`0,120 ${chartPoints.download} 420,120`}
              fill="url(#download-gradient)"
              stroke="var(--download-start)"
              strokeWidth="2"
              className="graph-line download"
            />
          </>
        )}

        {/* Upload area */}
        {chartPoints.upload && (
          <>
            <polyline
              points={`0,120 ${chartPoints.upload} 420,120`}
              fill="url(#upload-gradient)"
              stroke="var(--upload-start)"
              strokeWidth="2"
              className="graph-line upload"
            />
          </>
        )}

        {/* Grid lines */}
        <line x1="0" y1="60" x2="420" y2="60" stroke="rgba(212,175,55,0.15)" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="0" y1="120" x2="420" y2="120" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
      </svg>

      <div className="graph-stats">
        <div className="stat-item download">
          <span className="stat-label">↓ Peak:</span>
          <span className="stat-value">{currentStats.peak.download.toFixed(1)} Mbps</span>
        </div>
        <div className="stat-item upload">
          <span className="stat-label">↑ Peak:</span>
          <span className="stat-value">{currentStats.peak.upload.toFixed(1)} Mbps</span>
        </div>
      </div>
    </div>
  )
}

export default HistoricalGraph
