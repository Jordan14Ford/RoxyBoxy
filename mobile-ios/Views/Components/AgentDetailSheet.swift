import SwiftUI

struct AgentDetailSheet: View {
    @EnvironmentObject private var appState: AppState
    @Environment(\.dismiss) private var dismiss

    var agentID: Agent.ID

    private var agent: Agent {
        appState.agents.first(where: { $0.id == agentID }) ?? Agent.samples[0]
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    header
                    status
                    assignment
                    escalation
                }
                .padding(24)
            }
            .navigationTitle(agent.name)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") {
                        dismiss()
                    }
                }
            }
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 16) {
                Circle()
                    .fill(Color.indigo.opacity(0.1))
                    .frame(width: 60, height: 60)
                    .overlay(
                        Image(systemName: agent.avatar)
                            .font(.title2)
                            .foregroundStyle(.indigo)
                    )

                VStack(alignment: .leading, spacing: 4) {
                    Text(agent.role)
                        .font(.headline)
                    Text(agent.focusArea)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .lineLimit(3)
                }
            }

            HStack(spacing: 12) {
                Label(agent.sentiment.label, systemImage: "face.smiling")
                    .font(.caption.bold())
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(agent.sentiment.color.opacity(0.15))
                    .foregroundStyle(agent.sentiment.color)
                    .clipShape(Capsule())

                Label(agent.status.rawValue.capitalized, systemImage: agent.status.icon)
                    .font(.caption.bold())
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(agent.status.color.opacity(0.15))
                    .foregroundStyle(agent.status.color)
                    .clipShape(Capsule())
            }
        }
    }

    private var status: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Live Threads")
                .font(.headline)

            HStack {
                MetricPill(label: "Active", value: "\(agent.activeThreads)")
                MetricPill(label: "Escalations", value: "\(agent.escalations)")
            }
        }
    }

    private var assignment: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Playbook Assignment")
                .font(.headline)

            if let playbook = agent.activePlaybook {
                PlaybookCard(playbook: playbook)
            } else {
                Text("No playbook assigned. Select one below to redirect focus.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            VStack(alignment: .leading, spacing: 12) {
                Text("Reassign Agent")
                    .font(.subheadline.bold())
                FlowLayout(spacing: 12) {
                    ForEach(appState.playbooks, id: \.self) { playbook in
                        Button {
                            appState.assign(playbook, to: agent)
                        } label: {
                            Text(playbook.name)
                                .font(.caption)
                                .foregroundStyle(.primary)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 8)
                                .background(Color(.secondarySystemBackground))
                                .clipShape(Capsule())
                        }
                    }
                }
            }
        }
    }

    private var escalation: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Escalation Signals")
                .font(.headline)

            VStack(alignment: .leading, spacing: 8) {
                Text(agent.handoffRequired ? "Handoff required" : "All signals nominal")
                    .font(.subheadline.bold())
                Text(agent.handoffRequired ? "Route to human partner before investor briefing." : "No escalations pending.")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(agent.handoffRequired ? Color.red.opacity(0.1) : Color.green.opacity(0.1))
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        }
    }
}

struct AgentDetailSheet_Previews: PreviewProvider {
    static var previews: some View {
        AgentDetailSheet(agentID: Agent.samples[0].id)
            .environmentObject(AppState())
    }
}
