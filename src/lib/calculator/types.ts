export type Unit = string;

export interface InputField {
  name: string;
  label: string;
  helptext: string;
  units: Unit[];
  topologyFilter?: string;
}

export interface Constraint {
  type: "nonzero" | "gt";
  field?: string;
  fieldA?: string;
  fieldB?: string;
  message: string;
  condition?: (formData: Record<string, any>) => boolean;
}

export interface CalculationMethod {
  name: string;
  helptext: string;
  formula: string | Record<string, string>;
  inputFields: InputField[];
  constraints?: Constraint[];
}

export interface CalculatorVariable {
  name: string;
  label: string;
  helptext: string;
  unit: string;
  outputUnits: Unit[];
  symbol: string;
  image?: string;
  methods: CalculationMethod[];
}

export interface CalculatorCategory {
  name: string;
  variables: CalculatorVariable[];
}

export interface CalculatorConfig {
  title: string;
  categories: CalculatorCategory[];
}

export interface CalculationResult {
  primaryValue: string;
  rawValue: number;
  primaryUnit: string;
  secondaryValues?: Record<string, { value: string; unit: string }>;
}
