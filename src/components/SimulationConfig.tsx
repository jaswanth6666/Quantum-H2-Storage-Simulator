import { useState } from "react";
import { Play, Cpu, AlertCircle } from "lucide-react";
import { useSimulation } from "./SimulationContext";

/** Systems shown in the picker */
const SYSTEMS = [
  "H₂",
  "NH₃BH₃",
  "FLP",
  "NH₃BH₃ + FLP",
  "NH₃BH₃ + H₂ + FLP",
  "NH₃BH₃ + 2H₂ + FLP",
] as const;
type System = (typeof SYSTEMS)[number];

/** 🔹 Hard defaults so Analysis NEVER renders blanks on a first run */
const DEFAULT_ABSOLUTES = {
  h2: -1.17843,        // Hartree
  nh3bh3: -83.24561,   // Hartree
  complex: -84.43782,  // Hartree  ← E4 default
};

/** Per-system demo results (only fields that differ from defaults) */
const SYSTEM_RESULTS: Record<
  System,
  {
    h2?: number; nh3bh3?: number; complex?: number; // Hartree
    bindingRaw?: number; bindingBSSE?: number; enthalpy?: number; entropy?: number;
    gibbs298?: number; gibbs350?: number; classification?: "Works" | "Borderline" | "Not viable";
  }
> = {
  "H₂": { bindingBSSE: -10.1, enthalpy: -9.0, gibbs298: -8.3, gibbs350: -7.6, classification: "Borderline" },
  "NH₃BH₃": { bindingBSSE: -12.4, enthalpy: -8.9, gibbs298: -8.5, gibbs350: -7.7, classification: "Works" },
  "FLP": { bindingBSSE: -10.1, enthalpy: -9.0, gibbs298: -8.3, gibbs350: -7.6, classification: "Borderline" },
  "NH₃BH₃ + FLP": { bindingBSSE: -11.2, enthalpy: -9.1, gibbs298: -8.6, gibbs350: -7.8, classification: "Works" },
  "NH₃BH₃ + H₂ + FLP": {
    h2: -1.17843, nh3bh3: -83.24561, complex: -84.43782,
    bindingRaw: -12.4, bindingBSSE: -11.8, enthalpy: -9.4, entropy: 0.5, gibbs298: -8.9, gibbs350: -8.1,
    classification: "Works",
  },
  "NH₃BH₃ + 2H₂ + FLP": {
    complex: -84.50000,
    bindingBSSE: -12.6, enthalpy: -9.4, gibbs298: -8.9, gibbs350: -8.2,
    classification: "Works",
  },
};

export default function SimulationConfig() {
  const { setSimulationData, go, result } = useSimulation();

  const [molecularSystem, setMolecularSystem] = useState<System>("NH₃BH₃ + H₂ + FLP");
  const [method, setMethod] = useState("dft");
  const [basisSet, setBasisSet] = useState("def2-TZVP");
  const [includeVQE, setIncludeVQE] = useState(true);
  const [includeBSSE, setIncludeBSSE] = useState(true);

  const run = () => {
    const picked = SYSTEM_RESULTS[molecularSystem] ?? {};

    /** ✅ Seed with hard defaults → keep any prior values → apply picked overrides */
    const mergedEnergies = {
      ...DEFAULT_ABSOLUTES,                 // guarantees E1/E3/E4 exist
      ...(result?.energies ?? {}),          // keep previous run values
      ...(picked ?? {}),                    // override with picked system
      bindingBSSE: includeBSSE
        ? (picked.bindingBSSE ?? result?.energies?.bindingBSSE)
        : (picked.bindingRaw ?? result?.energies?.bindingRaw ?? result?.energies?.bindingBSSE),
    };

    const payload = {
      id: "SIM-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-001",
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      system: molecularSystem,
      method:
        (method === "dft" ? "ωB97X-D3BJ" : method === "dlpno" ? "DLPNO-CCSD(T)" : "CCSD(T)") +
        "/" + basisSet + (includeVQE ? " + VQE" : ""),
      status: "Completed",
      energies: mergedEnergies,
      vqe: includeVQE
        ? { activeSpace: "(6e, 6o)", convergence: 1.2e-5, iterations: 147, quantumCorrection: -0.3 }
        : undefined,
      kinetics: { activationEnergy: 18.2, gibbsBarrier: 16.7, ratioConstant298: "4.3 × 10⁻³ s⁻¹" },
      classification: SYSTEM_RESULTS[molecularSystem]?.classification ?? "Works",
    };

    setSimulationData({
      molecularSystem, method, basisSet, includeVQE, includeBSSE,
      result: payload,
    });

    go("results");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
        {/* Header */}
        <div className="flex items-center mb-6 space-x-3">
      
          <div>
            <h2 className="text-2xl font-bold text-slate-900">New Simulation</h2>
            <p className="text-sm text-slate-500">Configure quantum hydrogen storage analysis</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="block mb-3 text-sm font-semibold text-slate-700">Molecular System</label>
              <select
                value={molecularSystem}
                onChange={(e) => setMolecularSystem(e.target.value as System)}
                className="w-full px-4 py-3 font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
              >
                {SYSTEMS.map((m) => (
                  <option key={m} value={m}>
                    {m}{m === "NH₃BH₃ + H₂ + FLP" ? " (default)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-3 text-sm font-semibold text-slate-700">Computational Method</label>
              <div className="space-y-3">
                {["dft", "dlpno", "ccsd"].map((m) => (
                  <label key={m} className="flex items-center p-4 space-x-3 transition-colors border-2 cursor-pointer border-slate-200 rounded-xl hover:border-blue-400">
                    <input
                      type="radio"
                      name="method"
                      value={m}
                      checked={method === m}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <span className="font-semibold uppercase text-slate-800">{m}</span>
                      <p className="text-xs text-slate-500">
                        {m === "dft" && "ωB97X-D3BJ functional with dispersion"}
                        {m === "dlpno" && "DLPNO-CCSD(T) high accuracy"}
                        {m === "ccsd" && "Canonical CCSD(T) reference"}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-3 text-sm font-semibold text-slate-700">Basis Set</label>
              <select
                value={basisSet}
                onChange={(e) => setBasisSet(e.target.value)}
                className="w-full px-4 py-3 font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
              >
                <option>def2-TZVP</option>
                <option>def2-QZVPP</option>
                <option>cc-pVTZ</option>
                <option>aug-cc-pVTZ</option>
              </select>
            </div>

            <div className="p-5 border bg-slate-50 rounded-xl border-slate-200">
              <h3 className="flex items-center mb-4 text-sm font-semibold text-slate-700">
                <Cpu className="w-4 h-4 mr-2 text-blue-600" />
                Advanced Options
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 transition-colors bg-white border rounded-lg cursor-pointer border-slate-200 hover:border-blue-300">
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
                <label className="flex items-center justify-between p-3 transition-colors bg-white border rounded-lg cursor-pointer border-slate-200 hover:border-blue-300">
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

            <div className="flex p-4 space-x-3 border bg-amber-50 border-amber-200 rounded-xl">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900">Estimated Runtime</p>
                <p className="mt-1 text-amber-700">~45–90 minutes depending on method and system size</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <span className="font-semibold">Configuration:</span> {method.toUpperCase()} / {basisSet}
            {includeVQE && " + VQE"}
            {includeBSSE && " + BSSE"}
          </div>
          <button
            onClick={run}
            className="flex items-center px-8 py-3 space-x-2 font-semibold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            <span>Run Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
