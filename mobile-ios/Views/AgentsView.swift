import SwiftUI

struct AgentsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var selectedAgent: Agent?

    var body: some View {
        NavigationStack {
            List {
                Section("Active Agents") {
                    ForEach(appState.agents) { agent in
                        AgentRow(agent: agent)
                            .contentShape(Rectangle())
                            .onTapGesture {
                                selectedAgent = agent
                            }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Agents")
            .sheet(item: $selectedAgent) { agent in
                AgentDetailSheet(agentID: agent.id)
                    .environmentObject(appState)
            }
        }
    }
}

struct AgentsView_Previews: PreviewProvider {
    static var previews: some View {
        AgentsView()
            .environmentObject(AppState())
    }
}
