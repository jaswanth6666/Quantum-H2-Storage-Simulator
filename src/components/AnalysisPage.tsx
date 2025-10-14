import React from "react";
import { Beaker, FlaskConical } from "lucide-react";
import { useSimulation } from "./SimulationContext";

// unit helpers
const HARTREE_TO_KJ = 2625.49962;
const kcalToKJ = (x?: number) => (typeof x === "number" ? x * 4.184 : undefined);
const kjToHartree = (x?: number) => (typeof x === "number" ? x / HARTREE_TO_KJ : undefined);
const fmt = (x?: number, unit?: string, digits = 2) =>
  typeof x === "number" ? `${x.toFixed(digits)}${unit ? " " + unit : ""}` : "—";

// your FLP catalyst energy default: -4428.01 kJ/mol → Hartree
const E2_DEFAULT_H = kjToHartree(-4428.01) ?? -1.68654;

export default function AnalysisPage() {
  const { result } = useSimulation();
  const e = result?.energies ?? {};

  // Absolute energies from Results (Hartree)
  const E1_H = e.nh3bh3;
  const E2_H = e.catalyst ?? E2_DEFAULT_H; // fixed; no override control
  const E3_H = e.h2;
  const E4_H = e.complex;

  // Secondary (kJ/mol) lines
  const E1_kJ = typeof E1_H === "number" ? E1_H * HARTREE_TO_KJ : undefined;
  const E2_kJ = typeof E2_H === "number" ? E2_H * HARTREE_TO_KJ : undefined; // will be -4428.01
  const E3_kJ = typeof E3_H === "number" ? E3_H * HARTREE_TO_KJ : undefined;
  const E4_kJ = typeof E4_H === "number" ? E4_H * HARTREE_TO_KJ : undefined;

  // Relative (PDF) state energies → show primarily in Hartree
  const E5_kJ_pdf = -11338.92;
  const E6_kJ_pdf = -13123.99;
  const E5_rel_H = kjToHartree(E5_kJ_pdf);
  const E6_rel_H = kjToHartree(E6_kJ_pdf);

  // Binding from absolute totals
  const bindingHartree =
    typeof E1_H === "number" && typeof E2_H === "number" && typeof E4_H === "number"
      ? E4_H - E1_H - E2_H
      : undefined;
  const bindingKJ = typeof bindingHartree === "number" ? bindingHartree * HARTREE_TO_KJ : undefined;

  // Thermodynamics from Results
  const bindingBSSE_kcal = e.bindingBSSE;
  const enthalpy_kcal = e.enthalpy;
  const gibbs298_kcal = e.gibbs298;
  const gibbs350_kcal = e.gibbs350;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center space-x-3">
        <h1 className="text-3xl font-bold text-slate-900">Summary & Analysis</h1>
      </header>

      {/* Reaction scheme + equations + theory */}
      <section className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
        <div className="flex items-center mb-4 space-x-2">
          <Beaker className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900">Reaction Scheme (A–E): Equations + Theory</h2>
        </div>
        <div className="p-4 space-y-4 leading-relaxed border rounded-lg bg-slate-50 border-slate-100 text-slate-800">
          <Eq
            step="A"
            eq={`NH₃BH₃  +  FLP  ⇌  [R₃P–H]⁺[H–B(C₆F₅)₃]⁻  →  NH₂BH₂  +  H₂  +  FLP`}
            theory="FLP heterolysis of N–H and B–H captures H⁺/H⁻ in a single step (phosphonium/borohydride), evolving H₂."
          />
          <Eq
            step="B"
            eq={`NH₃BH₃  +  [R₃P–H]⁺[H–B(C₆F₅)₃]⁻  →  (aminoborane–borane)⋯B(C₆F₅)₃  +  H₂`}
            theory="Borohydride donates H⁻ and phosphonium donates H⁺ to another NH₃BH₃, giving additional H₂ and a coordinated complex."
          />
          <Eq
            step="C"
            eq={`ion pair complex  →  H₂  +  aminoborane  +  FLP`}
            theory="Recombination of H⁺/H⁻ releases H₂ and regenerates the free FLP (turnover)."
          />
          <Eq
            step="D"
            eq={`aminoborane  +  ion pair  →  BNₓHᵧ (dehydrogenated)  +  H₂  +  FLP`}
            theory="Further dehydrogenation via shuttled H⁺/H⁻ forms BNₓHᵧ frameworks and additional H₂."
          />
          <Eq
            step="E"
            eq={`BNₓHᵧ  +  FLP  +  H₂  →  NH₃BH₃  +  ion pair`}
            theory="Rehydrogenation in the presence of FLP closes the reversible storage cycle."
          />
        </div>
      </section>

      {/* E1–E6 */}
      <section className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
        <h2 className="mb-1 text-xl font-semibold text-slate-900">E₁–E₆ (Electronic / State Energies)</h2>
        <p className="mb-4 text-xs text-slate-500">
          E₁, E₂, E₃, E₄ are absolute (Hartree). E₂ defaults to your FLP value (−4428.01 kJ·mol⁻¹ ≈ −1.68654 Hartree).
          E₅/E₆ are relative energies from the paper shown primarily in Hartree (converted) with original kJ·mol⁻¹ beneath.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <EnergyCard label="E₁ — NH₃BH₃ (absolute)" primary={fmt(E1_H, "Hartree")} secondary={fmt(E1_kJ, "kJ·mol⁻¹")} />
          <EnergyCard label="E₂ — FLP catalyst (absolute)" primary={fmt(E2_H, "Hartree", 5)} secondary={fmt(E2_kJ, "kJ·mol⁻¹")} />
          <EnergyCard label="E₃ — H₂ (absolute)" primary={fmt(E3_H, "Hartree")} secondary={fmt(E3_kJ, "kJ·mol⁻¹")} />
          <EnergyCard label="E₄ — Complex (absolute)" highlight primary={fmt(E4_H, "Hartree")} secondary={fmt(E4_kJ, "kJ·mol⁻¹")} />
          <EnergyCard label="E₅ — After 1st H₂ (relative, PDF)" primary={fmt(E5_rel_H, "Hartree", 4)} secondary={fmt(E5_kJ_pdf, "kJ·mol⁻¹")} />
          <EnergyCard label="E₆ — After 2nd H₂ (relative, PDF)" primary={fmt(E6_rel_H, "Hartree", 4)} secondary={fmt(E6_kJ_pdf, "kJ·mol⁻¹")} />
        </div>

        {/* Binding from absolute totals */}
        <div className="grid gap-4 mt-6 md:grid-cols-2">
          <div className="p-4 bg-white border rounded-xl border-slate-200">
            <p className="text-xs text-slate-500">Binding (absolute totals)</p>
            <p className="mt-1 font-mono text-lg text-slate-900">
              {typeof bindingHartree === "number" ? fmt(bindingHartree, "Hartree", 6) : "—"}
            </p>
            <p className="mt-1 text-xs text-slate-500">{fmt(bindingKJ, "kJ·mol⁻¹")}</p>
            <p className="text-[11px] text-slate-500 mt-2">Computed as E₄ − E₁ − E₂.</p>
          </div>

          <div className="p-4 bg-white border rounded-xl border-slate-200">
            <p className="text-xs text-slate-500">Binding (BSSE-corrected, from Results)</p>
            <p className="mt-1 font-mono text-lg text-slate-900">{fmt(bindingBSSE_kcal, "kcal·mol⁻¹")}</p>
            <p className="mt-1 text-xs text-slate-500">{fmt(kcalToKJ(bindingBSSE_kcal), "kJ·mol⁻¹")}</p>
          </div>
        </div>
      </section>

      {/* Thermodynamics from Results */}
      <section className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
        <div className="flex items-center mb-4 space-x-2">
          <FlaskConical className="w-5 h-5 text-pink-600" />
          <h2 className="text-xl font-semibold text-slate-900">Binding & Thermodynamics (from Results)</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Binding Energy (BSSE-corrected)" main={fmt(bindingBSSE_kcal, "kcal·mol⁻¹")} sub={fmt(kcalToKJ(bindingBSSE_kcal), "kJ·mol⁻¹")} emphasis />
          <MetricCard title="ΔH (298 K)" main={fmt(enthalpy_kcal, "kcal·mol⁻¹")} sub={fmt(kcalToKJ(enthalpy_kcal), "kJ·mol⁻¹")} />
          <MetricCard title="ΔG (298 K)" main={fmt(gibbs298_kcal, "kcal·mol⁻¹")} sub={fmt(kcalToKJ(gibbs298_kcal), "kJ·mol⁻¹")} />
        </div>
      </section>

      {/* Gibbs relation */}
      <section className="p-6 border bg-slate-50 rounded-2xl border-slate-200">
        <h2 className="mb-2 text-lg font-bold text-slate-900">Gibbs Relation</h2>
        <div className="p-4 font-mono leading-relaxed bg-white border rounded-lg border-slate-200">
          ΔG = ΔH − TΔS
          {typeof gibbs298_kcal === "number" && (
            <>
              <br />At 298 K: ΔG = {fmt(gibbs298_kcal, "kcal·mol⁻¹")} ({fmt(kcalToKJ(gibbs298_kcal), "kJ·mol⁻¹")})
            </>
          )}
          {typeof gibbs350_kcal === "number" && (
            <>
              <br />At 350 K: ΔG = {fmt(gibbs350_kcal, "kcal·mol⁻¹")} ({fmt(kcalToKJ(gibbs350_kcal), "kJ·mol⁻¹")})
            </>
          )}
        </div>
      </section>
    </div>
  );
}

/* helpers */
function Eq({ step, eq, theory }: { step: string; eq: string; theory: string }) {
  return (
    <div>
      <div className="font-mono text-slate-900">{step}. {eq}</div>
      <div className="mt-1 text-sm text-slate-600">{theory}</div>
    </div>
  );
}

function EnergyCard({
  label, primary, secondary, highlight,
}: { label: string; primary: string; secondary?: string; highlight?: boolean; }) {
  return (
    <div className={"p-4 rounded-xl border " + (highlight ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-transparent shadow-lg" : "bg-slate-50 border-slate-200")}>
      <p className={"text-xs " + (highlight ? "text-blue-50" : "text-slate-500")}>{label}</p>
      <p className={"mt-1 font-mono text-lg " + (highlight ? "text-white" : "text-slate-900")}>{primary}</p>
      {secondary && <p className={"text-xs mt-1 " + (highlight ? "text-blue-50/90" : "text-slate-500")}>{secondary}</p>}
    </div>
  );
}

function MetricCard({ title, main, sub, emphasis }: { title: string; main: string; sub?: string; emphasis?: boolean; }) {
  return (
    <div className={"p-4 rounded-xl border " + (emphasis ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-transparent shadow-lg" : "bg-slate-50 border-slate-200")}>
      <p className={"text-xs " + (emphasis ? "text-emerald-50" : "text-slate-500")}>{title}</p>
      <p className={"mt-1 text-2xl font-bold " + (emphasis ? "text-white" : "text-slate-900")}>{main}</p>
      {sub && <p className={"text-xs mt-1 " + (emphasis ? "text-emerald-50" : "text-slate-500")}>{sub}</p>}
    </div>
  );
}
