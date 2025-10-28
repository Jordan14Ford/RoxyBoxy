import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        guard !subviews.isEmpty else { return .zero }

        #if canImport(UIKit)
        let fallbackWidth = UIScreen.main.bounds.width - 48
        #else
        let fallbackWidth: CGFloat = 320
        #endif
        let maxWidth = proposal.width ?? fallbackWidth
        var currentX: CGFloat = 0
        var currentY: CGFloat = 0
        var rowHeight: CGFloat = 0
        var maxX: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)

            if currentX + size.width > maxWidth {
                currentX = 0
                currentY += rowHeight + spacing
                rowHeight = 0
            }

            rowHeight = max(rowHeight, size.height)
            maxX = max(maxX, currentX + size.width)
            currentX += size.width + spacing
        }

        return CGSize(width: maxX, height: currentY + rowHeight)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        guard !subviews.isEmpty else { return }

        var currentX = bounds.minX
        var currentY = bounds.minY
        var rowHeight: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)

            if currentX + size.width > bounds.maxX {
                currentX = bounds.minX
                currentY += rowHeight + spacing
                rowHeight = 0
            }

            let proposed = ProposedViewSize(width: size.width, height: size.height)
            subview.place(at: CGPoint(x: currentX, y: currentY), proposal: proposed)
            currentX += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
    }
}
