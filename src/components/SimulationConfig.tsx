import { useState } from 'react';
import { Play, Upload, Cpu, Atom, AlertCircle } from 'lucide-react';

export default function SimulationConfig() {
  const [method, setMethod] = useState('dft');
  const [basisSet, setBasisSet] = useState('def2-TZVP');
  const [includeVQE, setIncludeVQE] = useState(true);
  const [includeBSSE, setIncludeBSSE] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2.5 rounded-xl">
            <Atom className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">New Simulation</h2>
            <p className="text-sm text-slate-500">Configure quantum hydrogen storage analysis</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Molecular System</label>
              <div className="space-y-3">
                <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 font-medium">
                  <option>H₂</option>
                  <option>NH₃BH₃</option>
                  <option>FLP</option>
                  <option>NH₃BH₃ + FLP</option>
                  <option>NH₃BH₃ + FLP + H₂</option>
                  <option>NH₃BH₃ + 2H₂ + FLP</option>
                  <option></option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Computational Method</label>
              <div className="space-y-3">
                {['dft', 'dlpno', 'ccsd'].map((m) => (
                  <label key={m} className="flex items-center space-x-3 p-4 border-2 border-slate-200 rounded-xl hover:border-blue-400 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="method"
                      value={m}
                      checked={method === m}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-slate-800 uppercase">{m}</span>
                      <p className="text-xs text-slate-500">
                        {m === 'dft' && 'ωB97X-D3BJ functional with dispersion'}
                        {m === 'dlpno' && 'DLPNO-CCSD(T) high accuracy'}
                        {m === 'ccsd' && 'Canonical CCSD(T) reference'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Basis Set</label>
              <select
                value={basisSet}
                onChange={(e) => setBasisSet(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 font-medium"
              >
                <option>def2-TZVP</option>
                <option>def2-QZVPP</option>
                <option>cc-pVTZ</option>
                <option>aug-cc-pVTZ</option>
              </select>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-blue-600" />
                Advanced Options
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
                  <div>
                    <span className="text-sm font-medium text-slate-700">VQE Active Space</span>
                    <p className="text-xs text-slate-500">Quantum variational eigensolver</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeVQE}
                    onChange={(e) => setIncludeVQE(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
                  <div>
                    <span className="text-sm font-medium text-slate-700">BSSE Correction</span>
                    <p className="text-xs text-slate-500">Counterpoise method</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeBSSE}
                    onChange={(e) => setIncludeBSSE(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                </label>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900">Estimated Runtime</p>
                <p className="text-amber-700 mt-1">~45-90 minutes depending on method and system size</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
          <div className="text-sm text-slate-600">
            <span className="font-semibold">Configuration:</span> {method.toUpperCase()} / {basisSet}
            {includeVQE && ' + VQE'}
            {includeBSSE && ' + BSSE'}
          </div>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all flex items-center space-x-2">
            <Play className="h-5 w-5" fill="currentColor" />
            <span>Run Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
