#!/usr/bin/env python3
"""
Simple HTTP Server for Design System Showcase
Serves the HTML preview with live reload capability
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"🌐 {self.address_string()} - {format % args}")

def start_server():
    """Start the HTTP server"""
    # Change to the project directory
    project_dir = Path(__file__).parent
    os.chdir(project_dir)
    
    # Check if the HTML file exists
    html_file = project_dir / 'design-system-showcase.html'
    if not html_file.exists():
        print("❌ Error: design-system-showcase.html not found!")
        print(f"Expected location: {html_file}")
        return False
    
    # Check if CSS files exist
    css_dir = project_dir / 'styles'
    if not css_dir.exists():
        print("❌ Error: styles directory not found!")
        print(f"Expected location: {css_dir}")
        return False
    
    try:
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print("🎨 Cash App Currency Coach - Design System Showcase")
            print("=" * 60)
            print(f"📁 Serving from: {project_dir}")
            print(f"🌐 Server running at: http://{HOST}:{PORT}")
            print(f"📱 Preview URL: http://{HOST}:{PORT}/design-system-showcase.html")
            print("=" * 60)
            print("🚀 Opening browser...")
            
            # Open browser automatically
            webbrowser.open(f'http://{HOST}:{PORT}/design-system-showcase.html')
            
            print("✨ Design System Showcase is now running!")
            print("💡 Click on components to see interactions")
            print("📱 Try resizing the browser to see responsive design")
            print("⌨️  Press Ctrl+C to stop the server")
            print("=" * 60)
            
            # Start serving
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print("💡 Try closing other servers or use a different port")
            return False
        else:
            print(f"❌ Error starting server: {e}")
            return False
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
        return True

if __name__ == "__main__":
    print("🎨 Starting Design System Showcase Server...")
    success = start_server()
    sys.exit(0 if success else 1)
