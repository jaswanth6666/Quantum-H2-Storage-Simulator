import { TrendingUp, Zap, CheckCircle2, Clock, ArrowRight, Activity } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Simulations', value: '24', change: '+12%', trend: 'up', icon: Activity },
    { label: 'Successful Runs', value: '21', change: '87.5%', trend: 'up', icon: CheckCircle2 },
    { label: 'Avg Runtime', value: '52 min', change: '-8%', trend: 'down', icon: Clock },
    { label: 'Active Jobs', value: '3', change: 'Running', trend: 'neutral', icon: Zap },
  ];

  const recentResults = [
    {
      id: 'SIM-2024-047',
      system: 'NH₃BH₃ + H₂ + FLP(B/P)',
      bindingEnergy: -12.4,
      gibbs: -8.7,
      classification: 'Works',
      date: '2 hours ago',
    },
    {
      id: 'SIM-2024-046',
      system: 'NH₃BH₃ + H₂',
      bindingEnergy: -6.2,
      gibbs: -3.1,
      classification: 'Marginal',
      date: '5 hours ago',
    },
    {
      id: 'SIM-2024-045',
      system: 'NH₃BH₃ + FLP(Al/N)',
      bindingEnergy: -2.1,
      gibbs: 1.4,
      classification: 'Not Promising',
      date: '1 day ago',
    },
  ];

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Works':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Marginal':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Not Promising':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
        <p className="text-slate-600">Overview of quantum simulation pipeline performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                {stat.trend !== 'neutral' && (
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{stat.change}</span>
                  </div>
                )}
                {stat.trend === 'neutral' && (
                  <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">Recent Simulations</h3>
          <p className="text-sm text-slate-500 mt-1">Latest binding energy calculations</p>
        </div>
        <div className="divide-y divide-slate-100">
          {recentResults.map((result) => (
            <div key={result.id} className="p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-mono font-semibold text-slate-500">{result.id}</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getClassificationColor(result.classification)}`}>
                      {result.classification}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">{result.system}</h4>
                  <div className="flex items-center space-x-6 text-sm">
                    <div>
                      <span className="text-slate-500 font-medium">ΔE<sub>bind</sub>: </span>
                      <span className="font-bold text-slate-900">{result.bindingEnergy} kcal/mol</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">ΔG: </span>
                      <span className="font-bold text-slate-900">{result.gibbs} kcal/mol</span>
                    </div>
                    <div className="text-slate-400">{result.date}</div>
                  </div>
                </div>
                <button className="ml-6 p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 rounded-lg transition-all">
                  <ArrowRight className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 rounded-b-2xl">
          <button className="w-full py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View All Results →
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Energy Distribution</h3>
          <p className="text-blue-100 text-sm mb-6">Binding energies across all systems</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Strong (ΔG &lt; -5)</span>
              <span className="text-2xl font-bold">8</span>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-3">
              <div className="bg-white rounded-full h-3" style={{ width: '33%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Moderate (-5 to 0)</span>
              <span className="text-2xl font-bold">11</span>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-3">
              <div className="bg-white rounded-full h-3" style={{ width: '46%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Weak (ΔG &gt; 0)</span>
              <span className="text-2xl font-bold">5</span>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-3">
              <div className="bg-white rounded-full h-3" style={{ width: '21%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-2">System Status</h3>
          <p className="text-sm text-slate-500 mb-6">Computational resources</p>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">CPU Usage</span>
                <span className="text-sm font-bold text-slate-900">68%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full h-2.5" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Memory</span>
                <span className="text-sm font-bold text-slate-900">42%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full h-2.5" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Queue</span>
                <span className="text-sm font-bold text-slate-900">3 jobs</span>
              </div>
              <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 border border-slate-200">
                Estimated completion: ~2.5 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
