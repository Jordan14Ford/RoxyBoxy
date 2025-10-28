import SwiftUI

struct MetricPill: View {
    var label: String
    var value: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label.uppercased())
                .font(.caption2.bold())
                .foregroundStyle(.secondary)

            Text(value)
                .font(.title3.bold())
                .foregroundStyle(.primary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}

struct MetricPill_Previews: PreviewProvider {
    static var previews: some View {
        MetricPill(label: "Agents", value: "6")
            .padding()
            .previewLayout(.sizeThatFits)
    }
}
