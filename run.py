#!/usr/bin/env python3
"""
Net Monitor Lite - Development Server Launcher
Starts the Electron + Vite development server.
"""

import subprocess
import sys
import os

def main():
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("🚀 Starting Net Monitor Lite dev server...")
    print(f"📁 Working directory: {script_dir}")
    print("-" * 40)
    
    try:
        # Run npm run dev in the project directory
        process = subprocess.run(
            ["npm", "run", "dev"],
            cwd=script_dir,
            shell=True,  # Required for Windows
            check=True
        )
        return process.returncode
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: Dev server exited with code {e.returncode}")
        return e.returncode
    except FileNotFoundError:
        print("❌ Error: npm not found. Please install Node.js first.")
        return 1
    except KeyboardInterrupt:
        print("\n👋 Dev server stopped.")
        return 0

if __name__ == "__main__":
    sys.exit(main())
