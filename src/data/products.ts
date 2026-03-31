export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "Portable Charger" | "On-Board Charger" | "Din Rail Power Supply" | "Custom PSU";
  powerRating: string;
  voltageRange: string;
  efficiency: string;
  powerFactor: string;
  inputSpecs: string;
  protections: string[];
  formFactor: {
    ipRating: string;
    dimensions: string;
    tempRange: string;
    weight: string;
  };
  application: {
    segment: string;
    targetCustomers: string[];
    typicalUse: string[];
    ecosystem?: { type: string; compatibility: string }[];
  };
  trust: {
    certifications: string[];
    reliabilityNotes: string;
  };
  metadata: {
    sku: string;
    datasheetUrl: string;
  };
  features: string[];
  specs: { label: string; value: string; notes?: string }[];
  compliance: string[];
  customization: string[];
  leadTime: { volume: string; weeks: string }[];
  badges: ("In production" | "Customizable" | "Sample available")[];
  image: string;
}

export const products: Product[] = [
  {
    id: "obc-2.2",
    slug: "onboard-charger-2.2kw",
    name: "2.2kW On-Board Charger | Rugged Series",
    tagline: "Ultra-Compact & High-Efficiency Modular Power for 2W OEMs",
    description: "The eDrift 2.2kW On-Board Charger is the entry-point for rugged, mission-critical EV power. Designed for light electric 2-wheelers, this modular unit features ≥97% efficiency and a resilient LLC resonant topology. It supports a wide output range from 48V to 96V, making it the perfect choice for urban mobility platforms requiring long-lasting reliability in compact form factors.",
    category: "On-Board Charger",
    powerRating: "2.2 kW",
    voltageRange: "48V / 60V / 72V / 84V / 96V Options",
    efficiency: "≥97%",
    powerFactor: "≥0.98",
    inputSpecs: "180–275 VAC | Max 15A",
    protections: ["OVP", "OCP", "OTP", "Short Circuit", "Low Voltage Protection"],
    formFactor: {
      ipRating: "IP67",
      dimensions: "280 × 160 × 140 mm",
      tempRange: "-40°C to 55°C",
      weight: "3.8 kg"
    },
    application: {
      segment: "On-Board Charger",
      targetCustomers: ["Electric 2W OEM", "Last-mile Delivery Fleets"],
      typicalUse: ["Electric Scooters", "Light Cargo 3W", "E-bikes"],
      ecosystem: [
        { type: "Electric 2W", compatibility: "48V-72V Battery Systems" },
        { type: "Delivery Fleets", compatibility: "Swappable Battery Cabinets" }
      ]
    },
    trust: {
      certifications: ["CE Certified", "AIS 038", "IEC 61851"],
      reliabilityNotes: "LLC + Sync Rec with SiC Mosfet, vibration resistant housing"
    },
    metadata: {
      sku: "ED-OBC-22R",
      datasheetUrl: "/docs/edrift-2.2kw-obc.pdf"
    },
    features: [
      "SiC Mosfet for maximum power density",
      "LLC + Sync Rectification Topology",
      "User configurable GUI for performance tuning",
      "IP67 Ruggedized enclosure",
      "Smart thermal management system",
      "High vibration resistance for rough terrain"
    ],
    specs: [
      { label: "Voltage Range", value: "48V to 96V Battery Suitability", notes: "OEM Configurable" },
      { label: "Max Current", value: "30A Max", notes: "Electrical Limit" },
      { label: "Efficiency", value: "≥97%", notes: "@ Full Load" },
      { label: "Power Factor", value: "≥0.98", notes: "Active PFC" },
      { label: "Cooling", value: "Passive / Natural Air", notes: "Maintenance Free" }
    ],
    compliance: ["CE Certified", "AIS 038", "IEC 61851-1"],
    customization: ["Voltage Cut-off points", "CAN IDs", "Bootloader access"],
    leadTime: [
      { volume: "Batch Pilot", weeks: "4 weeks" },
      { volume: "Volume Production", weeks: "10 weeks" }
    ],
    badges: ["In production", "Customizable"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: "obc-3.3",
    slug: "onboard-charger-3.3kw",
    name: "3.3kW On-Board Charger | SiC Rugged",
    tagline: "High-Efficiency SiC Modular Power for 2W/3W OEMs",
    description: "The eDrift 3.3kW On-Board Charger redefined EV power density. Featuring a market-leading ≥97% conversion efficiency across a broad voltage spectrum. Built with Silicon Carbide (SiC) MOSFETs, this series is designed for 2-wheeler and 3-wheeler OEMs requiring mission-critical reliability and compact form factors. Full LLc + sync Rec topology ensures minimal EMI and maximum safety.",
    category: "On-Board Charger",
    powerRating: "3.3 kW",
    voltageRange: "48V / 60V / 72V / 84V / 96V / 240V / 400V Options",
    efficiency: "≥97%",
    powerFactor: "≥0.98",
    inputSpecs: "180–275 VAC | Max 16A",
    protections: ["OVP", "OCP", "OTP", "Short Circuit", "Reverse Polarity"],
    formFactor: {
      ipRating: "IP67",
      dimensions: "280 × 160 × 140 mm",
      tempRange: "-40°C to 55°C",
      weight: "4.2 kg"
    },
    application: {
      segment: "On-Board Charger",
      targetCustomers: ["Automotive OEM", "Fleet Operator"],
      typicalUse: ["Electric 2W/3W", "L7 Category Utility Vehicles", "Warehouse Fleets"],
      ecosystem: [
        { type: "Electric 2W/3W", compatibility: "48V / 72V Battery Packs" },
        { type: "Commercial Fleets", compatibility: "L7 Category Utility Vehicles" }
      ]
    },
    trust: {
      certifications: ["CE Certified", "IEC 61851-1", "SAE J1772", "AIS 038"],
      reliabilityNotes: "Automotive-grade SiC MOSFETs, vibration resistant, high MTBF"
    },
    metadata: {
      sku: "ED-OBC-33S",
      datasheetUrl: "/docs/edrift-3.3kw-obc.pdf"
    },
    features: [
      "Ultra-high efficiency ≥97% for minimal thermal output",
      "Robust IP67 protection against moisture and debris",
      "Modular design for rapid platform integration",
      "Comprehensive safety suite: OVP, OCP, OTP",
      "Automotive grade component selection (AEC-Q)",
      "Wide operating temperature range: -40°C to 55°C"
    ],
    specs: [
      { label: "Voltage Options", value: "48V / 60V / 72V / 84V / 96V / 240V / 400V", notes: "Configurable by OEM" },
      { label: "Efficiency", value: "≥97%", notes: "Industry Leading Benchmark" },
      { label: "Communication", value: "CAN 2.0B / SAE J1939", notes: "Standard Automotive Protocol" },
      { label: "Weight", value: "4.2 kg", notes: "Aluminum Housing" },
      { label: "Cooling", value: "Natural Air Cooling", notes: "Maintenance Free" }
    ],
    compliance: ["CE Certified", "IEC 61851-1", "SAE J1772", "AIS 038"],
    customization: ["CAN Protocol Mapping", "Voltage Trim Points", "Mounting Brackets"],
    leadTime: [
      { volume: "Batch Pilot", weeks: "4 weeks" },
      { volume: "Production", weeks: "12 weeks" }
    ],
    badges: ["In production", "Customizable"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: "obc-6.6",
    slug: "onboard-charger-6.6kw",
    name: "6.6kW On-Board Charger | Liquid Cooled High-Power",
    tagline: "Liquid-Cooled High Power OEM Series for Passenger 4W",
    description: "Engineered for heavy-duty electrification, the 6.6kW OBC series offers premium liquid-cooled thermal management for sustained high-load performance. Targeting commercial trucks and high-performance passenger vehicles, this unit delivers up to 60A at 96V or 16.5A at 400V. The high-frequency ZVS architecture minimizes switching losses, delivering a compact solution with official CE certification.",
    category: "On-Board Charger",
    powerRating: "6.6 kW",
    voltageRange: "96V / 240V / 400V Options",
    efficiency: "≥97%",
    powerFactor: "≥0.98",
    inputSpecs: "180–275 VAC | Max 30A",
    protections: ["OVP", "OCP", "OTP", "Liquid Leak Detect", "ASIL-D Ready"],
    formFactor: {
      ipRating: "IP68",
      dimensions: "320 × 200 × 160 mm",
      tempRange: "-40°C to +85°C",
      weight: "6.8 kg"
    },
    application: {
      segment: "On-Board Charger",
      targetCustomers: ["Automotive OEM", "Fleet Infrastructure"],
      typicalUse: ["Commercial Trucks", "Passenger 4W", "Bus Depots"],
      ecosystem: [
        { type: "Commercial Trucks", compatibility: "High-voltage battery arrays" },
        { type: "Passenger Vehicles", compatibility: "Integrated CMS / VCU" }
      ]
    },
    trust: {
      certifications: ["CE Certified", "IEC 62196", "SAE J1772", "AIS 156"],
      reliabilityNotes: "Liquid-cooled for 100% duty cycle, submersible IP68, ASIL-D ready"
    },
    metadata: {
      sku: "ED-OBC-66L",
      datasheetUrl: "/docs/edrift-6.6kw-obc.pdf"
    },
    features: [
      "Liquid-cooled for 100% duty cycle in extreme heat",
      "Submersible-grade IP68 protection",
      "High isolation voltage (2.5kV AC)",
      "Modular scalability for higher power needs",
      "SAE J1939 Compliant firmware",
      "CE Certified for global market entry"
    ],
    specs: [
      { label: "Max Current", value: "60A @ 96V | 16.5A @ 400V", notes: "High power density" },
      { label: "Efficiency", value: "≥97%", notes: "Nominal" },
      { label: "Cooling", value: "Liquid Cooling", notes: "Optimized for heavy duty" },
      { label: "IP Rating", value: "IP68", notes: "Submersion Grade" },
      { label: "Communication", value: "CAN 2.0B", notes: "Industrial standard" }
    ],
    compliance: ["CE Certified", "IEC 62196", "SAE J1772", "AIS 156"],
    customization: ["Harness Connectors", "Firmware Over-the-Air", "Cooling Fittings"],
    leadTime: [
      { volume: "Sample Units", weeks: "6 weeks" },
      { volume: "Volume Production", weeks: "14 weeks" }
    ],
    badges: ["In production", "Sample available"],
    image: "https://images.unsplash.com/photo-1620218173997-442402f114a2?q=80&w=800&h=600&auto=format&fit=crop"
  }
];
