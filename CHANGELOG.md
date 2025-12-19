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
- Smooth window resize animation between compact (400×200) and expanded (450×420) modes
- Window now resizable with min/max constraints
- ESLint configuration and dependencies for code quality
- Python launcher script (`run.py`) for easy startup

### Changed

- **Color theme**: Revamped to elegant gold and brown color scheme
- **Window size**: Increased from 280×110 to 400×140 (compact), 300×320 to 450×400 (expanded)
- **Polling rate**: Faster updates at 250ms (was 1000ms)
- **Bar size**: Increased from 18px to 28px height
- **Font sizes**: All text increased for better readability (11px → 14px base)
- **Download bars**: Gold gradient (#FFD700 → #DAA520)
- **Upload bars**: Bronze/copper gradient (#CD7F32 → #8B4513)
- **Graph dimensions**: Increased to 420×120 (was 280×80)

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
