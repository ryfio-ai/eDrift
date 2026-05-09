import { describe, it, expect } from 'vitest';
import { convertToBase, convertFromBase, getBaseUnit, conversionFactors } from './unitConversions';

describe('unitConversions', () => {
  describe('convertToBase', () => {
    it('converts Voltage correctly', () => {
      expect(convertToBase(1, 'V')).toBe(1);
      expect(convertToBase(1, 'mV')).toBe(1e-3);
      expect(convertToBase(1, 'kV')).toBe(1e3);
    });

    it('converts Current correctly', () => {
      expect(convertToBase(1, 'A')).toBe(1);
      expect(convertToBase(1, 'mA')).toBe(1e-3);
    });

    it('converts Frequency correctly', () => {
      expect(convertToBase(1, 'Hz')).toBe(1);
      expect(convertToBase(1, 'kHz')).toBe(1e3);
      expect(convertToBase(1, 'MHz')).toBe(1e6);
    });

    it('converts Inductance correctly', () => {
      expect(convertToBase(1, 'H')).toBe(1);
      expect(convertToBase(1, 'µH')).toBe(1e-6);
      expect(convertToBase(1, 'nH')).toBe(1e-9);
    });

    it('converts Capacitance correctly', () => {
      expect(convertToBase(1, 'F')).toBe(1);
      expect(convertToBase(1, 'µF')).toBe(1e-6);
      expect(convertToBase(1, 'nF')).toBe(1e-9);
      expect(convertToBase(1, 'pF')).toBe(1e-12);
    });

    it('returns original value for unknown unit', () => {
      expect(convertToBase(10, 'unknown')).toBe(10);
    });
  });

  describe('convertFromBase', () => {
    it('converts from base to units correctly', () => {
      expect(convertFromBase(1, 'V')).toBe(1);
      expect(convertFromBase(0.001, 'mV')).toBe(1);
      expect(convertFromBase(1000, 'kV')).toBe(1);
    });

    it('returns original value for unknown unit', () => {
      expect(convertFromBase(10, 'unknown')).toBe(10);
    });
  });

  describe('getBaseUnit', () => {
    it('returns correct base units', () => {
      expect(getBaseUnit('mV')).toBe('V');
      expect(getBaseUnit('kHz')).toBe('Hz');
      expect(getBaseUnit('µH')).toBe('H');
      expect(getBaseUnit('nF')).toBe('F');
    });

    it('returns original unit if not in map', () => {
      expect(getBaseUnit('Ω')).toBe('Ω');
      expect(getBaseUnit('Unknown')).toBe('Unknown');
    });
  });
});
