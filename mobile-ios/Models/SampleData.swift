import Foundation

enum SampleData {
    static let workspaceIDs: [UUID] = [UUID(), UUID()]

    static let playbooks: [Playbook] = [
        Playbook(
            id: UUID(),
            name: "Series B Investor Narrative",
            objective: "Package diligence insights for Monday partner review.",
            timeline: "Due in 3 days",
            priority: .critical,
            owner: "Nova",
            workspaceID: workspaceIDs[0]
        ),
        Playbook(
            id: UUID(),
            name: "Healthcare AI Landscape",
            objective: "Synthesize top 12 startups and competitor moves.",
            timeline: "Due tomorrow",
            priority: .high,
            owner: "Atlas",
            workspaceID: workspaceIDs[0]
        ),
        Playbook(
            id: UUID(),
            name: "Investor Follow-up Cadence",
            objective: "Draft tailored outreach for strategic LPs.",
            timeline: "Due in 5 days",
            priority: .medium,
            owner: "Mira",
            workspaceID: workspaceIDs[1]
        )
    ]

    static let workspaces: [Workspace] = [
        Workspace(
            id: workspaceIDs[0],
            name: "Series B Raise",
            mission: "Orchestrate the fundraise workstreams end-to-end.",
            health: .stable,
            activeAgents: 6,
            activeThreads: 24,
            upcomingEvents: [
                WorkspaceEvent(
                    id: UUID(),
                    title: "Partner Sync",
                    subtitle: "Align on diligence output",
                    timestamp: "In 4 hours"
                ),
                WorkspaceEvent(
                    id: UUID(),
                    title: "Investor Briefing",
                    subtitle: "Share traction narratives",
                    timestamp: "Tomorrow"
                )
            ],
            playbooks: playbooks.filter { $0.workspaceID == workspaceIDs[0] }
        ),
        Workspace(
            id: workspaceIDs[1],
            name: "Investor Relations",
            mission: "Keep the LP network engaged with timely insights.",
            health: .atRisk,
            activeAgents: 3,
            activeThreads: 11,
            upcomingEvents: [
                WorkspaceEvent(
                    id: UUID(),
                    title: "LP Brief",
                    subtitle: "Send quarterly notes",
                    timestamp: "Due Friday"
                )
            ],
            playbooks: playbooks.filter { $0.workspaceID == workspaceIDs[1] }
        )
    ]

    static let agents: [Agent] = [
        Agent(
            id: UUID(),
            name: "Nova",
            role: "Deal Execution",
            focusArea: "High-priority venture pipeline",
            sentiment: .positive,
            status: .online,
            activeThreads: 12,
            escalations: 1,
            activePlaybook: playbooks[0],
            avatar: "sparkles",
            handoffRequired: false
        ),
        Agent(
            id: UUID(),
            name: "Atlas",
            role: "Research",
            focusArea: "Market diligence for healthcare AI",
            sentiment: .neutral,
            status: .online,
            activeThreads: 8,
            escalations: 0,
            activePlaybook: playbooks[1],
            avatar: "globe",
            handoffRequired: false
        ),
        Agent(
            id: UUID(),
            name: "Mira",
            role: "Relationship Ops",
            focusArea: "Investor follow-ups and notes",
            sentiment: .concerned,
            status: .away,
            activeThreads: 5,
            escalations: 2,
            activePlaybook: nil,
            avatar: "person.2",
            handoffRequired: true
        )
    ]

    static let signals: [Signal] = [
        Signal(
            id: UUID(),
            title: "Warm investor reply",
            body: "Sequoia partner acknowledged deck. Wants traction metrics before Monday.",
            sentiment: .positive,
            timestamp: "2m ago",
            tags: ["investor", "follow-up"]
        ),
        Signal(
            id: UUID(),
            title: "Thread queue spiking",
            body: "Atlas is juggling 8 active research requests. Consider rebalancing support.",
            sentiment: .concerned,
            timestamp: "12m ago",
            tags: ["capacity", "atlas"]
        ),
        Signal(
            id: UUID(),
            title: "Nova requesting guidance",
            body: "Needs updated market comps before tomorrow's partner sync.",
            sentiment: .neutral,
            timestamp: "25m ago",
            tags: ["nova", "prep"]
        )
    ]
}
