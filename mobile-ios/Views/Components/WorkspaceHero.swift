import SwiftUI

struct WorkspaceHero: View {
    var workspace: Workspace

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(alignment: .top, spacing: 12) {
                VStack(alignment: .leading, spacing: 6) {
                    Text(workspace.name)
                        .font(.title2.bold())
                        .foregroundStyle(.primary)

                    Text(workspace.mission)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .lineLimit(3)
                }

                Spacer()

                Label(workspace.health.label, systemImage: "waveform.path.ecg")
                    .font(.caption.bold())
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .background(workspace.health.color.opacity(0.15))
                    .foregroundStyle(workspace.health.color)
                    .clipShape(Capsule())
            }

            HStack(spacing: 24) {
                MetricPill(label: "Agents", value: "\(workspace.activeAgents)")
                MetricPill(label: "Threads", value: "\(workspace.activeThreads)")
            }

            Divider()

            VStack(alignment: .leading, spacing: 12) {
                Text("Upcoming Moments")
                    .font(.footnote.bold())
                    .textCase(.uppercase)
                    .foregroundStyle(.secondary)

                ForEach(workspace.upcomingEvents) { event in
                    HStack(spacing: 12) {
                        Image(systemName: "calendar.badge.clock")
                            .font(.title3)
                            .foregroundStyle(.indigo)
                            .frame(width: 32, height: 32)
                            .background(Color.indigo.opacity(0.1))
                            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))

                        VStack(alignment: .leading, spacing: 2) {
                            Text(event.title)
                                .font(.subheadline.bold())
                                .foregroundStyle(.primary)
                            Text(event.subtitle)
                                .font(.footnote)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        Text(event.timestamp)
                            .font(.footnote)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .padding(20)
        .background(.thickMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
        .padding(.horizontal)
        .shadow(color: .black.opacity(0.05), radius: 18, x: 0, y: 12)
    }
}

struct WorkspaceHero_Previews: PreviewProvider {
    static var previews: some View {
        WorkspaceHero(workspace: Workspace.samples[0])
            .padding()
            .background(Color(.systemGroupedBackground))
    }
}
