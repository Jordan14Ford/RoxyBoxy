import Foundation

struct Playbook: Identifiable, Hashable {
    let id: UUID
    var name: String
    var objective: String
    var timeline: String
    var priority: Priority
    var owner: String
    var workspaceID: UUID

    enum Priority: String {
        case critical
        case high
        case medium
        case low

        var label: String {
            rawValue.capitalized
        }
    }

    static let samples: [Playbook] = SampleData.playbooks
}
