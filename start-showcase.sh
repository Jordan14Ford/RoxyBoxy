#!/bin/bash
# Cash App Currency Coach - Design System Showcase Launcher

echo "🎨 Cash App Currency Coach - Design System Showcase"
echo "=================================================="

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found"
    python3 serve-showcase.py
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    python serve-showcase.py
else
    echo "❌ Python not found!"
    echo "💡 Please install Python 3 to run the showcase server"
    echo "🌐 You can also open design-system-showcase.html directly in your browser"
    exit 1
fi
