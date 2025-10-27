# 🚀 Cash App Currency Coach - Access Guide

## 🌐 **Multiple Ways to Access the App**

### **Option 1: Direct File Access (No Server Needed)**
```bash
# Open the design system showcase directly in your browser
open design-system-showcase.html
# or double-click the file in Finder
```

### **Option 2: Python Server (Alternative to localhost)**
```bash
# Start Python server on different port
python3 -m http.server 3000
# Then visit: http://localhost:3000/design-system-showcase.html
```

### **Option 3: Node.js Server**
```bash
# Install dependencies first
npm install

# Start development server
npm run dev

# If localhost doesn't work, try:
npm run dev -- --port 3001
# Then visit: http://localhost:3001
```

### **Option 4: Static File Server**
```bash
# Using npx serve
npx serve . -p 3000
# Then visit: http://localhost:3000/design-system-showcase.html
```

### **Option 5: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click on `design-system-showcase.html`
3. Select "Open with Live Server"

## 📱 **Mobile App Access**

### **React Native/Expo**
```bash
cd mobile/
npm install
npm start

# Then scan QR code with Expo Go app on your phone
# Or press 'i' for iOS simulator
```

## 🎯 **What You Can Access**

### **Design System Showcase**
- **File**: `design-system-showcase.html`
- **Features**: Interactive components, color palette, typography
- **No server needed** - works offline!

### **Interactive Demo (Web App)**
- **URL**: `/interactive-demo` (when server is running)
- **Features**: Real currency conversion, data persistence, notifications

### **Mobile App**
- **Directory**: `mobile/`
- **Features**: Native iOS app with real data storage

## 🔧 **Troubleshooting localhost Issues**

### **Common Solutions:**
1. **Port conflicts**: Try different ports (3001, 3002, 8080)
2. **Firewall**: Check if firewall is blocking localhost
3. **Browser cache**: Clear browser cache and cookies
4. **Network settings**: Try `127.0.0.1` instead of `localhost`

### **Alternative URLs:**
- `http://127.0.0.1:3000`
- `http://0.0.0.0:3000`
- `http://[your-ip]:3000`

## 📁 **Repository Structure**

```
cashapp-currency-coach/
├── 🌐 Web App
│   ├── app/                    # Next.js app
│   ├── components/             # React components
│   ├── lib/                    # Utilities & state
│   └── styles/                 # Design system CSS
├── 📱 Mobile App
│   ├── mobile/                 # React Native app
│   ├── screens/                # App screens
│   ├── components/             # Mobile components
│   └── services/               # API integration
├── 🎨 Design System
│   ├── design-system-showcase.html  # Interactive showcase
│   ├── DESIGN_SYSTEM.md            # Documentation
│   └── COMPONENT_SPECIFICATIONS.md # Component specs
└── 🛠️ Development Tools
    ├── serve-showcase.py       # Python server
    └── start-showcase.sh       # Bash launcher
```

## 🚀 **Quick Start (No Server)**

1. **Open design showcase**: Double-click `design-system-showcase.html`
2. **View mobile mockup**: Open `mobile/UI_MOCKUP.md`
3. **Read documentation**: Open `DESIGN_SYSTEM.md`

## 📊 **Features Available**

### **✅ Working Features:**
- Interactive design system showcase
- Real currency conversion (web)
- Data persistence (web + mobile)
- User feedback notifications
- Mobile app with AsyncStorage
- Complete component library

### **🎯 Interactive Elements:**
- Click buttons to see hover effects
- Convert currencies with real calculations
- See data persist across sessions
- Test notification system
- View responsive design

## 🔗 **GitHub Repository**
**Live at**: https://github.com/Jordan14Ford/RoxyBoxy

## 📞 **Need Help?**
If localhost still doesn't work, try the **direct file access** method - it works without any server!
