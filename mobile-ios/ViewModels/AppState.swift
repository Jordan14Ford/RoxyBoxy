import Foundation
import Combine

final class AppState: ObservableObject {
    @Published var agents: [Agent]
    @Published var workspaces: [Workspace]
    @Published var playbooks: [Playbook]
    @Published var selectedWorkspace: Workspace?

    private var cancellables: Set<AnyCancellable> = []

    init() {
        let sampleAgents = Agent.samples
        let sampleWorkspaces = Workspace.samples
        let samplePlaybooks = Playbook.samples

        self.agents = sampleAgents
        self.workspaces = sampleWorkspaces
        self.playbooks = samplePlaybooks
        self.selectedWorkspace = sampleWorkspaces.first

        wireUpDerivedState()
    }

    private func wireUpDerivedState() {
        $selectedWorkspace
            .compactMap { $0 }
            .sink { workspace in
                /// When the workspace changes, keep the workstreams in sync
                /// with the latest playbooks that belong to the workspace.
                let relevantPlaybooks = self.playbooks.filter { $0.workspaceID == workspace.id }
                self.workspaces = self.workspaces.map { current in
                    guard current.id == workspace.id else { return current }
                    return Workspace(
                        id: current.id,
                        name: current.name,
                        mission: current.mission,
                        health: current.health,
                        activeAgents: current.activeAgents,
                        activeThreads: current.activeThreads,
                        upcomingEvents: current.upcomingEvents,
                        playbooks: relevantPlaybooks
                    )
                }
            }
            .store(in: &cancellables)
    }

    func assign(_ playbook: Playbook, to agent: Agent) {
        guard let index = agents.firstIndex(where: { $0.id == agent.id }) else { return }
        agents[index].activePlaybook = playbook
    }
}
