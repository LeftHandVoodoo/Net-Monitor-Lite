import { useMemo } from 'react'

interface ThroughputBarProps {
  label: string
  value: number
  maxValue: number
  type: 'download' | 'upload'
}

function ThroughputBar({ label, value, maxValue, type }: ThroughputBarProps) {
  const percentage = useMemo(() => {
    return Math.min((value / maxValue) * 100, 100)
  }, [value, maxValue])

  // Format the value for display
  const displayValue = useMemo(() => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} Gbps`
    }
    if (value >= 100) {
      return `${Math.round(value)} Mbps`
    }
    if (value >= 10) {
      return `${value.toFixed(1)} Mbps`
    }
    return `${value.toFixed(2)} Mbps`
  }, [value])

  return (
    <div className={`throughput-bar ${type}`}>
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${percentage}%` }}
        />
        <span className="bar-value">{displayValue}</span>
      </div>
      <div className="bar-scale">
        <span>0</span>
        <span>6000</span>
      </div>
    </div>
  )
}

export default ThroughputBar
