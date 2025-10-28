import SwiftUI

struct PlaybookDetailView: View {
    var playbook: Playbook

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                VStack(alignment: .leading, spacing: 12) {
                    Text(playbook.name)
                        .font(.largeTitle.bold())
                    Text(playbook.objective)
                        .font(.title3)
                        .foregroundStyle(.secondary)
                }

                HStack(spacing: 16) {
                    MetricPill(label: "Priority", value: playbook.priority.label)
                    MetricPill(label: "Timeline", value: playbook.timeline)
                }

                VStack(alignment: .leading, spacing: 12) {
                    Text("Execution Steps")
                        .font(.title3.bold())
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(sampleSteps.indices, id: \.self) { index in
                            HStack(alignment: .top, spacing: 12) {
                                Circle()
                                    .fill(Color.indigo.opacity(0.1))
                                    .frame(width: 28, height: 28)
                                    .overlay(Text("\(index + 1)").font(.caption.bold()))

                                VStack(alignment: .leading, spacing: 4) {
                                    Text(sampleSteps[index].title)
                                        .font(.headline)
                                    Text(sampleSteps[index].detail)
                                        .font(.subheadline)
                                        .foregroundStyle(.secondary)
                                }
                            }
                        }
                    }
                }

                VStack(alignment: .leading, spacing: 12) {
                    Text("AI Augmentations")
                        .font(.title3.bold())
                    VStack(alignment: .leading, spacing: 8) {
                        ForEach(sampleAugmentations, id: \.self) { augmentation in
                            Label(augmentation, systemImage: "sparkles")
                                .font(.subheadline)
                                .foregroundStyle(.primary)
                                .padding()
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .background(Color(.secondarySystemBackground))
                                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                        }
                    }
                }
            }
            .padding(24)
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle("Playbook")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var sampleSteps: [(title: String, detail: String)] {
        [
            ("Align inputs", "Collect latest traction metrics and investor questions."),
            ("Synthesize narrative", "Draft storyline using Nova's latest research threads."),
            ("Pressure test", "Run AI critique agent to expose weak points."),
            ("Package", "Assemble investor brief with highlights and next steps.")
        ]
    }

    private var sampleAugmentations: [String] {
        [
            "Auto-surface related research threads",
            "Real-time investor sentiment analysis",
            "Generate follow-up tasks for human owners",
            "Compliance scan before send"
        ]
    }
}

struct PlaybookDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            PlaybookDetailView(playbook: Playbook.samples[0])
        }
    }
}
