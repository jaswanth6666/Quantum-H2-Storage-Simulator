import React, { createContext, useContext, useMemo, useState } from "react";

export type View = "simulate" | "results" | "analysis";

const HARTREE_TO_KJ = 2625.49962;
const kjToHartree = (x?: number) => (typeof x === "number" ? x / HARTREE_TO_KJ : undefined);

// Default FLP catalyst energy (from you): -4428.01 kJ/mol → Hartree
const E2_DEFAULT_H = kjToHartree(-4428.01) ?? -1.68654;

interface Energies {
  h2?: number;           // Hartree
  nh3bh3?: number;       // Hartree
  complex?: number;      // Hartree
  catalyst?: number;     // Hartree (E2)
  bindingRaw?: number;   // kcal/mol
  bindingBSSE?: number;  // kcal/mol
  zpe?: number;          // kcal/mol
  enthalpy?: number;     // kcal/mol
  entropy?: number;      // kcal/mol
  gibbs298?: number;     // kcal/mol
  gibbs350?: number;     // kcal/mol
}

interface VQEData { activeSpace?: string; convergence?: number; iterations?: number; quantumCorrection?: number; }
interface KineticsData { activationEnergy?: number; gibbsBarrier?: number; ratioConstant298?: string; }

export interface SimulationResult {
  id?: string;
  timestamp?: string;
  system?: string;
  method?: string;
  status?: string;
  energies?: Energies;
  vqe?: VQEData;
  kinetics?: KineticsData;
  classification?: string;
}

export interface SimulationState {
  molecularSystem: string;
  method: string;
  basisSet: string;
  includeVQE: boolean;
  includeBSSE: boolean;
  result?: SimulationResult;
  currentView: View;
  setSimulationData: (data: Partial<SimulationState>) => void;
  go: (view: View) => void;
}

const defaultState: SimulationState = {
  molecularSystem: "",
  method: "DFT",
  basisSet: "def2-TZVP",
  includeVQE: true,
  includeBSSE: true,
  // seed E2 catalyst so E₂ never shows blank
  result: {
    energies: {
      catalyst: E2_DEFAULT_H, // -1.68654 Hartree (from -4428.01 kJ/mol)
    },
  },
  currentView: "simulate",
  setSimulationData: () => {},
  go: () => {},
};

const Ctx = createContext<SimulationState>(defaultState);

export const SimulationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<SimulationState>(defaultState);
  const setSimulationData = (data: Partial<SimulationState>) => setState((prev) => ({ ...prev, ...data }));
  const go = (view: View) => setState((prev) => ({ ...prev, currentView: view }));
  const value = useMemo(() => ({ ...state, setSimulationData, go }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useSimulation = () => useContext(Ctx);
