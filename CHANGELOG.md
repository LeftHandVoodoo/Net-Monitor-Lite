# Changelog

All notable changes to Net Monitor Lite will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Dynamically expandable GUI with expand/collapse button (▲/▼)
- Historical graph showing 60-second bandwidth trend
- SVG-based visualization with gradient fills for download/upload
- Peak speed indicators in expanded view
- Smooth window resize animation between compact (280×110) and expanded (300×320) modes
- Window now resizable with min/max constraints
- ESLint configuration and dependencies for code quality

### Fixed

- Memory leak from IPC event listeners not being cleaned up on component unmount
- Dead code removal: unused `os` import, `ByteCounters` interface, `lastCounters` field, and `getNetworkBytes()` method

## [0.1.0] - 2025-12-19

### Added

- Initial release of Net Monitor Lite
- Real-time bandwidth monitoring (download/upload speeds)
- Compact, frameless Electron window with always-on-top support
- Elegant dark glassmorphism UI theme
- Animated horizontal bar graphs (0-6000 Mbps scale)
- Download bar: cyan/blue gradient with glow effect
- Upload bar: magenta/pink gradient with glow effect
- Window controls: minimize and close buttons
- Draggable title bar for window positioning
- Windows PowerShell integration for accurate network statistics
- Smart value formatting (Mbps/Gbps)
