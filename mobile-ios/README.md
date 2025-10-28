# 📲 RoxyBoxy iOS Prototype

SwiftUI prototype for the mobile AI agent manager experience. Mirrors the Expo prototype while leaning into native Apple design patterns, glassmorphism surfaces, and multi-agent orchestration concepts.

## ✨ Highlights
- Mission Control dashboard with workspace hero, live playbooks, and AI signal feed.
- Agent directory with detail sheet for reassignment, sentiment monitoring, and escalation status.
- Playbook browser that surfaces execution steps and AI augmentations.
- Control Center for toggling orchestration levers, automation flags, and workspace focus.
- Sample data baked in via lightweight models so screens render instantly in previews or live builds.

## 🏗️ Architecture
```
mobile-ios/
├── AIManagerApp.swift          # App entry point
├── Models/                     # Sample domain data (agents, workspaces, playbooks)
├── ViewModels/                 # AppState orchestrates sample data + mutations
├── Views/                      # Feature screens
│   ├── Components/             # Reusable UI components
│   ├── DashboardView.swift     # Mission control + signal feed
│   ├── AgentsView.swift        # Agent list + detail sheet
│   ├── WorkflowsView.swift     # Playbook browser
│   └── ControlCenterView.swift # Settings + automation toggles
└── README.md
```

## 🚀 Getting Started
1. Open the folder in Xcode 15+ as a Swift package or create a new iOS app project and drop the files in.
2. Target iOS 17 or newer to leverage the `Layout` protocol used by the flow layout tags.
3. Run in the simulator — sample data renders without additional configuration.

## 🔮 Next Steps
- Connect to live MCP endpoints for signals and assignments.
- Add timeline visualizations for deal progress.
- Layer in push notification handling for escalations.
- Introduce voice command capture for rapid agent tasking.

This prototype is intentionally UI-forward so designers and PMs can iterate on flows before the backend integrations land.
