import Foundation
import SwiftUI

struct Signal: Identifiable, Hashable {
    let id: UUID
    var title: String
    var body: String
    var sentiment: Agent.Sentiment
    var timestamp: String
    var tags: [String]

    static let samples: [Signal] = SampleData.signals
}
