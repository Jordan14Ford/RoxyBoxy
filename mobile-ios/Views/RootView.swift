import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        TabView {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "rectangle.grid.2x2")
                }

            AgentsView()
                .tabItem {
                    Label("Agents", systemImage: "person.3")
                }

            WorkflowsView()
                .tabItem {
                    Label("Playbooks", systemImage: "list.bullet.rectangle")
                }

            ControlCenterView()
                .tabItem {
                    Label("Control", systemImage: "slider.horizontal.3")
                }
        }
        .accentColor(.indigo)
    }
}

struct RootView_Previews: PreviewProvider {
    static var previews: some View {
        RootView()
            .environmentObject(AppState())
    }
}
