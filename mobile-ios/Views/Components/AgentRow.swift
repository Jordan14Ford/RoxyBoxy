import SwiftUI

struct AgentRow: View {
    var agent: Agent

    var body: some View {
        HStack(spacing: 16) {
            ZStack {
                Circle()
                    .fill(Color.indigo.opacity(0.1))
                    .frame(width: 48, height: 48)

                Image(systemName: agent.avatar)
                    .font(.title2)
                    .foregroundStyle(.indigo)
            }

            VStack(alignment: .leading, spacing: 4) {
                HStack(spacing: 8) {
                    Text(agent.name)
                        .font(.headline)
                        .foregroundStyle(.primary)

                    Circle()
                        .fill(agent.status.color)
                        .frame(width: 8, height: 8)
                }

                Text(agent.role)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Text(agent.focusArea)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 6) {
                if let playbook = agent.activePlaybook {
                    Text(playbook.name)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                } else {
                    Text("Unassigned")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Label("\(agent.activeThreads)", systemImage: "bubble.left.and.bubble.right.fill")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 12)
    }
}

struct AgentRow_Previews: PreviewProvider {
    static var previews: some View {
        List {
            AgentRow(agent: Agent.samples[0])
        }
    }
}
