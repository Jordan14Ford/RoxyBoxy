import Foundation
import SwiftUI

struct Agent: Identifiable, Hashable {
    let id: UUID
    var name: String
    var role: String
    var focusArea: String
    var sentiment: Sentiment
    var status: Status
    var activeThreads: Int
    var escalations: Int
    var activePlaybook: Playbook?
    var avatar: String
    var handoffRequired: Bool

    static let samples: [Agent] = SampleData.agents

    enum Sentiment: String {
        case positive, neutral, concerned

        var color: Color {
            switch self {
            case .positive: return .green
            case .neutral: return .yellow
            case .concerned: return .red
            }
        }

        var label: String {
            switch self {
            case .positive: return "Positive"
            case .neutral: return "Neutral"
            case .concerned: return "Needs Attention"
            }
        }
    }

    enum Status: String {
        case online, away, offline

        var color: Color {
            switch self {
            case .online: return .green
            case .away: return .orange
            case .offline: return .gray
            }
        }

        var icon: String {
            switch self {
            case .online: return "bolt.fill"
            case .away: return "clock.fill"
            case .offline: return "moon.fill"
            }
        }
    }
}
