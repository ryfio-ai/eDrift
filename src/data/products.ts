export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
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
  specs: { label: string; value: string; notes?: string }[];
  features: string[];
  applications: { type: string; compatibility: string }[];
  compliance: string[];
  customization: string[];
  leadTime: { volume: string; weeks: string }[];
}

export const products: Product[] = [
  {
    id: "obc-33",
    slug: "onboard-charger-33",
    name: "3.3kW On-Board Charger",
    subtitle: "High-Efficiency SiC Modular Power",
    category: "On-Board Charger",
    powerRating: "3.3 kW",
    inputType: "Universal AC (180V-265V)",
    outputVoltage: "48V - 400V (7 Options)",
    ipRating: "IP67",
    efficiency: "≥97%",
    topology: "Isolated LLC Resonant",
    badges: ["In production", "Customizable"],
    useCase: ["2W/3W", "L7 Category"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop",
    description: "The eDrift 3.3kW On-Board Charger redefined EV power density. Featuring a market-leading ≥97% conversion efficiency across a broad voltage spectrum from 48V to 400V. Built with Silicon Carbide (SiC) MOSFETs, this series is designed for 2-wheeler and 3-wheeler OEMs requiring mission-critical reliability and compact form factors. Fully isolated LLC resonant topology ensures minimal EMI and maximum safety for automotive-grade integration.",
    specs: [
      { label: "Voltage Options", value: "48V / 60V / 72V / 96V / 240V / 400V", notes: "Configurable by OEM" },
      { label: "Efficiency", value: "≥97%", notes: "Industry Leading Benchmark" },
      { label: "Communication", value: "CAN 2.0B / SAE J1939", notes: "Standard Automotive Protocol" },
      { label: "Weight", value: "4.2 kg", notes: "Aluminum Housing" },
      { label: "Cooling", value: "Natural Air Cooling", notes: "Maintenance Free" }
    ],
    features: [
      "Ultra-high efficiency ≥97% for minimal thermal output",
      "Robust IP67 protection against moisture and debris",
      "Modular design for rapid platform integration",
      "Comprehensive safety suite: OVP, OCP, OTP",
      "Automotive grade component selection (AEC-Q)",
      "Wide operating temperature range: -40°C to +85°C"
    ],
    applications: [
      { type: "Electric 2W/3W", compatibility: "48V / 72V Battery Packs" },
      { type: "Commercial Fleets", compatibility: "L7 Category Utility Vehicles" }
    ],
    compliance: ["CE Certified", "IEC 61851-1", "SAE J1772", "AIS 038"],
    customization: ["CAN Protocol Mapping", "Voltage Trim Points", "Mounting Brackets"],
    leadTime: [
      { volume: "Batch Pilot", weeks: "4 weeks" },
      { volume: "Production", weeks: "12 weeks" }
    ]
  },
  {
    id: "obc-66",
    slug: "onboard-charger-66",
    name: "6.6kW On-Board Charger",
    subtitle: "Liquid-Cooled High Power OEM Series",
    category: "On-Board Charger",
    powerRating: "6.6 kW",
    inputType: "Three Phase / Single Phase",
    outputVoltage: "96V / 240V / 400V Options",
    ipRating: "IP68",
    efficiency: "≥97%",
    topology: "ZVS Full Bridge + LLC",
    badges: ["In production", "Sample available"],
    useCase: ["Commercial Trucks", "Passenger 4W"],
    image: "https://images.unsplash.com/photo-1620218173997-442402f114a2?q=80&w=800&h=600&auto=format&fit=crop",
    description: "Engineered for heavy-duty electrification, the 6.6kW OBC series offers premium liquid-cooled thermal management for sustained high-load performance. Targeting commercial trucks and high-performance passenger vehicles, this unit delivers up to 60A at 96V or 16.5A at 400V. The high-frequency ZVS architecture minimizes switching losses, delivering a compact solution with official CE certification and full functional safety readiness.",
    specs: [
      { label: "Max Current", value: "60A @ 96V | 16.5A @ 400V", notes: "High power density" },
      { label: "Efficiency", value: "≥97%", notes: "Nominal" },
      { label: "Cooling", value: "Liquid Cooling", notes: "Optimized for heavy duty" },
      { label: "IP Rating", value: "IP68", notes: "Submersible Grade Protection" },
      { label: "Communication", value: "CAN 2.0B", notes: "Industrial standard" }
    ],
    features: [
      "Liquid-cooled for 100% duty cycle in extreme heat",
      "Submersible-grade IP68 protection",
      "High isolation voltage (2.5kV AC)",
      "Modular scalability for higher power needs",
      "SAE J1939 Compliant firmware",
      "CE Certified for global market entry"
    ],
    applications: [
      { type: "Commercial Trucks", compatibility: "High-voltage battery arrays" },
      { type: "Passenger Vehicles", compatibility: "Integrated CMS / VCU" }
    ],
    compliance: ["CE Certified", "IEC 62196", "SAE J1772", "AIS 156"],
    customization: ["Harness Connectors", "Firmware Over-the-Air", "Cooling Fittings"],
    leadTime: [
      { volume: "Sample Units", weeks: "6 weeks" },
      { volume: "Volume Production", weeks: "14 weeks" }
    ]
  },
  {
    id: "pc-33",
    slug: "portable-charger-33",
    name: "3.3kW Portable Charger",
    subtitle: "Limitless & Flexible Plug-and-Play EVSE",
    category: "Portable Charger",
    powerRating: "3.3 kW",
    inputType: "Single Phase (230V AC)",
    outputVoltage: "48V - 400V (Universal)",
    ipRating: "IP65",
    efficiency: "≥95%",
    topology: "PFC + LLC Resonant",
    badges: ["In production"],
    useCase: ["2W/3W", "Personal Charging"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop",
    description: "The eDrift 3.3kW Portable Charger is a versatile EVSE solution designed for users who require charging flexibility without fixed installation. Supporting all standard voltage options from 48V to 400V, this compact unit is perfect for urban residency and commercial fleet trials. Integrated auto-grid stabilization and comprehensive safety indicators make it the preferred choice for reliable, anytime charging in diverse environments.",
    specs: [
      { label: "Output Power", value: "3.3 kW", notes: "Stable @ 230V" },
      { label: "Voltage Range", value: "48V - 400V Universal", notes: "Auto-detection ready" },
      { label: "Form Factor", value: "Compact & Portable", notes: "No installation required" },
      { label: "Efficiency", value: "≥95%", notes: "Premium power conversion" }
    ],
    features: [
      "No installation required - plug directly into AC grid",
      "Supports all eDrift voltage configurations",
      "Lightweight, ruggedized housing (IP65)",
      "High Power Factor Correction (PFC > 0.98)",
      "Digital display for real-time charge monitoring",
      "Automatic thermal-derating safety"
    ],
    applications: [
      { type: "Personal EV", compatibility: "Standard home AC socket" },
      { type: "Commercial Trials", compatibility: "Fleet demonstration vehicles" }
    ],
    compliance: ["CE Certified", "IEC 61851-21-2", "AIS 138-1", "BIS"],
    customization: ["Cable Lengths", "Connector Type (Type 2 / Custom)", "OEM Branding"],
    leadTime: [
      { volume: "Stock Orders", weeks: "1 week" },
      { volume: "Custom Bulk", weeks: "8 weeks" }
    ]
  },
  {
    id: "dr-psu-48",
    slug: "din-rail-psu-48",
    name: "Industrial Din Rail PSU",
    subtitle: "Robust Power for Industrial Control",
    category: "Din Rail Power Supply",
    powerRating: "1.2 kW",
    inputType: "Universal AC (90V-305V)",
    outputVoltage: "48V DC",
    ipRating: "IP20",
    efficiency: "94.5%",
    topology: "Isolated DC-DC",
    badges: ["Customizable"],
    useCase: ["Industrial Automation"],
    image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=800&h=600&auto=format&fit=crop",
    description: "Mission-critical 1.2kW DIN rail power supply designed for industrial control cabinets and automation infrastructure. Featuring a wide universal input and highly stabilized 48V DC output, this unit powers everything from PLC systems to high-torque motor drives. The high MTBF and cold-start capability ensure maximum uptime in harsh factory environments, while its high efficiency reduces cabinet thermal load.",
    specs: [
      { label: "MTBF", value: "> 500,000 Hours", notes: "Industrial Grade" },
      { label: "Output Accuracy", value: "±1%", notes: "Precisely Regulated" },
      { label: "Cooling", value: "Convection", notes: "No fans required" },
      { label: "Protection", value: "Overload/Short Circuit", notes: "Auto-recovery" }
    ],
    features: [
      "Cold-start proof at -40°C",
      "Tool-less DIN rail mounting system",
      "Low harmonic distortion (THD < 5%)",
      "Highly isolated output (3kV isolation)",
      "Active PFC for energy efficiency",
      "Integrated health status relay"
    ],
    applications: [
      { type: "Factory Automation", compatibility: "PLC/SCADA Cabinets" },
      { type: "Energy Storage", compatibility: "BMS Control Power" }
    ],
    compliance: ["UL 508", "EN 62368-1", "CE", "Class 1 Div 2"],
    customization: ["Output Voltage Trim", "Monitoring BUS (Modbus)", "Ruggedized Components"],
    leadTime: [
      { volume: "50-500 units", weeks: "3 weeks" },
      { volume: "OEM Batch", weeks: "10 weeks" }
    ]
  }
];
