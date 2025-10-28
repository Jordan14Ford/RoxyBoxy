import SwiftUI

struct PlaybookCard: View {
    var playbook: Playbook

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .center, spacing: 12) {
                Image(systemName: "list.clipboard")
                    .font(.title3)
                    .foregroundStyle(.white)
                    .frame(width: 42, height: 42)
                    .background(priorityColor)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

                VStack(alignment: .leading, spacing: 4) {
                    Text(playbook.name)
                        .font(.headline)
                        .foregroundStyle(.primary)
                        .lineLimit(2)

                    Text(playbook.objective)
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                        .lineLimit(3)
                }
            }

            Divider()

            HStack {
                Label(playbook.priority.label, systemImage: "flag.fill")
                    .font(.caption)
                    .foregroundStyle(priorityColor)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(priorityColor.opacity(0.15))
                    .clipShape(Capsule())

                Spacer()

                VStack(alignment: .trailing, spacing: 2) {
                    Text(playbook.timeline)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("Owner: \(playbook.owner)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .frame(width: 280)
        .padding(20)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private var priorityColor: Color {
        switch playbook.priority {
        case .critical: return .red
        case .high: return .orange
        case .medium: return .yellow
        case .low: return .blue
        }
    }
}

struct PlaybookCard_Previews: PreviewProvider {
    static var previews: some View {
        PlaybookCard(playbook: Playbook.samples[0])
            .padding()
            .previewLayout(.sizeThatFits)
    }
}
