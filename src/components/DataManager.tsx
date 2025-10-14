import { Search, Filter, Download, Trash2, Eye } from 'lucide-react';

export default function DataManager() {
  const simulations = [
    {
      id: 'SIM-2024-047',
      system: 'NH₃BH₃ + H₂ + FLP(B/P)',
      method: 'DFT + VQE',
      gibbs: -8.7,
      classification: 'Works',
      date: '2024-10-11',
      size: '2.4 MB',
    },
    {
      id: 'SIM-2024-046',
      system: 'NH₃BH₃ + H₂',
      method: 'DFT',
      gibbs: -3.1,
      classification: 'Marginal',
      date: '2024-10-10',
      size: '1.8 MB',
    },
    {
      id: 'SIM-2024-045',
      system: 'NH₃BH₃ + FLP(Al/N)',
      method: 'DLPNO-CCSD(T)',
      gibbs: 1.4,
      classification: 'Not Promising',
      date: '2024-10-10',
      size: '4.2 MB',
    },
    {
      id: 'SIM-2024-044',
      system: 'NH₃BH₃ + H₂ + FLP(C/N)',
      method: 'DFT + VQE',
      gibbs: -6.2,
      classification: 'Marginal',
      date: '2024-10-09',
      size: '2.1 MB',
    },
    {
      id: 'SIM-2024-043',
      system: 'NH₃BH₃ + FLP(B/N)',
      method: 'CCSD(T)',
      gibbs: -9.8,
      classification: 'Works',
      date: '2024-10-09',
      size: '5.6 MB',
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
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Data Manager</h2>
        <p className="text-slate-600">Browse and manage simulation results</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search simulations..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium"
            />
          </div>
          <div className="flex space-x-3">
            <button className="px-5 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export All</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b-2 border-slate-200">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">ID</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">System</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">Method</th>
                <th className="px-4 py-4 text-right text-sm font-bold text-slate-700">ΔG (kcal/mol)</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">Classification</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">Date</th>
                <th className="px-4 py-4 text-right text-sm font-bold text-slate-700">Size</th>
                <th className="px-4 py-4 text-right text-sm font-bold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {simulations.map((sim) => (
                <tr key={sim.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono font-semibold text-slate-700">{sim.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-slate-900">{sim.system}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-slate-600">{sim.method}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900">{sim.gibbs}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getClassificationColor(sim.classification)}`}>
                      {sim.classification}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-slate-600">{sim.date}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm text-slate-600">{sim.size}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                        <Eye className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                        <Download className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-rose-50 rounded-lg transition-colors group">
                        <Trash2 className="h-4 w-4 text-slate-400 group-hover:text-rose-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">5</span> of{' '}
            <span className="font-semibold text-slate-900">24</span> simulations
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Storage Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 font-medium">Used Storage</span>
                <span className="text-sm font-bold text-slate-900">48.3 GB</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full h-2.5" style={{ width: '48%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">51.7 GB available of 100 GB</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">File Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">XYZ Geometries</span>
              <span className="text-sm font-bold text-slate-900">124</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Output Logs</span>
              <span className="text-sm font-bold text-slate-900">98</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">CSV Reports</span>
              <span className="text-sm font-bold text-slate-900">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">PDF Documents</span>
              <span className="text-sm font-bold text-slate-900">24</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors text-left text-sm">
              Backup All Data
            </button>
            <button className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors text-left text-sm">
              Clean Temporary Files
            </button>
            <button className="w-full px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium rounded-xl transition-colors text-left text-sm">
              Delete Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
