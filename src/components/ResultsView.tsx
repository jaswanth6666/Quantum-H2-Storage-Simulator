import { Download, FileText, TrendingDown, Zap, Atom } from 'lucide-react';

export default function ResultsView() {
  const result = {
    id: 'SIM-2024-047',
    timestamp: '2024-10-11 14:23:45',
    system: 'NH₃BH₃ + H₂ + FLP(B/P)',
    method: 'ωB97X-D3BJ/def2-TZVP + VQE',
    status: 'Completed',
    energies: {
      h2: -1.17843,
      nh3bh3: -83.24561,
      complex: -84.43782,
      bindingRaw: -12.4,
      bindingBSSE: -11.8,
      zpe: 2.1,
      enthalpy: -9.2,
      entropy: 0.5,
      gibbs298: -8.7,
      gibbs350: -7.9,
    },
    vqe: {
      activeSpace: '(6e, 6o)',
      convergence: 1.2e-5,
      iterations: 147,
      quantumCorrection: -0.3,
    },
    kinetics: {
      activationEnergy: 18.2,
      gibbsBarrier: 16.7,
      ratioConstant298: '4.3 × 10⁻³ s⁻¹',
    },
    classification: 'Works',
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-900">Simulation Results</h2>
            <span className="px-4 py-1.5 text-sm font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
              {result.classification}
            </span>
          </div>
          <p className="text-slate-600 font-mono text-sm">{result.id} • {result.timestamp}</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Data</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">System Information</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Molecular System</p>
            <p className="text-base font-bold text-slate-900">{result.system}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Computational Method</p>
            <p className="text-base font-bold text-slate-900">{result.method}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Status</p>
            <p className="text-base font-bold text-emerald-600">{result.status}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingDown className="h-8 w-8" strokeWidth={2.5} />
            <h3 className="text-2xl font-bold">Thermodynamic Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-blue-100 mb-1">Binding Energy (BSSE-corrected)</p>
              <p className="text-3xl font-bold">{result.energies.bindingBSSE} kcal/mol</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-blue-100 mb-1">ΔH (298K)</p>
                <p className="text-xl font-bold">{result.energies.enthalpy}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-blue-100 mb-1">TΔS (298K)</p>
                <p className="text-xl font-bold">{result.energies.entropy}</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-blue-100 mb-1">ΔG (298K)</p>
              <p className="text-3xl font-bold">{result.energies.gibbs298} kcal/mol</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-blue-100 mb-1">ΔG (350K)</p>
              <p className="text-3xl font-bold">{result.energies.gibbs350} kcal/mol</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-xl">
                <Atom className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">VQE Quantum Refinement</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600 font-medium">Active Space</span>
                <span className="font-bold text-slate-900">{result.vqe.activeSpace}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600 font-medium">Convergence</span>
                <span className="font-bold text-slate-900">{result.vqe.convergence.toExponential(1)} Eh</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600 font-medium">Iterations</span>
                <span className="font-bold text-slate-900">{result.vqe.iterations}</span>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <p className="text-xs text-purple-600 font-semibold mb-1">Quantum Correction</p>
                <p className="text-2xl font-bold text-purple-900">{result.vqe.quantumCorrection} kcal/mol</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 rounded-xl">
                <Zap className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Kinetics</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600 font-medium">ΔE‡</span>
                <span className="font-bold text-slate-900">{result.kinetics.activationEnergy} kcal/mol</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-sm text-slate-600 font-medium">ΔG‡ (298K)</span>
                <span className="font-bold text-slate-900">{result.kinetics.gibbsBarrier} kcal/mol</span>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-xs text-amber-600 font-semibold mb-1">Rate Constant (298K)</p>
                <p className="text-lg font-bold text-amber-900">{result.kinetics.ratioConstant298}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Electronic Energies</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b-2 border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">Species</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-slate-700">E (Hartree)</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-slate-700">ZPE (kcal/mol)</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-slate-700">E + ZPE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">H₂</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-700">{result.energies.h2}</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-700">6.3</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-900 font-semibold">-1.16839</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">NH₃BH₃</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-700">{result.energies.nh3bh3}</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-700">67.8</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-900 font-semibold">-83.13758</td>
              </tr>
              <tr className="hover:bg-slate-50 bg-blue-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">Complex</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-700">{result.energies.complex}</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-700">76.2</td>
                <td className="px-4 py-3 text-sm font-mono text-right text-slate-900 font-semibold">-84.31632</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
