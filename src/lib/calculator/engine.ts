import { CalculationResult } from "./types";

const format = (val: number, digits: number = 4): string =>
  Number.isFinite(val) ? val.toFixed(digits) : "Invalid";

const formatExp = (val: number, digits: number = 4): string =>
  Number.isFinite(val) ? val.toExponential(digits) : "Invalid";

/* -------------------------------------------------------------
   BASIC CALCULATIONS
------------------------------------------------------------- */

export function calculateInductiveReactance(method: string, toBase: (f: string) => number): CalculationResult {
  const f = toBase("f");
  const L = toBase("L");
  if (isNaN(f) || isNaN(L)) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "Ω" };
  const Xl = 2 * Math.PI * f * L;
  return { primaryValue: format(Xl, 3), rawValue: Xl, primaryUnit: "Ω" };
}

export function calculateCapacitiveReactance(method: string, toBase: (f: string) => number): CalculationResult {
  const f = toBase("f");
  const C = toBase("C");
  if (isNaN(f) || isNaN(C) || f === 0 || C === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "Ω" };
  const Xc = 1 / (2 * Math.PI * f * C);
  return { primaryValue: format(Xc, 3), rawValue: Xc, primaryUnit: "Ω" };
}

export function calculateResonantFrequency(method: string, toBase: (f: string) => number): CalculationResult {
  const L = toBase("L");
  const C = toBase("C");
  if (isNaN(L) || isNaN(C) || L <= 0 || C <= 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "kHz" };
  const fr = 1 / (2 * Math.PI * Math.sqrt(L * C));
  return {
    primaryValue: format(fr / 1000, 3),
    rawValue: fr,
    primaryUnit: "kHz",
    secondaryValues: {
      "Frequency (MHz)": { value: format(fr / 1e6, 4), unit: "MHz" },
      "Frequency (Hz)": { value: format(fr, 2), unit: "Hz" },
    },
  };
}

export function calculatePotentialDivider(method: string, toBase: (f: string) => number): CalculationResult {
  const Vin = toBase("Vin");
  const R1 = toBase("R1");
  const R2 = toBase("R2");
  if (isNaN(Vin) || isNaN(R1) || isNaN(R2) || (R1 + R2) === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "V" };
  const Vout = Vin * (R2 / (R1 + R2));
  return {
    primaryValue: format(Vout, 3),
    rawValue: Vout,
    primaryUnit: "V",
    secondaryValues: { "Ratio (R2/Total)": { value: format(R2 / (R1 + R2), 4), unit: "" } },
  };
}

/* -------------------------------------------------------------
   INDUCTOR DESIGN
------------------------------------------------------------- */

export function calculateInductance(method: string, toBase: (f: string) => number, formData: any): CalculationResult {
  const Vin = toBase("Vin");
  const Vout = toBase("Vout");
  const topology = formData.topology || "Buck Converter";
  const Fsw = toBase("Fsw");
  if (isNaN(Vin) || isNaN(Vout) || Fsw === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µH" };

  let L = 0;
  let D = 0;
  let deltaIL = 0;

  if (method === "M1") {
    deltaIL = toBase("deltaIl");
    if (deltaIL === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µH" };
    if (topology === "Buck Converter") {
      D = Vout / Vin;
      L = ((Vin - Vout) * D) / (deltaIL * Fsw);
    } else {
      D = 1 - (Vin / Vout);
      L = (Vin * D) / (Fsw * deltaIL);
    }
  } else {
    const ripple = toBase("ripple_pct") / 100;
    const Pout = toBase("Pout");
    if (ripple === 0 || Pout === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µH" };

    if (topology === "Buck Converter") {
      D = Vout / Vin;
      deltaIL = ripple * (Pout / Vout);
      L = ((Vin - Vout) * D) / (Fsw * deltaIL);
    } else {
      const eta = toBase("eta") / 100 || 0.9;
      D = 1 - (Vin / Vout);
      deltaIL = ripple * (Pout / (Vin * eta));
      L = (Vin * D) / (Fsw * deltaIL);
    }
  }

  return {
    primaryValue: format(L * 1e6, 3),
    rawValue: L,
    primaryUnit: "µH",
    secondaryValues: {
      "Duty Cycle (D)": { value: format(D * 100, 2), unit: "%" },
      "ΔI_L (Peak-to-Peak)": { value: format(deltaIL, 3), unit: "A" }
    }
  };
}

export function calculateInductanceFactor(method: string, toBase: (f: string) => number): CalculationResult {
  if (method === "M1") {
    const L = toBase("L");
    const N = toBase("N");
    if (N === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "nH/N²" };
    const AL = (L * 1e9) / (N * N);
    return { primaryValue: format(AL, 2), rawValue: AL, primaryUnit: "nH/N²" };
  }
  const mu0 = 4 * Math.PI * 1e-7;
  const mu_r = toBase("mu_r");
  const Ac = toBase("Ac");
  const le = toBase("le");
  if (le === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "nH/N²" };
  const AL = (mu0 * mu_r * Ac) / le;
  return { primaryValue: format(AL * 1e9, 2), rawValue: AL, primaryUnit: "nH/N²" };
}

export function calculateFlux(method: string, toBase: (f: string) => number): CalculationResult {
  let flux = 0;
  if (method === "M1") {
    flux = (toBase("AL") * 1e-9) * toBase("N") * toBase("I");
  } else {
    const L = toBase("L");
    const I = toBase("I");
    const N = toBase("N");
    if (N === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "Wb" };
    flux = (L * I) / N;
  }
  return { primaryValue: formatExp(flux), rawValue: flux, primaryUnit: "Wb" };
}

export function calculateFluxDensity(method: string, toBase: (f: string) => number): CalculationResult {
  let B = 0;
  if (method === "M1") {
    const flux = toBase("flux");
    const area = toBase("area");
    if (area === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "T" };
    B = flux / area;
  } else {
    const L = toBase("L");
    const Ipeak = toBase("Ipeak");
    const N = toBase("N");
    const Ac = toBase("Ac");
    if (N === 0 || Ac === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "T" };
    B = (L * Ipeak) / (N * Ac);
  }
  return { primaryValue: format(B, 4), rawValue: B, primaryUnit: "T" };
}

export function calculateAreaProduct(method: string, toBase: (f: string) => number): CalculationResult {
  const L = toBase("L");
  const Ipeak = toBase("Ipeak");
  const Irms = toBase("Irms");
  const Bmax = toBase("Bmax");
  const J = toBase("J"); // A/m^2
  const Ku = toBase("Ku");
  if (Ku === 0 || J === 0 || Bmax === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "cm⁴" };
  // Ap = (L * Ipeak * Irms * 10^4) / (Ku * J * Bmax)
  const Ap = (L * Ipeak * Irms * 1e4) / (Ku * J * Bmax);
  return { primaryValue: formatExp(Ap, 3), rawValue: Ap, primaryUnit: "cm⁴" };
}

/* -------------------------------------------------------------
   CAPACITOR DESIGN
------------------------------------------------------------- */

export function calculateCapIcrms(method: string, toBase: (f: string) => number, formData: any): CalculationResult {
  const topology = formData.topology || "Buck Converter";
  const deltaIL = toBase("deltaIl");
  let result = 0;

  if (method === "Input Capacitor") {
    if (topology === "Buck Converter") {
      const Iout = toBase("Iout");
      const D = toBase("D") / 100;
      result = Math.sqrt(Iout * Iout * D * (1 - D) + (deltaIL * deltaIL / 12) * D);
    } else {
      result = deltaIL / Math.sqrt(12);
    }
  } else {
    if (topology === "Buck Converter") {
      result = deltaIL / Math.sqrt(12);
    } else {
      const Iout = toBase("Iout");
      const D = toBase("D") / 100;
      if (D >= 1) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "A" };
      result = Math.sqrt((Iout * Iout * D) / (1 - D) + (deltaIL * deltaIL / 12) * (1 - D));
    }
  }
  return { primaryValue: format(result, 4), rawValue: result, primaryUnit: "A" };
}

export function calculateCapCmin(method: string, toBase: (f: string) => number, formData: any): CalculationResult {
  const topology = formData.topology || "Buck Converter";
  const f = toBase("f");
  if (f === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µF" };
  
  let C = 0;
  if (method === "Input Capacitor") {
    if (topology === "Buck Converter") {
      const Iout = toBase("Iout"), D = toBase("D") / 100, deltaVin = toBase("deltaVin");
      if (deltaVin === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µF" };
      C = (Iout * D * (1 - D)) / (f * deltaVin);
    } else {
      const deltaIL = toBase("deltaIl"), deltaVin = toBase("deltaVin");
      if (deltaVin === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µF" };
      C = deltaIL / (8 * f * deltaVin);
    }
  } else {
    if (topology === "Buck Converter") {
      const deltaIL = toBase("deltaIl"), deltaVout = toBase("deltaVout");
      if (deltaVout === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µF" };
      C = deltaIL / (8 * f * deltaVout);
    } else {
      const Iout = toBase("Iout"), D = toBase("D") / 100, deltaVout = toBase("deltaVout");
      if (deltaVout === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µF" };
      C = (Iout * D) / (f * deltaVout);
    }
  }
  return { primaryValue: format(C * 1e6, 3), rawValue: C, primaryUnit: "µF" };
}

/* -------------------------------------------------------------
   POWER ELECTRONICS (MOSFET/TRANSFORMER)
------------------------------------------------------------- */

export function calculateFullBridgeLoss(method: string, toBase: (f: string) => number): CalculationResult {
  if (method === "Conduction Loss") {
    const Irms = toBase("Irms");
    const Rds = toBase("Rds_on");
    const single = Irms * Irms * Rds;
    const total = 4 * single;
    return { 
      primaryValue: format(total, 3), 
      rawValue: total, 
      primaryUnit: "W",
      secondaryValues: { "Per MOSFET": { value: format(single, 3), unit: "W" } }
    };
  } else {
    const Vin = toBase("Vin"), Id = toBase("Id"), tr = toBase("tr"), tf = toBase("tf"), Fsw = toBase("Fsw");
    const total = 2 * Vin * Id * (tr + tf) * Fsw;
    return { primaryValue: format(total, 3), rawValue: total, primaryUnit: "W" };
  }
}

export function calculateBuckBoostLoss(method: string, toBase: (f: string) => number, variableName: string): CalculationResult {
  const Rds = toBase("Rds_on");
  const I = variableName === "BuckLoss" ? toBase("Iout") : toBase("Iin");
  const D = toBase("D") / 100;
  const Ploss = I * I * D * Rds;
  return { primaryValue: format(Ploss, 3), rawValue: Ploss, primaryUnit: "W" };
}

export function calculateTransformer(variableName: string, method: string, toBase: (f: string) => number): CalculationResult {
  if (variableName === "TurnsRatio") {
    const Vp = toBase("Vp"), Vs = toBase("Vs");
    if (Vs === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "" };
    const ratio = Vp / Vs;
    return { primaryValue: format(ratio, 3), rawValue: ratio, primaryUnit: "" };
  }
  if (variableName === "TrFluxDensity") {
    const Vin = toBase("Vin"), f = toBase("f"), N = toBase("N"), Ac = toBase("Ac");
    if (f === 0 || N === 0 || Ac === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "T" };
    const B = Vin / (4.44 * f * N * Ac);
    return { primaryValue: format(B, 4), rawValue: B, primaryUnit: "T" };
  }
  if (variableName === "TrAreaProduct") {
    const Ptot = toBase("Ptot"), Bm = toBase("Bm"), J = toBase("J"), f = toBase("f");
    const Kf = 4.44, Ku = 0.4; // Constants used in source
    if (Bm === 0 || J === 0 || f === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "cm⁴" };
    const Ap = Ptot / (Kf * Ku * Bm * J * f);
    return { primaryValue: formatExp(Ap, 3), rawValue: Ap, primaryUnit: "cm⁴" };
  }
  return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "" };
}

/* -------------------------------------------------------------
   FILTER DESIGN
------------------------------------------------------------- */

export function calculateFilter(variableName: string, method: string, toBase: (f: string) => number): CalculationResult {
  if (variableName === "CornerFreq") {
    const L = toBase("L"), C = toBase("C");
    if (L <= 0 || C <= 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "kHz" };
    const fc = 1 / (2 * Math.PI * Math.sqrt(L * C));
    return { primaryValue: format(fc / 1000, 3), rawValue: fc, primaryUnit: "kHz" };
  }
  if (variableName === "InductorSel") {
    const fsw = toBase("fsw"), fc = toBase("fc");
    if (fc === 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "dB" };
    const ratio = fsw / fc;
    if (ratio === 1) return { primaryValue: "Resonance", rawValue: NaN, primaryUnit: "dB" };
    const att = 20 * Math.log10(Math.abs(1 / (1 - ratio * ratio)));
    return { primaryValue: format(att, 2), rawValue: att, primaryUnit: "dB" };
  }
  if (variableName === "CapacitorSel") {
    const Zt = toBase("Ztarget"), L = toBase("L");
    if (Zt <= 0) return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "µF" };
    const C = L / (Zt * Zt);
    return { primaryValue: format(C * 1e6, 3), rawValue: C, primaryUnit: "µF" };
  }
  return { primaryValue: "Invalid", rawValue: NaN, primaryUnit: "" };
}

/* -------------------------------------------------------------
   DISPATCHER
------------------------------------------------------------- */

const calculatorMap: Record<string, Function> = {
  Inductance: calculateInductance,
  InductanceFactor: calculateInductanceFactor,
  Flux: calculateFlux,
  FluxDensity: calculateFluxDensity,
  MaxFluxDensity: calculateFluxDensity,
  AreaProduct: calculateAreaProduct,
  RMSCapacitorCurrent: calculateCapIcrms,
  MinimumCapacitance: calculateCapCmin,
  InductiveReactance: calculateInductiveReactance,
  CapacitiveReactance: calculateCapacitiveReactance,
  ResonantFrequency: calculateResonantFrequency,
  PotentialDivider: calculatePotentialDivider,
  FullBridgeLoss: calculateFullBridgeLoss,
  BuckLoss: (m: string, tb: any) => calculateBuckBoostLoss(m, tb, "BuckLoss"),
  BoostLoss: (m: string, tb: any) => calculateBuckBoostLoss(m, tb, "BoostLoss"),
  TurnsRatio: (m: string, tb: any) => calculateTransformer("TurnsRatio", m, tb),
  TrFluxDensity: (m: string, tb: any) => calculateTransformer("TrFluxDensity", m, tb),
  TrAreaProduct: (m: string, tb: any) => calculateTransformer("TrAreaProduct", m, tb),
  CornerFreq: (m: string, tb: any) => calculateFilter("CornerFreq", m, tb),
  InductorSel: (m: string, tb: any) => calculateFilter("InductorSel", m, tb),
  CapacitorSel: (m: string, tb: any) => calculateFilter("CapacitorSel", m, tb),
};

export function runCalculation(variableName: string, methodName: string, toBase: (f: string) => number, formData: any): CalculationResult | null {
  const calculator = calculatorMap[variableName];
  if (!calculator) return null;
  return calculator(methodName, toBase, formData);
}
