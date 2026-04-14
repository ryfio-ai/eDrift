/**
 * Unit conversion utility for the eDrift Engineering Library.
 * Converts user-selected units to base SI units for mathematical formulas.
 */

export const conversionFactors: Record<string, number> = {
  // Voltage → V
  mV: 1e-3,
  V: 1,
  kV: 1e3,

  // Current → A
  mA: 1e-3,
  A: 1,
  kA: 1e3,

  // Frequency → Hz
  Hz: 1,
  kHz: 1e3,
  MHz: 1e6,

  // Power → W
  mW: 1e-3,
  W: 1,
  kW: 1e3,
  VA: 1,

  // Time → s
  ns: 1e-9,
  µs: 1e-6,
  ms: 1e-3,
  s: 1,

  // Resistance → Ω
  mΩ: 1e-3,
  Ω: 1,
  kΩ: 1e3,
  MΩ: 1e6,

  // Inductance → H
  nH: 1e-9,
  µH: 1e-6,
  mH: 1e-3,
  H: 1,

  // Capacitance → F
  pF: 1e-12,
  nF: 1e-9,
  µF: 1e-6,
  mF: 1e-3,
  F: 1,

  // Area → m²
  "mm²": 1e-6,
  "cm²": 1e-4,
  "m²": 1,

  // Length → m
  mm: 1e-3,
  cm: 1e-2,
  m: 1,

  // Flux → Wb
  µWb: 1e-6,
  mWb: 1e-3,
  Wb: 1,

  // Flux Density → T
  µT: 1e-6,
  mT: 1e-3,
  T: 1,

  // Area Product → m⁴
  "cm⁴": 1e-8,
  "mm⁴": 1e-12,
  "m⁴": 1,

  // Dimensionless / special
  "No units": 1,
  Turns: 1,
  Unitless: 1,
  "%": 0.01,
  ":1": 1,
  "nH/N²": 1e-9,
  dB: 1,

  // Ohms per unit for target impedance
  "A/m²": 1,
  "A/cm²": 1e4,
  "A/mm²": 1e6,
};

export const convertToBase = (value: number, fromUnit: string): number => {
  const factor = conversionFactors[fromUnit];
  if (factor === undefined) return value;
  return value * factor;
};

export const convertFromBase = (value: number, toUnit: string): number => {
  const factor = conversionFactors[toUnit];
  if (factor === undefined || factor === 0) return value;
  return value / factor;
};

const baseUnitMap: Record<string, string> = {
  mV: "V", V: "V", kV: "V",
  mA: "A", A: "A", kA: "A",
  Hz: "Hz", kHz: "Hz", MHz: "Hz",
  W: "W", mW: "W", kW: "W",
  ns: "s", µs: "s", ms: "s", s: "s",
  mΩ: "Ω", Ω: "Ω", kΩ: "Ω", MΩ: "Ω",
  nH: "H", µH: "H", mH: "H", H: "H",
  pF: "F", nF: "F", µF: "F", mF: "F", F: "F",
  "mm²": "m²", "cm²": "m²", "m²": "m²",
  mm: "m", cm: "m", m: "m",
  µWb: "Wb", mWb: "Wb", Wb: "Wb",
  µT: "T", mT: "T", T: "T",
};

export const getBaseUnit = (unit: string): string => baseUnitMap[unit] || unit;
