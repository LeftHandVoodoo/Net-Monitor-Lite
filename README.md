# Net Monitor Lite

A compact, elegant real-time bandwidth throughput monitor for Windows 11.

![Net Monitor Lite](https://img.shields.io/badge/version-0.1.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%2011-lightgrey)

## Features

- **Real-time Monitoring**: Displays current download and upload speeds updated every second
- **Compact Design**: Small, always-on-top window that stays out of your way
- **Expandable View**: Click ▲ to expand and see 60-second historical trend graph
- **Elegant UI**: Dark glassmorphism theme with animated gradient bars
- **0-6000 Mbps Range**: Optimized for high-speed connections
- **Resizable Window**: Drag edges to resize or use expand button for preset sizes
- **Frameless Window**: Draggable from the title bar, minimal visual footprint

## Installation

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Building

```bash
# Build for production
npm run build
```

## Usage

1. Launch the application
2. The window displays two horizontal bar graphs:
   - **↓ Download**: Cyan/blue gradient
   - **↑ Upload**: Magenta/pink gradient
3. Drag the title bar to reposition the window
4. Click **▲** to expand and view historical trend graph (last 60 seconds)
5. Click **▼** to collapse back to compact mode
6. The window stays always-on-top by default and is fully resizable

### Window Controls

- **▲/▼** Toggle expanded/compact view
- **−** Minimize to taskbar
- **×** Close application

## Technical Details

- **Framework**: Electron + React + TypeScript
- **Bundler**: Vite
- **Network Monitoring**: Windows PowerShell `Get-NetAdapterStatistics`
- **Update Interval**: 1 second

## License

MIT License
