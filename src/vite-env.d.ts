/// <reference types="vite/client" />

export interface NetworkStats {
  downloadMbps: number
  uploadMbps: number
  timestamp: number
}

export interface ElectronAPI {
  onNetworkStats: (callback: (stats: NetworkStats) => void) => void
  toggleAlwaysOnTop: () => void
  closeApp: () => void
  minimizeApp: () => void
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export {}

