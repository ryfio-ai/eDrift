import { describe, it, expect } from 'vitest';
import * as engine from './engine';

describe('Calculation Engine', () => {
  const toBaseMock = (vals: Record<string, number>) => (key: string) => vals[key] ?? NaN;

  describe('Basic Calculations', () => {
    it('calculateInductiveReactance', () => {
      const tb = toBaseMock({ f: 1000, L: 0.001 }); // 1kHz, 1mH
      const result = engine.calculateInductiveReactance('M1', tb);
      // Xl = 2 * pi * f * L = 2 * pi * 1000 * 0.001 = 2 * pi = 6.283
      expect(result.rawValue).toBeCloseTo(6.283, 3);
      expect(result.primaryValue).toBe('6.283');
    });

    it('calculateCapacitiveReactance', () => {
      const tb = toBaseMock({ f: 1000, C: 1e-6 }); // 1kHz, 1µF
      const result = engine.calculateCapacitiveReactance('M1', tb);
      // Xc = 1 / (2 * pi * f * C) = 1 / (2 * pi * 1000 * 1e-6) = 1 / (2 * pi * 1e-3) = 159.155
      expect(result.rawValue).toBeCloseTo(159.155, 3);
    });

    it('calculateResonantFrequency', () => {
      const tb = toBaseMock({ L: 0.001, C: 1e-6 }); // 1mH, 1µF
      const result = engine.calculateResonantFrequency('M1', tb);
      // fr = 1 / (2 * pi * sqrt(L*C)) = 1 / (2 * pi * sqrt(1e-9)) = 5032.92 Hz = 5.033 kHz
      expect(result.rawValue).toBeCloseTo(5032.92, 2);
      expect(result.primaryUnit).toBe('kHz');
      expect(result.primaryValue).toBe('5.033');
    });

    it('calculatePotentialDivider', () => {
      const tb = toBaseMock({ Vin: 10, R1: 1000, R2: 1000 });
      const result = engine.calculatePotentialDivider('M1', tb);
      // Vout = 10 * (1000 / 2000) = 5V
      expect(result.rawValue).toBe(5);
      expect(result.primaryValue).toBe('5.000');
    });
  });

  describe('Inductor Design', () => {
    it('calculateInductance (Buck M1)', () => {
      const tb = toBaseMock({ Vin: 12, Vout: 5, Fsw: 100000, deltaIl: 0.5 });
      const formData = { topology: 'Buck Converter' };
      const result = engine.calculateInductance('M1', tb, formData);
      // D = 5/12 = 0.4167
      // L = ((12 - 5) * 0.4167) / (0.5 * 100000) = (7 * 0.4167) / 50000 = 0.0000583 H = 58.33 µH
      expect(result.rawValue).toBeCloseTo(58.33e-6, 7);
      expect(result.primaryUnit).toBe('µH');
    });

    it('calculateInductance (Boost M1)', () => {
      const tb = toBaseMock({ Vin: 5, Vout: 12, Fsw: 100000, deltaIl: 0.5 });
      const formData = { topology: 'Boost Converter' };
      const result = engine.calculateInductance('M1', tb, formData);
      // D = 1 - (5/12) = 0.5833
      // L = (5 * 0.5833) / (100000 * 0.5) = 2.9167 / 50000 = 0.0000583 H = 58.33 µH
      expect(result.rawValue).toBeCloseTo(58.33e-6, 7);
    });

    it('calculateInductanceFactor', () => {
      const tb = toBaseMock({ L: 1e-6, N: 10 });
      const result = engine.calculateInductanceFactor('M1', tb);
      // AL = (L * 1e9) / N^2 = 1000 / 100 = 10 nH/N^2
      expect(result.rawValue).toBe(10);
    });

    it('calculateFlux', () => {
      const tb = toBaseMock({ AL: 100e-9, N: 10, I: 2 });
      const result = engine.calculateFlux('M1', tb);
      // flux = AL * N * I = 100e-9 * 10 * 2 = 2e-6 Wb
      expect(result.rawValue).toBe(2e-6);
    });

    it('calculateFluxDensity', () => {
      const tb = toBaseMock({ flux: 2e-6, area: 1e-4 }); // 2µWb, 1cm²
      const result = engine.calculateFluxDensity('M1', tb);
      // B = flux / area = 2e-6 / 1e-4 = 0.02 T
      expect(result.rawValue).toBeCloseTo(0.02, 5);
    });

    it('calculateAreaProduct', () => {
      const tb = toBaseMock({ L: 100e-6, Ipeak: 2, Irms: 1.5, Bmax: 0.3, J: 4000000, Ku: 0.4 });
      const result = engine.calculateAreaProduct('M1', tb);
      // Ap = (L * Ipeak * Irms * 1e4) / (Ku * J * Bmax)
      // Ap = (100e-6 * 2 * 1.5 * 1e4) / (0.4 * 4e6 * 0.3)
      // Ap = (3 * 1e-4 * 1e4) / (0.48e6) = 3 / 480000 = 6.25e-6 cm⁴
      expect(result.rawValue).toBeCloseTo(6.25e-6, 9);
    });

    it('calculateInductance (Buck M2)', () => {
      const tb = toBaseMock({ Vin: 12, Vout: 5, Fsw: 100000, ripple_pct: 0.2, Pout: 10 });
      const formData = { topology: 'Buck Converter' };
      const result = engine.calculateInductance('M2', tb, formData);
      // D = 5/12 = 0.4167
      // deltaIL = 0.2 * (10 / 5) = 0.4 A
      // L = ((12 - 5) * 0.4167) / (100000 * 0.4) = (7 * 0.4167) / 40000 = 7.29e-5 H = 72.92 µH
      expect(result.rawValue).toBeCloseTo(72.92e-6, 8);
    });
  });

  describe('Capacitor Design', () => {
    it('calculateCapIcrms (Buck Output)', () => {
      const tb = toBaseMock({ deltaIl: 0.6 });
      const formData = { topology: 'Buck Converter' };
      const result = engine.calculateCapIcrms('Output Capacitor', tb, formData);
      // result = deltaIL / sqrt(12) = 0.6 / 3.464 = 0.1732 A
      expect(result.rawValue).toBeCloseTo(0.1732, 4);
    });

    it('calculateCapIcrms (Buck Input)', () => {
      const tb = toBaseMock({ Iout: 2, D: 0.4, deltaIl: 0.6 });
      const formData = { topology: 'Buck Converter' };
      const result = engine.calculateCapIcrms('Input Capacitor', tb, formData);
      // result = sqrt(Iout^2 * D * (1-D) + (deltaIL^2 / 12) * D)
      // result = sqrt(4 * 0.4 * 0.6 + (0.36 / 12) * 0.4)
      // result = sqrt(0.96 + 0.03 * 0.4) = sqrt(0.96 + 0.012) = sqrt(0.972) = 0.9859 A
      expect(result.rawValue).toBeCloseTo(0.9859, 4);
    });

    it('calculateCapIcrms (Boost Output)', () => {
      const tb = toBaseMock({ Iout: 2, D: 0.4, deltaIl: 0.6 });
      const formData = { topology: 'Boost Converter' };
      const result = engine.calculateCapIcrms('Output Capacitor', tb, formData);
      // result = sqrt((Iout^2 * D) / (1 - D) + (deltaIL^2 / 12) * (1 - D))
      // result = sqrt((4 * 0.4) / 0.6 + (0.36 / 12) * 0.6)
      // result = sqrt(2.6667 + 0.03 * 0.6) = sqrt(2.6667 + 0.018) = sqrt(2.6847) = 1.6385 A
      expect(result.rawValue).toBeCloseTo(1.6385, 4);
    });

    it('calculateCapCmin (Buck Output)', () => {
      const tb = toBaseMock({ f: 100000, deltaIl: 0.6, deltaVout: 0.05 });
      const formData = { topology: 'Buck Converter' };
      const result = engine.calculateCapCmin('Output Capacitor', tb, formData);
      // C = deltaIL / (8 * f * deltaVout) = 0.6 / (8 * 100000 * 0.05) = 0.6 / 40000 = 15 µF
      expect(result.rawValue).toBeCloseTo(15e-6, 7);
      expect(result.primaryValue).toBe('15.000');
    });

    it('calculateCapCmin (Boost Input)', () => {
      const tb = toBaseMock({ f: 100000, deltaIl: 0.6, deltaVin: 0.05 });
      const formData = { topology: 'Boost Converter' };
      const result = engine.calculateCapCmin('Input Capacitor', tb, formData);
      // C = deltaIL / (8 * f * deltaVin) = 0.6 / (8 * 100000 * 0.05) = 15 µF
      expect(result.rawValue).toBeCloseTo(15e-6, 7);
    });
  });

  describe('MOSFET Design', () => {
    it('calculateFullBridgeLoss (Conduction)', () => {
      const tb = toBaseMock({ Irms: 2, Rds_on: 0.1 });
      const result = engine.calculateFullBridgeLoss('Conduction Loss', tb);
      // P_single = 2^2 * 0.1 = 0.4W
      // P_total = 4 * 0.4 = 1.6W
      expect(result.rawValue).toBe(1.6);
      expect(result.secondaryValues?.['Per MOSFET'].value).toBe('0.400');
    });

    it('calculateFullBridgeLoss (Switching)', () => {
      const tb = toBaseMock({ Vin: 400, Id: 5, tr: 50e-9, tf: 50e-9, Fsw: 100000 });
      const result = engine.calculateFullBridgeLoss('Switching Loss', tb);
      // P_sw = 2 * Vin * Id * (tr + tf) * Fsw
      // P_sw = 2 * 400 * 5 * (100e-9) * 100000 = 4000 * 1e-7 * 1e5 = 4000 * 0.01 = 40W
      expect(result.rawValue).toBe(40);
    });

    it('calculateBuckBoostLoss (Buck)', () => {
      const tb = toBaseMock({ Rds_on: 0.05, Iout: 10, D: 0.4 });
      const result = engine.calculateBuckBoostLoss('M1', tb, 'BuckLoss');
      // Ploss = Iout^2 * D * Rds = 100 * 0.4 * 0.05 = 2W
      expect(result.rawValue).toBe(2);
    });

    it('calculateBuckBoostLoss (Boost)', () => {
      const tb = toBaseMock({ Rds_on: 0.05, Iin: 10, D: 0.6 });
      const result = engine.calculateBuckBoostLoss('M1', tb, 'BoostLoss');
      // Ploss = Iin^2 * D * Rds = 100 * 0.6 * 0.05 = 3W
      expect(result.rawValue).toBe(3);
    });
  });
});
