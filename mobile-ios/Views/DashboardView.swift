import SwiftUI

struct DashboardView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    if let workspace = appState.selectedWorkspace ?? appState.workspaces.first {
                        WorkspaceHero(workspace: workspace)
                    }

                    Text("Live Workstreams")
                        .font(.title3.bold())
                        .foregroundColor(.primary)
                        .padding(.horizontal)

                    ScrollView(.horizontal, showsIndicators: false) {
                        LazyHStack(spacing: 16) {
                            ForEach(appState.playbooks.prefix(5)) { playbook in
                                PlaybookCard(playbook: playbook)
                            }
                        }
                        .padding(.horizontal)
                    }

                    Text("AI Signal Center")
                        .font(.title3.bold())
                        .foregroundColor(.primary)
                        .padding(.horizontal)

                    SignalFeed()
                }
                .padding(.vertical, 24)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Mission Control")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        // Future: open global command palette
                    } label: {
                        Image(systemName: "sparkles")
                    }
                }
            }
        }
    }
}

struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        DashboardView()
            .environmentObject(AppState())
    }
}
