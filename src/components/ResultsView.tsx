import { Download, FileText, TrendingDown} from "lucide-react";
import { useSimulation } from "./SimulationContext";

export default function ResultsView() {
  const { result } = useSimulation();

  if (!result) {
    return (
      <div className="mt-20 text-center text-slate-500">
        ⚛️ No simulation selected yet. Run one from the <span className="font-semibold">New Simulation</span> page.
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2 space-x-3">
            <h2 className="text-3xl font-bold text-slate-900">Simulation Results</h2>
            {result.classification && (
              <span className="px-4 py-1.5 text-sm font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                {result.classification}
              </span>
            )}
          </div>
          <p className="font-mono text-sm text-slate-600">
            {result.id} • {result.timestamp}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Data</span>
          </button>
        </div>
      </div>

      <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
        <h3 className="mb-4 text-lg font-bold text-slate-900">System Information</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">Molecular System</p>
            <p className="text-base font-bold text-slate-900">{result.system}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">Computational Method</p>
            <p className="text-base font-bold text-slate-900">{result.method}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">Status</p>
            <p className="text-base font-bold text-emerald-600">{result.status}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-8 text-white shadow-lg bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl">
          <div className="flex items-center mb-6 space-x-3">
            <TrendingDown className="w-8 h-8" strokeWidth={2.5} />
            <h3 className="text-2xl font-bold">Thermodynamic Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
              <p className="mb-1 text-sm text-blue-100">Binding Energy (BSSE-corrected)</p>
              <p className="text-3xl font-bold">
                {result.energies?.bindingBSSE ?? "—"} kcal/mol
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
                <p className="mb-1 text-xs text-blue-100">ΔH (298K)</p>
                <p className="text-xl font-bold">{result.energies?.enthalpy ?? "—"}</p>
              </div>
              <div className="p-4 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
                <p className="mb-1 text-xs text-blue-100">TΔS (298K)</p>
                <p className="text-xl font-bold">{result.energies?.entropy ?? "—"}</p>
              </div>
            </div>
            <div className="p-4 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
              <p className="mb-1 text-sm text-blue-100">ΔG (298K)</p>
              <p className="text-3xl font-bold">{result.energies?.gibbs298 ?? "—"} kcal/mol</p>
            </div>
            <div className="p-4 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
              <p className="mb-1 text-sm text-blue-100">ΔG (350K)</p>
              <p className="text-3xl font-bold">{result.energies?.gibbs350 ?? "—"} kcal/mol</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-center mb-6 space-x-3">
              
              <h3 className="text-lg font-bold text-slate-900">VQE Quantum Refinement</h3>
            </div>
            <div className="space-y-4">
              <Row k="Active Space" v={result.vqe?.activeSpace ?? "—"} />
              <Row k="Convergence" v={result.vqe?.convergence != null ? `${result.vqe?.convergence.toExponential(1)} Eh` : "—"} />
              <Row k="Iterations" v={result.vqe?.iterations ?? "—"} />
              <div className="p-4 border border-purple-200 bg-purple-50 rounded-xl">
                <p className="mb-1 text-xs font-semibold text-purple-600">Quantum Correction</p>
                <p className="text-2xl font-bold text-purple-900">{result.vqe?.quantumCorrection ?? "—"} kcal/mol</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="flex items-center mb-6 space-x-3">
              
              <h3 className="text-lg font-bold text-slate-900">Kinetics</h3>
            </div>
            <Row k="ΔE‡" v={`${result.kinetics?.activationEnergy ?? "—"} kcal/mol`} />
            <Row k="ΔG‡ (298K)" v={`${result.kinetics?.gibbsBarrier ?? "—"} kcal/mol`} />
            <div className="p-4 border bg-amber-50 rounded-xl border-amber-200">
              <p className="mb-1 text-xs font-semibold text-amber-600">Rate Constant (298K)</p>
              <p className="text-lg font-bold text-amber-900">{result.kinetics?.ratioConstant298 ?? "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Electronic energies quick readout */}
      <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Electronic Energies</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card label="E(H₂)" value={result.energies?.h2} unit="Hartree" />
          <Card label="E(NH₃BH₃)" value={result.energies?.nh3bh3} unit="Hartree" />
          <Card label="E(Complex)" value={result.energies?.complex} unit="Hartree" highlight />
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100">
      <span className="text-sm font-medium text-slate-600">{k}</span>
      <span className="font-bold text-slate-900">{v}</span>
    </div>
  );
}
function Card({ label, value, unit, highlight }: { label: string; value?: number; unit?: string; highlight?: boolean }) {
  const content = value != null ? `${value} ${unit ?? ""}` : "—";
  return (
    <div className={"p-4 rounded-xl border " + (highlight ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-transparent shadow-lg" : "bg-slate-50 border-slate-200")}>
      <p className={"text-xs " + (highlight ? "text-blue-50" : "text-slate-500")}>{label}</p>
      <p className={"mt-1 font-mono text-lg " + (highlight ? "text-white" : "text-slate-900")}>{content}</p>
    </div>
  );
}
