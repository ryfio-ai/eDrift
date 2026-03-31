export interface Product {
  id: string;
  slug: string; // New field for dynamic routing
  name: string;
  subtitle: string;
  description: string; // Expanded 150-word description
  category: "Portable Charger" | "On-Board Charger" | "Din Rail Power Supply" | "Custom PSU";
  powerRating: string;
  inputType: string;
  outputVoltage: string;
  ipRating: string;
  efficiency: string;
  topology: string;
  badges: ("In production" | "Customizable" | "Sample available")[];
  useCase: string[];
  image: string;
  
  // Expanded B2B Technical Data
  specs: { label: string; value: string; notes?: string }[];
  features: string[];
  applications: { type: string; compatibility: string }[];
  compliance: string[];
  customization: string[];
  leadTime: { volume: string; weeks: string }[];
}

export const products: Product[] = [
  {
    id: "ebc-33",
    slug: "onboard-charger-33",
    name: "3.3kW On-Board Charger",
    subtitle: "Automotive-Grade SiC High-Efficiency Charging",
    category: "On-Board Charger",
    powerRating: "3.3 kW",
    inputType: "Single Phase (180V-265V AC)",
    outputVoltage: "72V DC (Configurable)",
    ipRating: "IP67",
    efficiency: "95%+",
    topology: "Isolated LLC Resonant",
    badges: ["In production", "Customizable"],
    useCase: ["2W/3W", "4W"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop",
    description: "The eDrift 3.3kW On-Board Charger is a high-density power conversion solution designed specifically for the next generation of electric two-wheelers and three-wheelers. Leveraging advanced Silicon Carbide (SiC) MOSFETs, this unit achieves peak efficiencies exceeding 95% while maintaining a compact, thermal-efficient footprint. It features a fully isolated LLC resonant topology, ensuring mission-critical reliability and low EMI signature. The ruggedized IP67 enclosure and ASIL-D ready diagnostics make it the ideal choice for automotive OEMs requiring uncompromising performance in harsh environmental conditions.",
    specs: [
      { label: "Input Voltage Range", value: "180V - 265V AC", notes: "Full power range" },
      { label: "Output Power", value: "3.3 kW Peak", notes: "72V @ 45A max" },
      { label: "Efficiency", value: "95.5% @ Full Load", notes: "Ambient 25°C" },
      { label: "Weight", value: "4.2 kg", notes: "Compact aluminum housing" },
      { label: "Cooling", value: "Natural Convection / Fan", notes: "Dependent on frame" }
    ],
    features: [
      "Ultra-low EMI signature compliant with CISPR 25 Class 3",
      "CAN 2.0B Communication protocol for real-time telemetry",
      "Integrated over-voltage and over-temperature protection",
      "High power density: 1.5 kW/L",
      "Automotive-grade ASIL-D diagnostic readiness",
      "Wide operating temperature: -40°C to +85°C"
    ],
    applications: [
      { type: "Electric 2W/3W", compatibility: "72V LFP/NMC Battery Packs" },
      { type: "Micro-Mobility", compatibility: "Standard AC Grid Integration" }
    ],
    compliance: ["ASIL-D Ready", "IEC 61851-1", "SAE J1772", "AIS 038"],
    customization: ["Voltage output profiles", "CAN protocol mapping", "Enclosure mounting points"],
    leadTime: [
      { volume: "1-100 units", weeks: "4 weeks" },
      { volume: "100-500 units", weeks: "8 weeks" },
      { volume: "500+ units", weeks: "12 weeks" }
    ]
  },
  {
    id: "ebc-66",
    slug: "onboard-charger-66",
    name: "6.6kW On-Board Charger",
    subtitle: "Ultra-Compact Liquid Cooled Solution",
    category: "On-Board Charger",
    powerRating: "6.6 kW",
    inputType: "Three Phase (380V-415V AC)",
    outputVoltage: "96V DC / 400V DC Options",
    ipRating: "IP68",
    efficiency: "96.5%",
    topology: "ZVS Full Bridge + LLC",
    badges: ["In production", "Sample available"],
    useCase: ["4W", "Commercial Fleet"],
    image: "https://images.unsplash.com/photo-1620218173997-442402f114a2?q=80&w=800&h=600&auto=format&fit=crop",
    description: "Built for heavy-duty electric vehicle applications, the 6.6kW On-Board Charger utilizes a sophisticated liquid-cooled thermal management system to maintain peak performance even during sustained high-load cycles. Designed for 4W passenger vehicles and commercial delivery fleets, this unit offers three-phase input compatibility and multi-voltage output options. The high-frequency ZVS (Zero Voltage Switching) architecture minimizes thermal losses, allowing for a 30% reduction in volume compared to traditional air-cooled alternatives. Fully compliant with international automotive safety standards, it provides the reliability required for high-utilization fleet environments.",
    specs: [
      { label: "Input Voltage", value: "380V - 415V AC", notes: "Three-phase support" },
      { label: "Output Voltage", value: "96V - 450V DC", notes: "Configurable by OEM" },
      { label: "Efficiency", value: "96.5%", notes: "Nominal efficiency" },
      { label: "Cooling Method", value: "Liquid Cooled", notes: "Ethylene Glycol mix" },
      { label: "Communication", value: "CAN 2.0B / J1939", notes: "Industrial standard" }
    ],
    features: [
      "Liquid-cooled for 100% duty cycle operation",
      "Bi-directional charging capability (V2L) optional",
      "High isolation voltage: 2.5kV AC",
      "IP68 Rated for extreme outdoor environments",
      "Modular design for parallel scalability",
      "Diagnostic feedback via UDS protocol"
    ],
    applications: [
      { type: "L5 Commercial Fleets", compatibility: "High-capacity battery systems" },
      { type: "Passenger 4W", compatibility: "Integrated CMS compatibility" }
    ],
    compliance: ["ASIL-D Ready", "IEC 62196", "SAE J1772", "AIS 156"],
    customization: ["Cooling port orientation", "Firmware safety limits", "Custom harness connectors"],
    leadTime: [
      { volume: "Sample Units", weeks: "6 weeks" },
      { volume: "Production 100+", weeks: "14 weeks" }
    ]
  },
  {
    id: "epc-22",
    slug: "portable-charger-22",
    name: "2.2kW Portable Charger",
    subtitle: "Premium Plug-and-Play EVSE Solution",
    category: "Portable Charger",
    powerRating: "2.2 kW",
    inputType: "Single Phase (230V AC)",
    outputVoltage: "48V DC / 60V DC",
    ipRating: "IP65",
    efficiency: "93%+",
    topology: "PFC + LLC Resonant",
    badges: ["In production"],
    useCase: ["2W/3W"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop",
    description: "The eDrift 2.2kW Portable Charger is a compact, plug-and-play solution designed for the growing electric two-wheeler and three-wheeler market. Optimized for user convenience and safety, it features a ruggedized IP65 enclosure suitable for diverse residential and commercial environments. The interleaved PFC (Power Factor Correction) and LLC resonant converter architecture ensure high efficiency and minimal noise. Equipped with comprehensive safety features including leakage protection and auto-shutoff, it provides a reliable, consumer-friendly charging experience for urban mobility.",
    specs: [
      { label: "Nominal Output", value: "2.2 kW", notes: "Stable @ 230V input" },
      { label: "Output Voltage", value: "48V / 60V DC", notes: "Auto-detection" },
      { label: "Connector Type", value: "Type 2 / Custom", notes: "Regional options" },
      { label: "Weight", value: "2.8 kg", notes: "Ultra-portable design" }
    ],
    features: [
      "Auto-grid detection and stabilization",
      "Over-temperature and short-circuit protection",
      "Integrated 5-meter heavy-duty cable",
      "LED status indicators for real-time feedback",
      "Eco-mode for battery longevity",
      "Field-replaceable fuse system"
    ],
    applications: [
      { type: "Urban 2W/3W", compatibility: "Standard home socket (15A/16A)" },
      { type: "E-Rickshaws", compatibility: "Fleet charging stations" }
    ],
    compliance: ["IEC 61851-21-2", "AIS 138-1", "CE", "BIS"],
    customization: ["Branding & Logo", "Connector cable length", "Color options for housing"],
    leadTime: [
      { volume: "Standard Stock", weeks: "1 week" },
      { volume: "Custom Bulk", weeks: "6-8 weeks" }
    ]
  },
  {
    id: "dr-psu-48",
    slug: "din-rail-psu-48",
    name: "Industrial Din Rail PSU",
    subtitle: "High-Efficiency Control Cabinet Power",
    category: "Din Rail Power Supply",
    powerRating: "1.2 kW",
    inputType: "Universal AC (90V-305V)",
    outputVoltage: "48V DC",
    ipRating: "IP20 (Cabinet)",
    efficiency: "94.5%",
    topology: "Isolated DC-DC",
    badges: ["Customizable", "Sample available"],
    useCase: ["Industrial Automation"],
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=800&h=600&auto=format&fit=crop",
    description: "Designed for mission-critical industrial automation and control systems, the eDrift Din Rail PSU offers a robust 1.2kW power solution in a standard industrial form factor. With a wide input range and precisely regulated 48V output, this unit is engineered to power PLC systems, motor drives, and industrial communication hubs. Its high efficiency minimizes heat generation within cabinets, reducing the need for active cooling and extending the lifecycle of adjacent electronics. The isolated topology provides superior noise immunity and protection against line surges, meeting stringent industrial EMC standards.",
    specs: [
      { label: "Input Range", value: "90V - 305V AC", notes: "Full range support" },
      { label: "Output Voltage", value: "48V DC (±2%)", notes: "Highly regulated" },
      { label: "Mounting Type", value: "DIN Rail TS-35", notes: "Standard industrial" },
      { label: "MTBF", value: "> 500,000 Hours", notes: "Calculated @ 25°C" }
    ],
    features: [
      "Parallel connection support for higher wattage",
      "PFC active power factor correction (>0.98)",
      "Built-in DC-OK relay contact",
      "Overload constant current limiting",
      "Cold-start proof at -40°C",
      "Tool-less mounting system"
    ],
    applications: [
      { type: "CNC Automation", compatibility: "Standard control cabinets" },
      { type: "Telecom Hubs", compatibility: "48V backup systems" }
    ],
    compliance: ["UL 508", "EN 62368-1", "CE", "Class 1 Div 2"],
    customization: ["Output voltage trim range", "Alarm signal mapping", "Special coating for harsh files"],
    leadTime: [
      { volume: "50-200 units", weeks: "3 weeks" },
      { volume: "Bulk OEM", weeks: "10 weeks" }
    ]
  }
];
