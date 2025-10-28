import SwiftUI

struct WorkflowsView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        NavigationStack {
            List {
                ForEach(appState.workspaces) { workspace in
                    Section(header: workspaceHeader(workspace)) {
                        ForEach(workspace.playbooks) { playbook in
                            NavigationLink {
                                PlaybookDetailView(playbook: playbook)
                            } label: {
                                VStack(alignment: .leading, spacing: 6) {
                                    Text(playbook.name)
                                        .font(.headline)
                                    Text(playbook.objective)
                                        .font(.subheadline)
                                        .foregroundStyle(.secondary)
                                }
                                .padding(.vertical, 8)
                            }
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Playbooks")
        }
    }

    private func workspaceHeader(_ workspace: Workspace) -> some View {
        HStack {
            Text(workspace.name)
                .font(.subheadline.bold())
            Spacer()
            Label(workspace.health.label, systemImage: "waveform.path")
                .font(.caption)
                .foregroundStyle(workspace.health.color)
        }
    }
}

struct WorkflowsView_Previews: PreviewProvider {
    static var previews: some View {
        WorkflowsView()
            .environmentObject(AppState())
    }
}
