import React from "react";
import { Settings, FlaskConical, Zap, Calculator, ChevronRight } from "lucide-react";
import SimulationConfig from "./components/SimulationConfig";
import ResultsView from "./components/ResultsView";
import AnalysisPage from "./components/AnalysisPage";
import { SimulationProvider, useSimulation } from "./components/SimulationContext";
import logo from './Qubit-Quests-logo.png';


type View = "simulate" | "results" | "analysis";

/** Simple error boundary so bad renders don't blank the whole app */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { err?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { err: undefined };
  }
  static getDerivedStateFromError(err: any) {
    return { err };
  }
  componentDidCatch(err: any) {
    console.error(err);
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui" }}>
          <h2 style={{ color: "#b91c1c" }}>Render error</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fee2e2", padding: 12, borderRadius: 8 }}>
            {String(this.state.err?.message || this.state.err)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function Shell() {
  const { currentView, go } = useSimulation();
  const sidebarOpen = true;

  const navigation: { id: View; name: string; icon: any }[] = [
    { id: "simulate", name: "New Simulation", icon: FlaskConical },
    { id: "results", name: "Results", icon: Zap },
    { id: "analysis", name: "Analysis", icon: Calculator },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            {/* Public asset (Option B). Put the file at: public/Qubit-Quests-logo.png */}

             <img src={logo} alt="Qubit Quests Logo" className="w-20 h-auto" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Quantum H₂ Storage Simulator
              </h1>
              <p className="text-xs font-medium text-slate-500">
                NH₃BH₃ with FLP Catalysis Analysis
              </p>
            </div>
          </div>

          <button className="p-2 transition-colors rounded-lg hover:bg-slate-100">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-slate-200 transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="flex-shrink-0 w-5 h-5" strokeWidth={2.5} />
                  {sidebarOpen && <span className="text-sm">{item.name}</span>}
                  {sidebarOpen && isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {currentView === "simulate" && <SimulationConfig />}
            {currentView === "results" && <ResultsView />}
            {currentView === "analysis" && <AnalysisPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SimulationProvider>
        <Shell />
      </SimulationProvider>
    </ErrorBoundary>
  );
}
