import React from "react";
import {
  Settings,
  FlaskConical,
  Zap,
  Calculator,
  ChevronRight,
  Layers,
  PlayCircle,
} from "lucide-react";

import SimulationConfig from "./components/SimulationConfig";
import ResultsView from "./components/ResultsView";
import AnalysisPage from "./components/AnalysisPage";
import {
  SimulationProvider,
  useSimulation,
} from "./components/SimulationContext";

import logo from "./Qubit-Quests-logo.png";

/* -------------------- TYPES -------------------- */

type View = "simulate" | "results" | "analysis";

type InternalNavItem = {
  id: View;
  name: string;
  icon: any;
};

type ExternalNavItem = {
  id: string;
  name: string;
  icon: any;
  url: string;
};

/* ---------------- ERROR BOUNDARY ---------------- */

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { err?: any }
> {
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
        <div style={{ padding: 16 }}>
          <h2 style={{ color: "#b91c1c" }}>Render error</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.err?.message || this.state.err)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/* -------------------- SHELL -------------------- */

function Shell() {
  const { currentView, go } = useSimulation();
  const sidebarOpen = true;

  /* Internal (state-based) navigation */
  const internalNavigation: InternalNavItem[] = [
    { id: "simulate", name: "New Simulation", icon: FlaskConical },
    { id: "results", name: "Results", icon: Zap },
    { id: "analysis", name: "Analysis", icon: Calculator },
  ];

  /* External (website) navigation */
  const externalNavigation: ExternalNavItem[] = [
    {
      id: "prototype",
      name: "Prototype",
      icon: Layers,
      url: "https://prototype-link.com",
    },
    {
      id: "video",
      name: "Video",
      icon: PlayCircle,
      url: "https://shkumar5-india.github.io/Video/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* ---------------- HEADER ---------------- */}
      <header className="bg-white border-b shadow-sm border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Qubit Quests Logo"
              className="w-20 h-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Quantum H₂ Storage Simulator
              </h1>
              <p className="text-xs text-slate-500">
                NH₃BH₃ with FLP Catalysis Analysis
              </p>
            </div>
          </div>

          <button className="p-2 rounded-lg hover:bg-slate-100">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* ---------------- BODY ---------------- */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="w-64 bg-white border-r border-slate-200">
          <nav className="p-4 space-y-2">
            {/* Internal nav */}
            {internalNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <hr className="my-4 border-slate-200" />

            {/* External nav */}
            {externalNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </aside>

        {/* ---------------- MAIN CONTENT ---------------- */}
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

/* -------------------- APP ROOT -------------------- */

export default function App() {
  return (
    <ErrorBoundary>
      <SimulationProvider>
        <Shell />
      </SimulationProvider>
    </ErrorBoundary>
  );
}
