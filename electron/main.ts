import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { NetworkMonitor } from './network-monitor'

// Disable GPU acceleration for a lighter window
app.disableHardwareAcceleration()

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let mainWindow: BrowserWindow | null = null
let networkMonitor: NetworkMonitor | null = null

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    minWidth: 350,
    minHeight: 180,
    maxWidth: 1000,
    maxHeight: 800,
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // Allow window to be dragged
  mainWindow.setMovable(true)

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(process.env.DIST!, 'index.html'))
  }

  // Start network monitoring
  networkMonitor = new NetworkMonitor()
  networkMonitor.start((stats) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('network-stats', stats)
    }
  })
}

// IPC handlers
ipcMain.on('toggle-always-on-top', () => {
  if (mainWindow) {
    const current = mainWindow.isAlwaysOnTop()
    mainWindow.setAlwaysOnTop(!current)
  }
})

ipcMain.on('set-window-size', (_event, expanded: boolean) => {
  if (mainWindow) {
    if (expanded) {
      mainWindow.setSize(450, 420, true) // Expanded size with animation
    } else {
      mainWindow.setSize(400, 200, true) // Compact size with animation
    }
  }
})

ipcMain.on('close-app', () => {
  app.quit()
})

ipcMain.on('minimize-app', () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

app.on('window-all-closed', () => {
  if (networkMonitor) {
    networkMonitor.stop()
  }
  app.quit()
})

app.whenReady().then(createWindow)
