import SwiftUI

struct SignalFeed: View {
    var signals: [Signal] = Signal.samples

    var body: some View {
        VStack(spacing: 12) {
            ForEach(signals) { signal in
                VStack(alignment: .leading, spacing: 12) {
                    HStack(alignment: .firstTextBaseline, spacing: 12) {
                        Image(systemName: "waveform")
                            .font(.title3)
                            .foregroundStyle(color(for: signal.sentiment))
                            .frame(width: 36, height: 36)
                            .background(color(for: signal.sentiment).opacity(0.1))
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))

                        VStack(alignment: .leading, spacing: 4) {
                            Text(signal.title)
                                .font(.headline)
                                .foregroundStyle(.primary)
                            Text(signal.body)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        Text(signal.timestamp)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    FlowLayout(spacing: 8) {
                        ForEach(signal.tags, id: \.self) { tag in
                            Text(tag.uppercased())
                                .font(.caption2.bold())
                                .padding(.horizontal, 10)
                                .padding(.vertical, 6)
                                .background(Color(.secondarySystemBackground))
                                .clipShape(Capsule())
                        }
                    }
                }
                .padding(18)
                .background(Color(.systemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
                .shadow(color: .black.opacity(0.04), radius: 10, x: 0, y: 6)
                .padding(.horizontal)
            }
        }
    }

    private func color(for sentiment: Agent.Sentiment) -> Color {
        sentiment.color
    }
}

struct SignalFeed_Previews: PreviewProvider {
    static var previews: some View {
        SignalFeed()
            .padding(.vertical)
            .background(Color(.systemGroupedBackground))
    }
}
