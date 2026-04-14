export interface Product {
  id: string;
  slug: string;
  name: string;
  series: "Elite" | "EliteX" | "Ultra" | "UltraX" | "Delta" | "DeltaX" | "Combo" | "Magna";
  tagline: string;
  description: string;
  category: "Portable EV Charger" | "On Board Charger" | "On Board DC-DC" | "2-in-1 Integrated OBC" | "Bi-Directional Charger (V2L)";
  powerRating: string;
  voltageRange: string;
  inputSpecs: string;
  maxCurrent: string;
  metadata: {
    sku: string;
    datasheetUrl: string;
  };
  specs: { label: string; value: string; notes?: string }[];
  badges: ("In production" | "Customizable" | "Sample available")[];
  image: string;
}

const ELITE_SPECS = [
  { label: "Input Voltage Range", value: "90-265VAC", notes: "Rated 220VAC" },
  { label: "Input Power Factor", value: "≥0.99", notes: "@220Vin, Pomax" },
  { label: "Efficiency", value: "≥97%", notes: "Peak Efficiency" },
  { label: "Stabilization", value: "≤1%", notes: "Voltage Accuracy" },
  { label: "Response Time", value: "≤1S", notes: "Output Response" },
  { label: "Cooling", value: "Natural Air Cooling", notes: "Maintenance Free" },
  { label: "IP Rating", value: "IP67", notes: "Ruggedized" }
];

export const products: Product[] = [
  // ELITE SERIES - PORTABLE
  {
    id: "pt48-50",
    slug: "portable-charger-pt48-50",
    name: "PT48-50 Portable Charger",
    series: "Elite",
    category: "Portable EV Charger",
    powerRating: "3.3kW",
    voltageRange: "48V (32-66V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Rugged, portable 3.3kW charging solution for 48V EV platforms.",
    description: "The Elite PT48-50 provides highly reliable portable charging for 48V electric vehicles. Designed for industrial fleets and last-mile delivery vehicles requiring flexible, high-current charging in a ruggedized form factor.",
    metadata: { sku: "PT48-50", datasheetUrl: "/docs/datasheet-PT48-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production", "Customizable"],
    image: "/images/products/portable-elite.jpg"
  },
  {
    id: "pt96-50",
    slug: "portable-charger-pt96-50",
    name: "PT96-50 Portable Charger",
    series: "Elite",
    category: "Portable EV Charger",
    powerRating: "3.3kW",
    voltageRange: "96V (60-130V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Professional portable 3.3kW charger for 96V battery architectures.",
    description: "The PT96-50 delivers efficient 3.3kW power to 96V EV systems. Featuring eDrift's core power electronic architecture in a mobile, IP67-rated enclosure for versatile operational deployment.",
    metadata: { sku: "PT96-50", datasheetUrl: "/docs/datasheet-PT96-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production", "Customizable"],
    image: "/images/products/portable-elite.jpg"
  },
  // ELITE SERIES - OBC
  {
    id: "obc48-50",
    slug: "onboard-charger-obc48-50",
    name: "OBC48-50 On-Board Charger",
    series: "Elite",
    category: "On Board Charger",
    powerRating: "3.3kW",
    voltageRange: "48V (32-66V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Industrial-grade 3.3kW OBC for 48V electric mobility platforms.",
    description: "The Elite OBC48-50 is a high-efficiency on-board charger optimized for 48V EV architectures. Integrated seamlessly into vehicle power chains, it offers automotive-grade reliability and precision power control.",
    metadata: { sku: "OBC48-50", datasheetUrl: "/docs/datasheet-OBC48-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production", "Customizable"],
    image: "/images/products/obc-elite.jpg"
  },
  {
    id: "obc60-50",
    slug: "onboard-charger-obc60-50",
    name: "OBC60-50 On-Board Charger",
    series: "Elite",
    category: "On Board Charger",
    powerRating: "3.3kW",
    voltageRange: "60V (35-78V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Compact 3.3kW on-board power conversion for 60V systems.",
    description: "Engineered for 60V light electric vehicles, the OBC60-50 provides 3.3kW of stable output power. Its compact footprint and high thermal efficiency make it ideal for integrated OEM applications.",
    metadata: { sku: "OBC60-50", datasheetUrl: "/docs/datasheet-OBC60-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production"],
    image: "/images/products/obc-elite.jpg"
  },
  {
    id: "obc72-50",
    slug: "onboard-charger-obc72-50",
    name: "OBC72-50 On-Board Charger",
    series: "Elite",
    category: "On Board Charger",
    powerRating: "3.3kW",
    voltageRange: "72V (45-90V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "High-density 3.3kW OBC for standardized 72V EV platforms.",
    description: "The Elite OBC72-50 delivers 3.3kW charging for 72V battery packs. Built with field-proven power electronics, it ensures maximum uptime and energy efficiency for commercial and passenger 3-wheelers.",
    metadata: { sku: "OBC72-50", datasheetUrl: "/docs/datasheet-OBC72-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production", "Customizable"],
    image: "/images/products/obc-elite.jpg"
  },
  {
    id: "obc84-50",
    slug: "onboard-charger-obc84-50",
    name: "OBC84-50 On-Board Charger",
    series: "Elite",
    category: "On Board Charger",
    powerRating: "3.3kW",
    voltageRange: "84V (60-110V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Robust 3.3kW power conversion for 84V utility electrification.",
    description: "Tailored for utility and specialized EV platforms, the OBC84-50 offers 3.3kW output for 84V systems. High isolation and precision regulation provide safe, consistent charging in industrial environments.",
    metadata: { sku: "OBC84-50", datasheetUrl: "/docs/datasheet-OBC84-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production"],
    image: "/images/products/obc-elite.jpg"
  },
  {
    id: "obc96-50",
    slug: "onboard-charger-obc96-50",
    name: "OBC96-50 On-Board Charger",
    series: "Elite",
    category: "On Board Charger",
    powerRating: "3.3kW",
    voltageRange: "96V (60-130V)",
    maxCurrent: "50A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Flagship 3.3kW OBC for high-voltage 96V mobility solutions.",
    description: "The Elite OBC96-50 is our premier solution for 96V architectures. Delivering 3.3kW with automotive-grade precision, it powers the next generation of high-performance electric 3-wheelers and light 4-wheelers.",
    metadata: { sku: "OBC96-50", datasheetUrl: "/docs/datasheet-OBC96-50.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production", "Customizable"],
    image: "/images/products/obc-elite.jpg"
  },
  {
    id: "obc400-10",
    slug: "onboard-charger-obc400-10",
    name: "OBC400-10 On-Board Charger",
    series: "Elite",
    category: "On Board Charger",
    powerRating: "3.3kW",
    voltageRange: "400V (200-440V)",
    maxCurrent: "10A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "Strategic 400V charging for high-voltage light EV platforms.",
    description: "The OBC400-10 provides 3.3kW of charging power for 400V systems. Its high-voltage architecture and efficient conversion make it a critical component for specialized electric platforms.",
    metadata: { sku: "OBC400-10", datasheetUrl: "/docs/datasheet-OBC400-10.pdf" },
    specs: ELITE_SPECS,
    badges: ["In production", "Sample available"],
    image: "/images/products/obc-elite.jpg"
  },
  // ELITEX SERIES
  {
    id: "obc400-20",
    slug: "onboard-charger-obc400-20",
    name: "OBC400-20 High-Power OBC",
    series: "EliteX",
    category: "On Board Charger",
    powerRating: "7.2kW",
    voltageRange: "400V (200-440V)",
    maxCurrent: "20A",
    inputSpecs: "Single Phase (170V-270VAC)",
    tagline: "High-density 7.2kW single-phase charging for 400V platforms.",
    description: "The EliteX OBC400-20 doubles the charging capacity in a compact single-phase footprint. Delivering 7.2kW to 400V systems, it enables faster turnaround times for commercial and passenger EV fleets.",
    metadata: { sku: "OBC400-20", datasheetUrl: "/docs/datasheet-OBC400-20.pdf" },
    specs: [
      { label: "Rated Power", value: "7.2kW", notes: "Single Phase" },
      { label: "Input Voltage", value: "170-270VAC", notes: "50/60Hz" },
      { label: "IP Rating", value: "IP67", notes: "Industrial Grade" }
    ],
    badges: ["In production", "Sample available"],
    image: "/images/products/obc-elitex.jpg"
  },
  // ULTRA SERIES
  {
    id: "obc96-120",
    slug: "onboard-charger-obc96-120",
    name: "OBC96-120 Three-Phase OBC",
    series: "Ultra",
    category: "On Board Charger",
    powerRating: "11kW",
    voltageRange: "96V",
    maxCurrent: "120A",
    inputSpecs: "Three Phase",
    tagline: "Industrial 11kW three-phase charging for high-current 96V fleets.",
    description: "The Ultra OBC96-120 leverages three-phase input to deliver a massive 120A charging current to 96V battery systems. Ideal for heavy-duty industrial vehicles and high-utilization fleet depots.",
    metadata: { sku: "OBC96-120", datasheetUrl: "/docs/datasheet-OBC96-120.pdf" },
    specs: [
      { label: "Rated Power", value: "11kW", notes: "Three Phase" },
      { label: "Output Current", value: "120A", notes: "High Throughput" },
      { label: "IP Rating", value: "IP67", notes: "Ruggedized" }
    ],
    badges: ["Sample available"],
    image: "/images/products/obc-ultra.jpg"
  },
  {
    id: "obc400-30",
    slug: "onboard-charger-obc400-30",
    name: "OBC400-30 Three-Phase OBC",
    series: "Ultra",
    category: "On Board Charger",
    powerRating: "11kW",
    voltageRange: "400V",
    maxCurrent: "30A",
    inputSpecs: "Three Phase",
    tagline: "Standardized 11kW three-phase charging for 400V architectures.",
    description: "The Ultra OBC400-30 provides a robust 11kW charging solution for 400V electric vehicles. Its three-phase design ensures balanced load and high efficiency for residential and commercial charger deployments.",
    metadata: { sku: "OBC400-30", datasheetUrl: "/docs/datasheet-OBC400-30.pdf" },
    specs: [
      { label: "Rated Power", value: "11kW", notes: "Three Phase" },
      { label: "Output Voltage", value: "400V", notes: "Nominal" },
      { label: "IP Rating", value: "IP67", notes: "Automotive Grade" }
    ],
    badges: ["Sample available"],
    image: "/images/products/obc-ultra.jpg"
  },
  // ULTRAX SERIES
  {
    id: "obc400-50",
    slug: "onboard-charger-obc400-50",
    name: "OBC400-50 Ultra-High Power OBC",
    series: "UltraX",
    category: "On Board Charger",
    powerRating: "20kW",
    voltageRange: "400V",
    maxCurrent: "50A",
    inputSpecs: "Three Phase",
    tagline: "Flagship 20kW three-phase charging platform for heavy EVs.",
    description: "The UltraX OBC400-50 is our highest power on-board solution, delivering 20kW of charging capacity. It is engineered for electric trucks, buses, and heavy utility vehicles requiring rapid energy replenishment.",
    metadata: { sku: "OBC400-50", datasheetUrl: "/docs/datasheet-OBC400-50.pdf" },
    specs: [
      { label: "Rated Power", value: "20kW", notes: "Liquid Cooled Optional" },
      { label: "Input Phase", value: "Three Phase", notes: "Balanced Load" },
      { label: "Max Current", value: "50A", notes: "@400V" }
    ],
    badges: ["Customizable", "Sample available"],
    image: "/images/products/obc-ultra.jpg"
  },
  // DELTA SERIES - DC-DC
  {
    id: "dc12-50",
    slug: "dcdc-converter-dc12-50",
    name: "DC12-50 On-Board DC-DC",
    series: "Delta",
    category: "On Board DC-DC",
    powerRating: "750W",
    voltageRange: "14V (Output)",
    maxCurrent: "50A",
    inputSpecs: "DC (250V - 400V)",
    tagline: "High-efficiency 750W DC-DC converter for auxiliary EV power.",
    description: "The Delta DC12-50 converts high-voltage traction power (250V-400V) to stable 14V auxiliary power. Essential for powering vehicle ECUs, lighting, and low-voltage accessories with maximum reliability.",
    metadata: { sku: "DC12-50", datasheetUrl: "/docs/datasheet-DC12-50.pdf" },
    specs: [
      { label: "Output Power", value: "750W", notes: "Continuous" },
      { label: "Input Range", value: "250V-400V DC", notes: "HV Input" },
      { label: "Efficiency", value: "≥94%", notes: "Peak" }
    ],
    badges: ["In production"],
    image: "/images/products/dcdc-delta.jpg"
  },
  {
    id: "dc12-100",
    slug: "dcdc-converter-dc12-100",
    name: "DC12-100 High-Current DC-DC",
    series: "DeltaX",
    category: "On Board DC-DC",
    powerRating: "1.5kW",
    voltageRange: "14V (Output)",
    maxCurrent: "100A",
    inputSpecs: "DC (250V - 400V)",
    tagline: "High-power 1.5kW DC-DC converter for heavy auxiliary loads.",
    description: "The DeltaX DC12-100 delivers a massive 100A at 14V, providing 1.5kW for vehicles with significant auxiliary power requirements. Designed for commercial vehicles and platforms with high electrical accessory loads.",
    metadata: { sku: "DC12-100", datasheetUrl: "/docs/datasheet-DC12-100.pdf" },
    specs: [
      { label: "Output Power", value: "1.5kW", notes: "Sustained" },
      { label: "Output Current", value: "100A", notes: "High Load" },
      { label: "IP Rating", value: "IP67", notes: "Ruggedized" }
    ],
    badges: ["In production", "Customizable"],
    image: "/images/products/dcdc-delta.jpg"
  },
  // COMBO SERIES
  {
    id: "c96-100",
    slug: "combo-obc-dcdc-c96-100",
    name: "C96-100 2-in-1 Integrated Platform",
    series: "Combo",
    category: "2-in-1 Integrated OBC",
    powerRating: "3.3kW",
    voltageRange: "96V OBC | 14V DC-DC",
    maxCurrent: "50A OBC | 100A DC-DC",
    inputSpecs: "Single Phase",
    tagline: "Integrated 3.3kW OBC and DC-DC for compact EV packaging.",
    description: "The Combo C96-100 integrates a 3.3kW charger and a high-current DC-DC converter into a single unit. This consolidation reduces vehicle weight, simplifies wiring, and optimizes space for compact electric platforms.",
    metadata: { sku: "C96-100", datasheetUrl: "/docs/datasheet-C96-100.pdf" },
    specs: [
      { label: "OBC Power", value: "3.3kW", notes: "96V System" },
      { label: "DC-DC Current", value: "100A", notes: "14V Auxiliary" },
      { label: "Integration", value: "2-in-1 System", notes: "Space Saving" }
    ],
    badges: ["Customizable", "Sample available"],
    image: "/images/products/combo-series.jpg"
  },
  // MAGNA SERIES
  {
    id: "bd96-50",
    slug: "bidirectional-charger-bd96-50",
    name: "BD96-50 Bi-Directional (V2L)",
    series: "Magna",
    category: "Bi-Directional Charger (V2L)",
    powerRating: "3.3kW",
    voltageRange: "96V",
    maxCurrent: "50A",
    inputSpecs: "Single Phase",
    tagline: "Smart 3.3kW bi-directional charging enabling V2L capabilities.",
    description: "The Magna BD96-50 enables vehicles to not only consume but also provide energy. Supporting bi-directional power flow, it allows EV batteries to power external loads, turning the vehicle into a mobile energy hub.",
    metadata: { sku: "BD96-50", datasheetUrl: "/docs/datasheet-BD96-50.pdf" },
    specs: [
      { label: "Rated Power", value: "3.3kW", notes: "Bi-Directional" },
      { label: "Capabilities", value: "V2L / V2X Ready", notes: "Smart Grid" },
      { label: "Efficiency", value: "≥96%", notes: "Dual Flow" }
    ],
    badges: ["Sample available", "Customizable"],
    image: "/images/products/magna-series.jpg"
  }
];
