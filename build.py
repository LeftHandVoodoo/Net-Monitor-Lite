#!/usr/bin/env python3
"""
Net Monitor Lite - Build Script
Builds portable and/or installer versions of the app.
"""

import subprocess
import sys
import os
import argparse

def main():
    parser = argparse.ArgumentParser(description='Build Net Monitor Lite')
    parser.add_argument('--portable', '-p', action='store_true', 
                        help='Build portable version only')
    parser.add_argument('--installer', '-i', action='store_true', 
                        help='Build installer version only')
    parser.add_argument('--all', '-a', action='store_true', 
                        help='Build both portable and installer')
    args = parser.parse_args()
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("🔨 Net Monitor Lite - Build Script")
    print(f"📁 Working directory: {script_dir}")
    print("-" * 40)
    
    # Determine build command
    if args.portable:
        cmd = "npm run build:dir"
        print("📦 Building: Portable version")
    elif args.installer:
        cmd = "npm run build:installer"
        print("📦 Building: Installer version")
    elif args.all:
        cmd = "npm run build:dir"
        print("📦 Building: Portable version")
    else:
        # Default to dir (portable)
        cmd = "npm run build:dir"
        print("📦 Building: Portable version (default)")
    
    print("-" * 40)
    
    # Set environment to disable code signing
    env = os.environ.copy()
    env['CSC_IDENTITY_AUTO_DISCOVERY'] = 'false'
    
    try:
        process = subprocess.run(
            cmd,
            cwd=script_dir,
            shell=True,
            check=True,
            env=env
        )
        
        # Create zip of portable build
        release_dir = os.path.join(script_dir, 'release')
        unpacked_dir = os.path.join(release_dir, 'win-unpacked')
        
        if os.path.exists(unpacked_dir):
            import shutil
            zip_name = os.path.join(release_dir, 'Net-Monitor-Lite-Portable')
            shutil.make_archive(zip_name, 'zip', unpacked_dir)
            print("-" * 40)
            print("✅ Build complete!")
            print(f"📂 Output: {zip_name}.zip")
        
        return 0
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: Build failed with code {e.returncode}")
        return e.returncode
    except FileNotFoundError:
        print("❌ Error: npm not found. Please install Node.js first.")
        return 1
    except KeyboardInterrupt:
        print("\n👋 Build cancelled.")
        return 0

if __name__ == "__main__":
    sys.exit(main())
