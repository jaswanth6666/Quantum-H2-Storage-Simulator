import { useState } from 'react';
import { Atom, BarChart3, Settings, Database, FlaskConical, Zap, ChevronRight } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SimulationConfig from './components/SimulationConfig';
import ResultsView from './components/ResultsView';
import DataManager from './components/DataManager';

type View = 'dashboard' | 'simulate' | 'results' | 'data';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: 'dashboard' as View, name: 'Dashboard', icon: BarChart3 },
    { id: 'simulate' as View, name: 'New Simulation', icon: FlaskConical },
    { id: 'results' as View, name: 'Results', icon: Zap },
    { id: 'data' as View, name: 'Data Manager', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 rounded-xl shadow-lg">
              <Atom className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quantum H₂ Storage Simulator</h1>
              <p className="text-xs text-slate-500 font-medium">NH₃BH₃ with FLP Catalysis Analysis</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Settings className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" strokeWidth={2.5} />
                  {sidebarOpen && <span className="text-sm">{item.name}</span>}
                  {sidebarOpen && isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'simulate' && <SimulationConfig />}
            {currentView === 'results' && <ResultsView />}
            {currentView === 'data' && <DataManager />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
