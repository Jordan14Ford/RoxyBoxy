import Foundation
import SwiftUI

struct Workspace: Identifiable, Hashable {
    let id: UUID
    var name: String
    var mission: String
    var health: Health
    var activeAgents: Int
    var activeThreads: Int
    var upcomingEvents: [WorkspaceEvent]
    var playbooks: [Playbook]

    static let samples: [Workspace] = SampleData.workspaces

    enum Health: String {
        case stable
        case atRisk
        case blocked

        var color: Color {
            switch self {
            case .stable: return .green
            case .atRisk: return .orange
            case .blocked: return .red
            }
        }

        var label: String { rawValue.replacingOccurrences(of: "_", with: " ").capitalized }
    }
}

struct WorkspaceEvent: Identifiable, Hashable {
    let id: UUID
    var title: String
    var subtitle: String
    var timestamp: String
}
