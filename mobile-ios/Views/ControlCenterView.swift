import SwiftUI

struct ControlCenterView: View {
    @EnvironmentObject private var appState: AppState
    @State private var autoRoutingEnabled: Bool = true
    @State private var notificationsEnabled: Bool = true
    @State private var humanHandoffThreshold: Double = 0.6

    var body: some View {
        NavigationStack {
            Form {
                Section("Workspace Focus") {
                    Picker("Active Workspace", selection: Binding(
                        get: { appState.selectedWorkspace ?? appState.workspaces.first },
                        set: { newValue in
                            appState.selectedWorkspace = newValue
                        }
                    )) {
                        ForEach(appState.workspaces) { workspace in
                            Text(workspace.name)
                                .tag(Optional(workspace))
                        }
                    }
                }

                Section("Automation") {
                    Toggle(isOn: $autoRoutingEnabled) {
                        VStack(alignment: .leading) {
                            Text("Auto-route threads")
                            Text("Let agents rebalance workload when capacity dips.")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }

                    Toggle(isOn: $notificationsEnabled) {
                        VStack(alignment: .leading) {
                            Text("Escalation pings")
                            Text("Receive push alerts when a handoff is required.")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }

                    VStack(alignment: .leading, spacing: 12) {
                        Text("Human handoff threshold")
                        Slider(value: $humanHandoffThreshold, in: 0...1)
                        Text("Trigger when confidence < \(Int(humanHandoffThreshold * 100))%")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 8)
                }

                Section("Experiment Flags") {
                    Toggle("Enable multi-agent retros", isOn: .constant(true))
                    Toggle("Show live agent sentiment", isOn: .constant(true))
                    Toggle("Expose hidden MCP tools", isOn: .constant(false))
                }
            }
            .navigationTitle("Control Center")
        }
    }
}

struct ControlCenterView_Previews: PreviewProvider {
    static var previews: some View {
        ControlCenterView()
            .environmentObject(AppState())
    }
}
