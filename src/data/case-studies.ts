import { CaseStudy } from "@/types/content";

export const caseStudies: CaseStudy[] = [
  {
    title: "Designing a Compact 3.3 kW On-Board Charger Using SiC MOSFETs",
    slug: "obc-sic-design",
    industry: "Electric Two-Wheeler",
    category: "Power Electronics · On-Board Charger",
    tagBadge: "Power Electronics · On-Board Charger",
    headline: "Designing a Compact 3.3 kW On-Board Charger Using SiC MOSFETs for a Two-Wheeler EV Platform",
    subheadline: "How Edrift Electric engineered a high-efficiency, thermally optimized OBC with 40% reduced form factor for integration into a production 2W EV platform.",
    meta: {
      industry: "Electric Two-Wheeler",
      type: "On-Board Charger (OBC)",
      technology: "Silicon Carbide (SiC)",
      status: "Deployed"
    },
    keyMetrics: [
      { value: "94.8%", label: "Peak System Efficiency" },
      { value: "40%", label: "Form Factor Reduction" },
      { value: "85°C→52°C", label: "Junction Temp Drop" },
      { value: "3.2 kW/L", label: "Power Density" }
    ],
    clientOverview: {
      content: "A fast-growing Indian electric two-wheeler manufacturer approached Edrift Electric with a clear requirement: a compact, efficient, and cost-optimized 3.3 kW on-board charger that could integrate directly into their next-generation 2W EV platform without requiring an external cooling system.",
      profile: [
        { label: "Segment", value: "Electric Two-Wheeler OEM" },
        { label: "Geography", value: "India (Pan-India deployment)" },
        { label: "Volume Target", value: "5,000 units — first production batch" },
        { label: "Timeline", value: "12 weeks from design brief to prototype" },
        { label: "Compliance", value: "AIS-138 | BIS | IP67" }
      ]
    },
    challenge: {
      content: "The client's existing charger design — based on a conventional IGBT topology — was occupying a volume of 2.1 litres within the vehicle chassis. This was creating packaging conflicts with the battery management system and motor controller, forcing the mechanical team to make uncomfortable structural compromises.",
      bullets: [
        "Charger volume too large for target chassis integration",
        "IGBT switching losses causing excessive heat at 3.3 kW load",
        "Active cooling loop adding 380g of weight and system complexity",
        "Switching frequency limited to 65 kHz — restricting magnetics miniaturization",
        "Efficiency at partial load (20–50%) was particularly poor",
        "No bidirectional capability for future V2G roadmap"
      ]
    },
    technicalConstraints: {
      content: "Edrift's engineering team received the following hard constraints from the client at the start of the engagement:",
      tables: [
        {
          title: "Electrical Requirements",
          rows: [
            { label: "Input Voltage", value: "85V AC – 265V AC (universal input)" },
            { label: "Output Voltage", value: "58.8V DC (nominal) — LFP pack" },
            { label: "Output Current", value: "0 – 58A continuous" },
            { label: "Output Power", value: "3.3 kW (rated) | 3.5 kW (peak 10s)" },
            { label: "Power Factor", value: "> 0.98 at full load" },
            { label: "Isolation", value: "Galvanic | Class II" }
          ]
        },
        {
          title: "Mechanical & Environmental",
          rows: [
            { label: "Maximum Volume", value: "1.25 litres (hard constraint)" },
            { label: "Maximum Weight", value: "1.8 kg" },
            { label: "Cooling", value: "Passive only — no active cooling" },
            { label: "Ingress Protection", value: "IP67 minimum" }
          ]
        }
      ]
    },
    designApproach: {
      content: "Edrift's engineering team structured the design into three primary power conversion stages, each selected and optimized specifically to meet the thermal and volumetric constraints.",
      sections: [
        {
          title: "Stage 1 — Totem-Pole PFC",
          content: "The first stage uses a bridgeless totem-pole PFC topology implemented with GaN HEMTs. This eliminates the conventional diode bridge rectifier — the single largest source of conduction loss. Operating at 140 kHz, it achieves a power factor of 0.99 and THD of 3.2%."
        },
        {
          title: "Stage 2 — LLC Resonant DC-DC",
          content: "The isolation stage uses an LLC resonant converter with SiC MOSFETs. ZVS on primary MOSFETs eliminates switching losses across the full load range. Operating frequency: 120 kHz – 200 kHz, enabling significant reduction in transformer core volume."
        },
        {
          title: "Magnetics Design",
          content: "Custom-designed planar E-core topology in N87 ferrite. Planar construction achieved winding height < 8mm and improved thermal coupling. Resonant inductor integrated as a controlled leakage element."
        },
        {
          title: "Gate Driver Design",
          content: "Active Miller clamp circuit and independent gate resistors for turn-on (10Ω) and turn-off (2.2Ω). Isolated power supply per switch: 3kV isolation rating."
        }
      ]
    },
    semiconductors: {
      content: "The selection of switching devices was the most critical design decision — directly determining efficiency, switching frequency, and thermal performance.",
      table: {
        headers: ["Parameter", "Si IGBT", "Si MOSFET", "SiC MOSFET", "GaN HEMT"],
        rows: [
          ["Vds rating", "600V", "600V", "650V", "650V"],
          ["Rdson (typ)", "—", "85 mΩ", "28 mΩ", "18 mΩ"],
          ["Max freq.", "65 kHz", "100 kHz", "300 kHz", "500 kHz"],
          ["Switching loss", "High", "Medium", "Low", "V. Low"],
          ["Thermal Rth", "0.42", "0.38", "0.29", "0.24"]
        ]
      },
      rationale: [
        "SiC MOSFETs enabled low conduction loss at 58A output.",
        "GaN HEMTs minimized conduction loss in PFC switches with zero reverse recovery.",
        "Automotive-grade qualification matched OEM requirements."
      ],
      selected: [
        { stage: "PFC Stage", device: "GaN Systems GS66508T — 650V, 30A, GaN HEMT" },
        { stage: "LLC Primary", device: "Wolfspeed C3M0025065D — 650V, 90A, SiC MOSFET" },
        { stage: "LLC Secondary", device: "ROHM SCS220AE2 — 650V, SiC Schottky" }
      ]
    },
    efficiency: {
      content: "Efficiency was measured across the full load sweep from 10% to 100% rated power.",
      table: [
        { load: "10%", baseline: "83.4%", design: "88.2%" },
        { load: "25%", baseline: "88.8%", design: "92.9%" },
        { load: "50%", baseline: "91.3%", design: "94.1%" },
        { load: "100%", baseline: "91.2%", design: "94.8%" }
      ],
      summary: [
        "Peak efficiency gain: +3.6 percentage points",
        "Full-load power loss: 198W → 171W (−27W)",
        "Annual energy saving: Approx. 18 kWh per vehicle"
      ]
    },
    thermal: {
      content: "Passive cooling demanded exceptional thermal management from the PCB layout upward.",
      strategy: "The chassis doubles as the heatsink. Aluminium extrusion profile forms the base plate with SiC MOSFETs mounted directly using 0.1mm TIM.",
      path: "Tj (Junction) → Tc (Case) → TIM → Heatsink → Ambient",
      measurements: [
        { device: "PFC Switch", baseline: "102°C", design: "64°C", improvement: "−38°C" },
        { device: "LLC MOSFET", baseline: "85°C", design: "52°C", improvement: "−33°C" },
        { device: "LLC Diode", baseline: "91°C", design: "48°C", improvement: "−43°C" }
      ],
      result: "All semiconductor junctions operate below 65°C even at maximum ambient temperature, providing 110°C margin."
    },
    powerDensity: {
      content: "Significant volume and weight reduction achieved through high-frequency operation and planar magnetics.",
      metrics: [
        { label: "Total Volume", baseline: "2.1 litres", design: "1.24 litres" },
        { label: "Total Weight", baseline: "2.6 kg", design: "1.71 kg" },
        { label: "Power Density", baseline: "1.57 kW/L", design: "3.2 kW/L" }
      ],
      recoveryPoints: [
        "Planar transformer: 61% lower height",
        "Higher switching frequency: 65kHz → 140kHz",
        "Elimination of diode bridge: -18cc volume",
        "Integrated resonant inductor: -24cc"
      ],
      outcome: "Resolved chassis packaging conflict and eliminated active cooling, saving 380g weight."
    },
    validation: {
      content: "Comprehensive electrical and environmental testing matching Indian and international standards.",
      tables: [
        {
          title: "Electrical & Environmental",
          rows: [
            { test: "Full load efficiency", result: "PASS" },
            { test: "IP67 immersion (1m, 30 min)", result: "PASS" },
            { test: "Thermal cycling (-40°C to +85°C)", result: "PASS" },
            { test: "Conducted emissions CISPR 32", result: "PASS" }
          ]
        }
      ]
    },
    deployment: {
      content: "The SiC OBC entered pilot production in Q3 2024 with 120 units deployed across 3 Indian cities.",
      metrics: [
        { label: "Units Deployed", value: "120 units (pilot batch)" },
        { label: "Field Failures", value: "0 units" },
        { label: "Avg. Efficiency", value: "93.9% (field)" }
      ]
    },
    testimonial: {
      quote: "Edrift's engineering team understood our constraints from day one. They delivered a charger that solved our packaging problem, eliminated our cooling system, and improved charging efficiency — all at the same time.",
      author: "VP Engineering",
      role: "Electric Two-Wheeler OEM"
    },
    relatedLinks: [
      { label: "View 3.3 kW OBC Product Page", href: "/products/obc-33" },
      { label: "Try the Magnetics Design Calculator", href: "/tools/magnetics" }
    ]
  },
  {
    title: "Retrofitting a 22 kW Bidirectional DC-DC Converter from IGBT to SiC",
    slug: "igbt-sic-retrofit",
    industry: "EV Charging Infrastructure",
    category: "Power Electronics · DC-DC Converter · SiC Retrofit",
    tagBadge: "Power Electronics · DC-DC Converter · SiC Retrofit",
    headline: "Retrofitting a 22 kW Bidirectional DC-DC Converter from IGBT to SiC: +3.8% Efficiency and 50°C Lower Junction Temperature",
    subheadline: "How Edrift Electric redesigned the power stage of an existing 22 kW bidirectional DC-DC converter — replacing IGBT switches with SiC MOSFETs — delivering measurable efficiency gains.",
    meta: {
      industry: "EV Charging Infrastructure",
      type: "Bidirectional DC-DC Converter",
      technology: "Silicon Carbide (SiC) — IGBT Retrofit",
      status: "Production"
    },
    keyMetrics: [
      { value: "96.1%", label: "Peak System Efficiency" },
      { value: "+3.8%", label: "Efficiency Improvement" },
      { value: "50°C", label: "Junction Temp Drop" },
      { value: "2×", label: "Switching Frequency" }
    ],
    clientOverview: {
      content: "A Bangalore-based EV charging infrastructure company was deploying bidirectional DC-DC converters as the core power conversion stage in their V2G-capable charging stations. Their existing design was performing at 92.3% peak efficiency, creating energy loss and thermal issues.",
      profile: [
        { label: "Segment", value: "EV Charging Infrastructure Provider" },
        { label: "Application", value: "V2G Bidirectional Charging Station" },
        { label: "Power Level", value: "22 kW continuous bidirectional" },
        { label: "Challenge", value: "Efficiency + thermal + size reduction" }
      ]
    },
    challenge: {
      content: "The client's bidirectional DC-DC converter was built around a Dual Active Bridge (DAB) topology using 1200V IGBT modules. The design was failing on efficiency, thermal management cost, and switching frequency limitations.",
      bullets: [
        "1.69 kW continuous heat generation per unit wasting network power",
        "Forced-air cooling system adding 2.1 kg and increasing failure rates",
        "Switching frequency limited to 20 kHz by IGBT losses",
        "Requirement: Improve efficiency above 95.5% and eliminate active cooling"
      ]
    },
    technicalConstraints: {
      content: "The retrofit engagement carried additional constraints beyond a greenfield design — the existing mechanical enclosure, PCB form factor, and control firmware were all fixed variables.",
      tables: [
        {
          title: "Electrical & Mechanical",
          rows: [
            { label: "Topology", value: "Dual Active Bridge (DAB) — fixed" },
            { label: "Power Rating", value: "22 kW continuous | 25 kW peak" },
            { label: "Switching Frequency", value: "Must exceed 40 kHz" },
            { label: "PCB footprint", value: "340mm × 220mm — fixed" },
            { label: "Cooling", value: "Passive target — remove active system" }
          ]
        }
      ]
    },
    designApproach: {
      content: "Edrift's engineering scope was focused entirely on the power stage — devices, gate drivers, magnetics, and thermal path, while maintaining the DAB topology and control firmware.",
      sections: [
        {
          title: "SiC Device Sizing",
          content: "Four SiC devices placed in parallel on each switch position (16 total) to achieve current rating while maintaining junction temperatures within 90°C in passive cooling."
        },
        {
          title: "Gate Driver Redesign",
          content: "Fundamental shift from ±15V (IGBT) to +18V/-4V (SiC). Dead-time reduced 6× from 3.2μs to 480ns, improving phase-shift control resolution."
        },
        {
          title: "Transformer Re-Optimization",
          content: "Redesigned with EE55 N87 ferrite core (34% smaller). Interleaved winding structure reduced AC copper loss by 42%. Leakage inductance precisely controlled at 18μH."
        },
        {
          title: "Thermal Redesign",
          content: "SiC dissipated 62% less heat. Custom aluminium cold-plate replaced fan-cooled heatsink, achieving target temperatures via natural convection."
        }
      ]
    },
    semiconductors: {
      content: "The IGBT → SiC selection required analysis at 1200V, where SiC delivers very large performance advantages.",
      table: {
        headers: ["Parameter", "1200V IGBT", "1200V SiC (A)", "1200V SiC (B)"],
        rows: [
          ["Rdson / Vce(sat)", "2.0V sat", "40 mΩ", "16 mΩ"],
          ["Switching loss", "3.8 mJ", "0.6 mJ", "0.38 mJ"],
          ["Body diode Qrr", "12 μC", "0", "0"],
          ["Max Tj", "150°C", "175°C", "175°C"]
        ]
      },
      rationale: [
        "Wolfspeed C3M0016120K enabled lowest conduction loss (4 mΩ effective).",
        "10× lower switching loss than IGBT.",
        "Zero body diode reverse recovery critical for DAB operation.",
        "Kelvin source package enabled lower gate drive inductance."
      ],
      selected: [
        { stage: "All Bridge Switches", device: "Wolfspeed C3M0016120K — 1200V, 45A, SiC MOSFET" }
      ]
    },
    efficiency: {
      content: "Efficiency comparison across power levels for the charge direction.",
      table: [
        { load: "5 kW", baseline: "88.6%", design: "93.1%" },
        { load: "10 kW", baseline: "91.4%", design: "95.2%" },
        { load: "22 kW", baseline: "92.3%", design: "96.1%" }
      ],
      summary: [
        "Network-level impact: 34 kW continuous power saving",
        "Annual energy saving: 297,840 kWh",
        "Payback on SiC premium: 11 months"
      ]
    },
    thermal: {
      content: "Heat generation reduced by 68% at full load, enabling fan removal.",
      strategy: "Custom aluminium cold-plate matched to existing PCB pattern. Natural convection from enclosure surface.",
      path: "Tj → Tc → TIM → Cold Plate → Enclosure → Ambient",
      measurements: [
        { device: "Primary MOSFETs", baseline: "127°C", design: "77°C", improvement: "−50°C" },
        { device: "Secondary MOSFETs", baseline: "119°C", design: "72°C", improvement: "−47°C" },
        { device: "Transformer winding", baseline: "98°C", design: "74°C", improvement: "−24°C" }
      ],
      result: "Fans eliminated, saving 45W auxiliary power and removing highest failure rate component."
    },
    powerDensity: {
      content: "Weight reduction and reliability improvement through component integration and cooling elimination.",
      metrics: [
        { label: "Cooling Type", baseline: "Forced air", design: "Passive" },
        { label: "Heatsink Weight", baseline: "2.1 kg", design: "0.68 kg" },
        { label: "Noise Level", baseline: "62 dB(A)", design: "Silent" }
      ],
      recoveryPoints: [
        "Reduced core volume: 34% smaller",
        "Eliminated fans and associated auxiliary power stage",
        "Lower gate drive dissipation",
        "Integrated resonant inductance"
      ],
      outcome: "3-year saving per unit: ₹64,420. Saving across 40 stations: ₹25.8 L."
    },
    validation: {
      content: "Electrical, thermal, and firmware compatibility testing confirmed successful retrofit.",
      tables: [
        {
          title: "Electrical & Compatibility",
          rows: [
            { test: "Bidirectional power flow", result: "PASS" },
            { test: "Firmware compatibility", result: "PASS" },
            { test: "CAN communication", result: "PASS" },
            { test: "Isolation 4000V AC", result: "PASS" }
          ]
        }
      ]
    },
    deployment: {
      content: "40 stations upgraded with SiC power stages, showing 0 failures over 8 months.",
      metrics: [
        { label: "Units Upgraded", value: "40 stations" },
        { label: "Field Failures", value: "0" },
        { label: "Avg. Efficiency", value: "95.6% (field)" }
      ]
    },
    testimonial: {
      quote: "The silent operation alone has transformed how our stations are perceived by end users — and the efficiency numbers are exactly what they promised.",
      author: "Head of Hardware Engineering",
      role: "EV Charging Infrastructure Company"
    },
    relatedLinks: [
      { label: "View Bidirectional DC-DC Product Page", href: "/products/dcdc-22" },
      { label: "Read: SiC vs IGBT Comparison", href: "/blog/sic-vs-igbt" }
    ]
  }
];
