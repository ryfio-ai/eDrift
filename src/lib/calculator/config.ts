import { CalculatorConfig } from "./types";

export const calculatorConfig: CalculatorConfig = {
  title: "eDrift Engineering Suite",
  categories: [
    {
      name: "Basic Calculations",
      variables: [
        {
          name: "InductiveReactance",
          label: "Inductive Reactance",
          helptext: "Calculates the reactance of an inductor",
          unit: "Ω",
          outputUnits: ["Ω", "kΩ", "MΩ"],
          symbol: "X_L",
          methods: [
            {
              name: "M1",
              helptext: "Standard Inductive Reactance calculation",
              formula: "X_L = 2 \\pi f L",
              inputFields: [
                { name: "f", label: "f", helptext: "Frequency", units: ["kHz", "Hz", "MHz"] },
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
              ],
              constraints: [
                { type: "nonzero", field: "f", message: "Frequency cannot be zero" },
                { type: "nonzero", field: "L", message: "Inductance cannot be zero" },
              ],
            },
          ],
        },
        {
          name: "CapacitiveReactance",
          label: "Capacitive Reactance",
          helptext: "Calculates the reactance of a capacitor",
          unit: "Ω",
          outputUnits: ["Ω", "kΩ", "MΩ"],
          symbol: "X_C",
          methods: [
            {
              name: "M1",
              helptext: "Standard Capacitive Reactance calculation",
              formula: "X_C = \\frac{1}{2 \\pi f C}",
              inputFields: [
                { name: "f", label: "f", helptext: "Frequency", units: ["kHz", "Hz", "MHz"] },
                { name: "C", label: "C", helptext: "Capacitance", units: ["µF", "nF", "mF", "F"] },
              ],
              constraints: [
                { type: "nonzero", field: "f", message: "Frequency cannot be zero" },
                { type: "nonzero", field: "C", message: "Capacitance cannot be zero" },
              ],
            },
          ],
        },
        {
          name: "ResonantFrequency",
          label: "Resonant Frequency",
          helptext: "Calculates the resonant frequency of an LC circuit",
          unit: "kHz",
          outputUnits: ["kHz", "MHz", "Hz"],
          symbol: "f_r",
          methods: [
            {
              name: "M1",
              helptext: "f_r = 1 / (2π√(LC))",
              formula: "f_r = \\frac{1}{2 \\pi \\sqrt{L C}}",
              inputFields: [
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
                { name: "C", label: "C", helptext: "Capacitance", units: ["µF", "nF", "mF", "F"] },
              ],
              constraints: [
                { type: "nonzero", field: "L", message: "Inductance cannot be zero" },
                { type: "nonzero", field: "C", message: "Capacitance cannot be zero" },
              ],
            },
          ],
        },
        {
          name: "PotentialDivider",
          label: "Potential Divider",
          helptext: "Calculates output voltage of a resistive divider",
          unit: "V",
          outputUnits: ["V", "kV", "mV"],
          symbol: "",
          image: "/images/PotentialDividerCircuit.png",
          methods: [
            {
              name: "M1",
              helptext: "Vout = Vin * (R2 / (R1 + R2))",
              formula: "V_{out} = V_{in} \\cdot \\frac{R_2}{R_1 + R_2}",
              inputFields: [
                { name: "Vin", label: "V_in", helptext: "Input Voltage", units: ["V", "kV", "mV"] },
                { name: "R1", label: "R_1", helptext: "Top resistor", units: ["Ω", "kΩ", "MΩ"] },
                { name: "R2", label: "R_2", helptext: "Bottom resistor", units: ["Ω", "kΩ", "MΩ"] },
              ],
              constraints: [
                { type: "nonzero", field: "Vin", message: "Input voltage cannot be zero" },
                { type: "nonzero", field: "R1", message: "Resistance R1 cannot be zero" },
                { type: "nonzero", field: "R2", message: "Resistance R2 cannot be zero" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Inductor Design",
      variables: [
        {
          name: "Inductance",
          label: "Inductance",
          helptext: "Calculate required inductance for a converter",
          unit: "µH",
          outputUnits: ["µH", "mH", "H"],
          symbol: "L",
          methods: [
            {
              name: "M1",
              helptext: "Buck or Boost Inductance Calculation",
              formula: {
                "Buck Converter": "L = \\frac{(V_{in} - V_{out}) \\cdot D}{\\Delta I_L \\cdot f_s}",
                "Boost Converter": "L = \\frac{V_{in} \\cdot D}{f_{sw} \\cdot \\Delta I_L}"
              },
              inputFields: [
                { name: "Vin", label: "Vin", helptext: "Input voltage", units: ["V", "kV", "mV"] },
                { name: "Vout", label: "Vout", helptext: "Output voltage", units: ["V", "kV", "mV"] },
                { name: "deltaIl", label: "ΔI_L", helptext: "Ripple current", units: ["A", "mA"] },
                { name: "Fsw", label: "Fsw", helptext: "Switching frequency", units: ["kHz", "Hz", "MHz"] },
              ],
            },
            {
              name: "M2",
              helptext: "Using ripple percentage and output power",
              formula: {
                "Buck Converter": "L = \\frac{(V_{in} - V_{out}) \\cdot D}{f_{sw} \\cdot (\\%ripple \\cdot \\frac{P_{out}}{V_{out}})}",
                "Boost Converter": "L = \\frac{V_{in} \\cdot D}{f_{sw} \\cdot (\\%ripple \\cdot \\frac{P_{out}}{V_{in} \\cdot \\eta})}"
              },
              inputFields: [
                { name: "Vin", label: "Vin", helptext: "Input voltage", units: ["V", "kV", "mV"] },
                { name: "Vout", label: "Vout", helptext: "Output voltage", units: ["V", "kV", "mV"] },
                { name: "Fsw", label: "Fsw", helptext: "Switching frequency", units: ["kHz", "Hz", "MHz"] },
                { name: "ripple_pct", label: "% Ripple", helptext: "Ripple percentage", units: ["%"] },
                { name: "Pout", label: "Pout", helptext: "Output power", units: ["W", "kW"] },
                { name: "eta", label: "η", helptext: "Efficiency (%)", units: ["%"], topologyFilter: "Boost Converter" },
              ],
            },
          ],
        },
        {
          name: "InductanceFactor",
          label: "Inductance Factor",
          helptext: "Calculates AL given L and N, or core properties",
          unit: "nH/N²",
          outputUnits: ["nH/N²"],
          symbol: "A_L",
          methods: [
            {
              name: "M1",
              helptext: "AL = L / N²",
              formula: "A_L = \\frac{L}{N^2}",
              inputFields: [
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
                { name: "N", label: "N", helptext: "Number of turns", units: ["Turns"] },
              ],
            },
            {
              name: "M2",
              helptext: "AL from core material properties",
              formula: "A_L = \\frac{\\mu_0 \\cdot \\mu_r \\cdot A_c}{l_e}",
              inputFields: [
                { name: "mu_r", label: "μ_r", helptext: "Relative permeability", units: [""] },
                { name: "Ac", label: "A_c", helptext: "Core area", units: ["mm²", "cm²", "m²"] },
                { name: "le", label: "l_e", helptext: "Path length", units: ["mm", "cm", "m"] },
              ],
            },
          ],
        },
        {
          name: "Flux",
          label: "Flux",
          helptext: "Calculate magnetic flux (Φ)",
          unit: "Wb",
          outputUnits: ["Wb", "mWb", "µWb"],
          symbol: "Φ",
          methods: [
            {
              name: "M1",
              helptext: "Φ = AL * N * I",
              formula: "\\Phi = A_L \\cdot N \\cdot I",
              inputFields: [
                { name: "AL", label: "A_L", helptext: "Permeance (nH/N²)", units: ["nH/N²"] },
                { name: "N", label: "N", helptext: "Number of turns", units: ["Turns"] },
                { name: "I", label: "I", helptext: "Current", units: ["A", "mA"] },
              ],
            },
            {
              name: "M2",
              helptext: "Φ = (L * I) / N",
              formula: "\\Phi = \\frac{L \\cdot I}{N}",
              inputFields: [
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
                { name: "I", label: "I", helptext: "Current", units: ["A", "mA"] },
                { name: "N", label: "N", helptext: "Number of turns", units: ["Turns"] },
              ],
            },
          ],
        },
        {
          name: "MaxFluxDensity",
          label: "Maximum Flux Density",
          helptext: "Determine max flux density to avoid saturation",
          unit: "T",
          outputUnits: ["T", "mT", "µT"],
          symbol: "B_max",
          methods: [
            {
              name: "M1",
              helptext: "B = Φ / A",
              formula: "B = \\frac{\\Phi}{A}",
              inputFields: [
                { name: "flux", label: "Φ", helptext: "Magnetic flux", units: ["Wb", "mWb"] },
                { name: "area", label: "A", helptext: "Core area", units: ["mm²", "cm²", "m²"] },
              ],
            },
            {
              name: "M2",
              helptext: "Bmax = (L * Ipeak) / (N * Ac)",
              formula: "B_{max} = \\frac{L \\cdot I_{peak}}{N \\cdot A_c}",
              inputFields: [
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
                { name: "Ipeak", label: "I_peak", helptext: "Peak current", units: ["A", "mA"] },
                { name: "N", label: "N", helptext: "Number of turns", units: ["Turns"] },
                { name: "Ac", label: "A_c", helptext: "Core area", units: ["mm²", "cm²", "m²"] },
              ],
            },
          ],
        },
        {
          name: "AreaProduct",
          label: "Area Product",
          helptext: "Area product approach for core size selection",
          unit: "cm⁴",
          outputUnits: ["cm⁴", "mm⁴", "m⁴"],
          symbol: "A_p",
          methods: [
            {
              name: "M1",
              helptext: "A_p = (L * Ipeak * Irms * 10^4) / (Ku * J * Bmax)",
              formula: "A_p = \\frac{L \\cdot I_{peak} \\cdot I_{rms} \\cdot 10^4}{K_u \\cdot J \\cdot B_{max}}",
              inputFields: [
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
                { name: "Ipeak", label: "I_peak", helptext: "Peak current", units: ["A"] },
                { name: "Irms", label: "I_rms", helptext: "RMS current", units: ["A"] },
                { name: "Bmax", label: "B_max", helptext: "Operating flux density", units: ["T"] },
                { name: "J", label: "J", helptext: "Current density", units: ["A/m²", "A/cm²"] },
                { name: "Ku", label: "K_u", helptext: "Window utilization", units: [""] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Capacitor Design",
      variables: [
        {
          name: "RMSCapacitorCurrent",
          label: "RMS Capacitor Current",
          helptext: "RMS current through capacitor",
          unit: "A",
          outputUnits: ["A", "mA", "kA"],
          symbol: "I_crms",
          methods: [
            {
              name: "Input Capacitor",
              helptext: "Input Capacitor RMS Current",
              formula: {
                "Buck Converter": "I_{cin} = \\sqrt{I_{out}^2 \\cdot D(1-D) + \\frac{\\Delta I_L^2}{12} \\cdot D}",
                "Boost Converter": "I_{cin} = \\frac{\\Delta I_L}{\\sqrt{12}}"
              },
              inputFields: [
                { name: "Iout", label: "I_out", helptext: "Output current", units: ["A", "mA"], topologyFilter: "Buck Converter" },
                { name: "D", label: "D", helptext: "Duty cycle", units: ["%"] },
                { name: "deltaIl", label: "ΔI_L", helptext: "Inductor ripple current", units: ["A", "mA"] },
              ],
            },
            {
              name: "Output Capacitor",
              helptext: "Output Capacitor RMS Current",
              formula: {
                "Buck Converter": "I_{cout} = \\frac{\\Delta I_L}{\\sqrt{12}}",
                "Boost Converter": "I_{cout} = \\sqrt{\\frac{I_{out}^2 \\cdot D}{1-D} + \\frac{\\Delta I_L^2}{12} \\cdot (1-D)}"
              },
              inputFields: [
                { name: "Iout", label: "I_out", helptext: "Output current", units: ["A", "mA"], topologyFilter: "Boost Converter" },
                { name: "D", label: "D", helptext: "Duty cycle", units: ["%"], topologyFilter: "Boost Converter" },
                { name: "deltaIl", label: "ΔI_L", helptext: "Inductor ripple current", units: ["A", "mA"] },
              ],
            },
          ],
        },
        {
          name: "MinimumCapacitance",
          label: "Minimum Capacitance",
          helptext: "Minimum required capacitance",
          unit: "µF",
          outputUnits: ["µF", "mF", "F"],
          symbol: "C_min",
          methods: [
            {
              name: "Input Capacitor",
              helptext: "Input Capacitor Minimum Capacitance",
              formula: {
                "Buck Converter": "C_{min} = \\frac{I_{out} \\cdot D(1-D)}{f \\cdot \\Delta V_{in}}",
                "Boost Converter": "C_{min} = \\frac{\\Delta I_L}{8 \\cdot f \\cdot \\Delta V_{in}}"
              },
              inputFields: [
                { name: "Iout", label: "I_out", helptext: "Output current", units: ["A", "mA"], topologyFilter: "Buck Converter" },
                { name: "D", label: "D", helptext: "Duty cycle", units: ["%"] },
                { name: "f", label: "f", helptext: "Switching frequency", units: ["kHz", "Hz"] },
                { name: "deltaVin", label: "ΔV_in", helptext: "Input voltage ripple", units: ["V", "mV"] },
                { name: "deltaIl", label: "ΔI_L", helptext: "Inductor ripple current", units: ["A", "mA"], topologyFilter: "Boost Converter" },
              ],
            },
            {
              name: "Output Capacitor",
              helptext: "Output Capacitor Minimum Capacitance",
              formula: {
                "Buck Converter": "C_{min} = \\frac{\\Delta I_L}{8 \\cdot f \\cdot \\Delta V_{out}}",
                "Boost Converter": "C_{min} = \\frac{I_{out} \\cdot D}{f \\cdot \\Delta V_{out}}"
              },
              inputFields: [
                { name: "Iout", label: "I_out", helptext: "Output current", units: ["A", "mA"], topologyFilter: "Boost Converter" },
                { name: "D", label: "D", helptext: "Duty cycle", units: ["%"], topologyFilter: "Boost Converter" },
                { name: "f", label: "f", helptext: "Switching frequency", units: ["kHz", "Hz"] },
                { name: "deltaVout", label: "ΔV_out", helptext: "Output voltage ripple", units: ["V", "mV"] },
                { name: "deltaIl", label: "ΔI_L", helptext: "Inductor ripple current", units: ["A", "mA"], topologyFilter: "Buck Converter" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Mosfet Design",
      variables: [
        {
          name: "FullBridgeLoss",
          label: "Full Bridge",
          helptext: "MOSFET losses in full bridge topology",
          unit: "W",
          outputUnits: ["W", "mW", "kW"],
          symbol: "P_loss",
          methods: [
            {
              name: "Conduction Loss",
              helptext: "Pcond = 4 * Irms² * Rds_on",
              formula: "P_{cond} = 4 \\cdot I_{rms}^2 \\cdot R_{DS(on)}",
              inputFields: [
                { name: "Irms", label: "I_rms", helptext: "RMS current", units: ["A", "mA"] },
                { name: "Rds_on", label: "R_{DS(on)}", helptext: "ON resistance", units: ["mΩ", "Ω"] },
              ],
            },
            {
              name: "Switching Loss",
              helptext: "Psw = 4 * 0.5 * Vin * Id * (tr + tf) * fsw",
              formula: "P_{sw} = 2 \\cdot V_{in} \\cdot I_D \\cdot (t_r + t_f) \\cdot f_{sw}",
              inputFields: [
                { name: "Vin", label: "V_in", helptext: "Bus voltage", units: ["V", "kV"] },
                { name: "Id", label: "I_D", helptext: "Drain current", units: ["A", "mA"] },
                { name: "tr", label: "t_r", helptext: "Rise time", units: ["ns", "µs", "ms"] },
                { name: "tf", label: "t_f", helptext: "Fall time", units: ["ns", "µs", "ms"] },
                { name: "Fsw", label: "f_sw", helptext: "Frequency", units: ["kHz", "Hz", "MHz"] },
              ],
            },
          ],
        },
        {
          name: "BuckLoss",
          label: "Buck Converter",
          helptext: "Conduction loss in Buck MOSFET",
          unit: "W",
          outputUnits: ["W", "mW"],
          symbol: "P_loss",
          methods: [
            {
              name: "Conduction Loss",
              helptext: "Pcond = Iout² * D * Rds_on",
              formula: "P_{cond} = I_{out}^2 \\cdot D \\cdot R_{DS(on)}",
              inputFields: [
                { name: "Iout", label: "I_out", helptext: "Output current", units: ["A", "mA"] },
                { name: "D", label: "D", helptext: "Duty cycle", units: ["%"] },
                { name: "Rds_on", label: "R_{DS(on)}", helptext: "ON resistance", units: ["mΩ", "Ω"] },
              ],
            },
          ],
        },
        {
          name: "BoostLoss",
          label: "Boost Converter",
          helptext: "Conduction loss in Boost MOSFET",
          unit: "W",
          outputUnits: ["W", "mW"],
          symbol: "P_loss",
          methods: [
            {
              name: "Conduction Loss",
              helptext: "Pcond = Iin² * D * Rds_on",
              formula: "P_{cond} = I_{in}^2 \\cdot D \\cdot R_{DS(on)}",
              inputFields: [
                { name: "Iin", label: "I_in", helptext: "Input current", units: ["A", "mA"] },
                { name: "D", label: "D", helptext: "Duty cycle", units: ["%"] },
                { name: "Rds_on", label: "R_{DS(on)}", helptext: "ON resistance", units: ["mΩ", "Ω"] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Transformer Design",
      variables: [
        {
          name: "TurnsRatio",
          label: "Turns Ratio",
          helptext: "Primary to secondary turns ratio",
          unit: "N",
          outputUnits: [""],
          symbol: "n",
          methods: [
            {
              name: "M1",
              helptext: "Np/Ns = Vp/Vs",
              formula: "\\frac{N_p}{N_s} = \\frac{V_p}{V_s}",
              inputFields: [
                { name: "Vp", label: "V_p", helptext: "Primary voltage", units: ["V", "kV"] },
                { name: "Vs", label: "V_s", helptext: "Secondary voltage", units: ["V", "kV"] },
              ],
            },
          ],
        },
        {
          name: "TrFluxDensity",
          label: "Flux Density",
          helptext: "AC flux density for transformer",
          unit: "T",
          outputUnits: ["T", "mT", "µT"],
          symbol: "B_ac",
          methods: [
            {
              name: "M1",
              helptext: "Bac = Vin / (4.44 * f * N * Ac)",
              formula: "B_{ac} = \\frac{V_{in}}{4.44 \\cdot f \\cdot N \\cdot A_c}",
              inputFields: [
                { name: "Vin", label: "V_in", helptext: "Applied voltage", units: ["V", "kV"] },
                { name: "f", label: "f", helptext: "Frequency", units: ["kHz", "Hz"] },
                { name: "N", label: "N", helptext: "Turns", units: ["Turns"] },
                { name: "Ac", label: "A_c", helptext: "Core area", units: ["mm²", "cm²", "m²"] },
              ],
            },
          ],
        },
        {
          name: "TrAreaProduct",
          label: "Core Area Product",
          helptext: "Transformer core sizing",
          unit: "cm⁴",
          outputUnits: ["cm⁴", "mm⁴", "m⁴"],
          symbol: "A_p",
          methods: [
            {
              name: "M1",
              helptext: "Ap = Ptot / (Kf * Ku * Bm * J * f)",
              formula: "A_p = \\frac{P_{total}}{K_f \\cdot K_u \\cdot B_m \\cdot J \\cdot f}",
              inputFields: [
                { name: "Ptot", label: "P_total", helptext: "Total power", units: ["VA", "W"] },
                { name: "Bm", label: "B_m", helptext: "Operating flux density", units: ["T"] },
                { name: "J", label: "J", helptext: "Current density", units: ["A/m²", "A/mm²"] },
                { name: "f", label: "f", helptext: "Frequency", units: ["kHz", "Hz"] },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Filter Design",
      variables: [
        {
          name: "CornerFreq",
          label: "Corner Frequency",
          helptext: "Cutoff frequency for LC Filter",
          unit: "kHz",
          outputUnits: ["kHz", "Hz", "MHz"],
          symbol: "f_c",
          methods: [
            {
              name: "M1",
              helptext: "fc = 1 / (2π√(LC))",
              formula: "f_c = \\frac{1}{2 \\pi \\sqrt{L \\cdot C}}",
              inputFields: [
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
                { name: "C", label: "C", helptext: "Capacitance", units: ["µF", "nF", "mF", "F"] },
              ],
            },
          ],
        },
        {
          name: "InductorSel",
          label: "Inductor Selection",
          helptext: "Select filter inductor based on attenuation",
          unit: "dB",
          outputUnits: ["dB"],
          symbol: "Att",
          methods: [
            {
              name: "M1",
              helptext: "Attenuation at switching frequency",
              formula: "Att = 20 \\log_{10} \\left| \\frac{1}{1 - (f_{sw}/f_c)^2} \\right|",
              inputFields: [
                { name: "fsw", label: "f_sw", helptext: "Switching frequency", units: ["kHz", "Hz", "MHz"] },
                { name: "fc", label: "f_c", helptext: "Corner frequency", units: ["kHz", "Hz", "MHz"] },
              ],
            },
          ],
        },
        {
          name: "CapacitorSel",
          label: "Capacitor Selection",
          helptext: "Select filter capacitor for target impedance",
          unit: "µF",
          outputUnits: ["µF", "mF", "F"],
          symbol: "Z",
          methods: [
            {
              name: "M1",
              helptext: "Zc = √(L/C)",
              formula: "Z_c = \\sqrt{\\frac{L}{C}}",
              inputFields: [
                { name: "Ztarget", label: "Z_target", helptext: "Target impedance", units: ["Ω"] },
                { name: "L", label: "L", helptext: "Inductance", units: ["µH", "mH", "H"] },
              ],
            },
          ],
        },
      ],
    },
  ],
};
