import { Newsletter } from "@/types/content";

export const newsletters: Newsletter[] = [
  {
    issueNumber: 13,
    title: "V2G Technology Deep-Dive + India Policy Update",
    slug: "v2g-technology-deep-dive-january-2025",
    date: "January 2025",
    subject: "⚡ Edrift Electric | January 2025 — V2G Technology Deep-Dive + India Policy Update",
    preheader: "Bidirectional charging explained | New GaN calculator tool | FAME III preliminary analysis | Engineering opportunities at Edrift",
    excerpt: "Bidirectional charging explained | New GaN calculator tool | FAME III preliminary analysis | Engineering opportunities at Edrift",
    topics: ["V2G/V2H", "GaN PFC", "FAME III", "Careers"],
    featuredImage: "/images/newsletter/v2g-jan-2025.png",
    content: `
## FEATURED DEEP-DIVE — V2G & V2H TECHNOLOGY EXPLAINED

### WHAT IS V2G AND V2H?

**V2G (Vehicle-to-Grid):**
The ability of an electric vehicle to discharge stored energy from its battery back to the electrical grid. This enables the EV to act as a distributed energy storage resource, providing grid stabilization services and earning revenue for the vehicle owner during peak demand periods.

**V2H (Vehicle-to-Home):**
The ability of an EV to power a home during a grid outage or during peak tariff hours. The vehicle battery becomes a home energy backup system — particularly valuable in India where grid reliability varies significantly by region.

**V2L (Vehicle-to-Load):**
General ability to power external loads (tools, appliances, camping equipment) from the vehicle battery via a standard AC outlet built into the vehicle.

### WHY IS THIS HARD TO ENGINEER?

A conventional on-board charger (OBC) is a unidirectional power converter:
AC Grid → Rectifier → PFC → Isolated DC-DC → Battery (charging)

A bidirectional OBC must enable:
AC Grid ⇄ Rectifier/Inverter ⇄ Isolated DC-DC ⇄ Battery

This requires:
1. Bidirectional AC-DC stage (active rectifier that can also invert DC to AC)
2. Bidirectional isolated DC-DC stage (typically CLLC or DAB topology)
3. Synchronized control of both stages during mode transitions
4. Grid-tie inverter functionality with THD < 5%, PF > 0.99, and anti-islanding protection
5. Battery management coordination — vehicle BMS must authorize discharge

### SEMICONDUCTOR SELECTION FOR BIDIRECTIONAL CHARGERS

For bidirectional operation, the body diode of the switching device conducts during dead-time transitions in every switching cycle. IGBT body diodes have high reverse recovery charge (Qrr), making them unsuitable for efficient bidirectional designs above 50 kHz.

SiC MOSFETs have near-zero reverse recovery (Qrr ≈ 0), making them the strongly preferred semiconductor for bidirectional EV chargers operating at 100+ kHz.

### MARKET STATUS — V2G/V2H IN INDIA (2025)

**Technical maturity:** High. Standards exist (ISO 15118-20), SiC devices are mature.
**Vehicle support:** Low but growing. MG ZS EV, BYD Atto 3, and upcoming Tata/Mahindra models.
**Grid integration:** Very low. DISCOMs have no established framework for revenue settlement or interconnection standards.

**Edrift's assessment:** V2H will arrive in India before V2G because it does not require DISCOM coordination.

---

## TOOL LAUNCH — GaN TOTEM-POLE PFC DESIGN CALCULATOR

The totem-pole Power Factor Correction (PFC) topology is becoming the dominant AC-DC stage in high-efficiency EV chargers. It eliminates the diode bridge rectifier — removing 15–25W of conduction loss in a typical 3.3 kW charger design.

**This calculator automates the design process:**
- GaN device selection
- Inductor sizing for CCM
- Control loop compensation
- Efficiency estimation

[Try the GaN Totem-Pole PFC Calculator →](/design-calculator/gan-totem-pole-pfc)

---

## INDIA POLICY UPDATE — FAME III DRAFT GUIDELINES ANALYSIS

The Ministry of Heavy Industries (MHI) released the draft guidelines for FAME III in late December 2024.

**Key Changes vs FAME II:**
1. **Demand Incentive Shift:** Priority for commercial vehicles (E-buses, E-trucks, E-3W).
2. **Charging Infrastructure:** Doubled allocation (₹3,000 crores). Target: 50,000 new public charging points.
3. **Domestic Value Addition (DVA):** Stricter requirements (55% for chargers).

---

## TECHNICAL DEEP-DIVE — BIDIRECTIONAL CONTROL COMPLEXITY

### CHALLENGE: MODE TRANSITION WITHOUT TRANSIENTS

When transitioning from charge mode to discharge mode, the DC bus voltage must be maintained without interruption. Edrift uses dual-loop control with feed-forward compensation to handle handoffs in < 50 ms.

### CHALLENGE: ANTI-ISLANDING DETECTION

The charger must detect grid disconnection within 2 seconds and stop inverting. Edrift implements a hybrid passive + active detection method with a shutdown time of < 200 ms.

---

## WE ARE HIRING — OPEN ENGINEERING POSITIONS

Edrift Electric is growing. We are looking for exceptional engineers in:
- **Power Electronics Design Engineer** (Bangalore, 3–6 years)
- **Magnetics Design Engineer** (Bangalore, 2–5 years)
- **Embedded Firmware Engineer** (Bangalore, 2–5 years)

[View All Open Positions →](/careers)
    `
  },
  {
    issueNumber: 12,
    title: "SiC Charger Efficiency Breakthroughs + New Design Tools",
    slug: "sic-charger-efficiency-breakthroughs-december-2024",
    date: "December 2024",
    subject: "⚡ Edrift Electric | December 2024 — SiC Charger Efficiency Breakthroughs + New Design Tools",
    preheader: "3 new case studies published | Free LLC Calculator launched | Year-end engineering insights from the Edrift team",
    excerpt: "3 new case studies published | Free LLC Calculator launched | Year-end engineering insights from the Edrift team",
    topics: ["Case Studies", "LLC Calculator", "Thermal", "Standards"],
    featuredImage: "/images/newsletter/sic-dec-2024.png",
    content: `
## FEATURED — NEW ENGINEERING CASE STUDIES

### CASE STUDY 1 — 3.3 kW SiC On-Board Charger
**"Designing a Compact 3.3 kW On-Board Charger Using SiC MOSFETs for a Two-Wheeler EV Platform"**
- 94.8% peak system efficiency
- 40% reduction in form factor vs IGBT
- Zero thermal failures in 6 months of field testing.

### CASE STUDY 2 — 22 kW Bidirectional DC-DC Retrofit
**"Retrofitting a 22 kW Bidirectional DC-DC Converter from IGBT to SiC: +3.8% Efficiency"**
- Peak efficiency: 92.3% → 96.1%
- Junction temperature at full load: 127°C → 77°C (−50°C)
- Shifted from active forced-air to passive natural convection.

### CASE STUDY 3 — Magnetics Design Optimization
**"LLC Resonant Transformer Redesign: 30% Core Volume Reduction"**
- Transformer core volume: −30%
- Leakage inductance variation: ±20% → ±3%

---

## TOOL LAUNCH — FREE LLC RESONANT CONVERTER CALCULATOR

We are excited to announce the launch of our LLC Resonant Converter Design Calculator — a free, open-access tool for power electronics engineers.

**What it does:**
- Calculates resonant tank parameters (Lr, Cr, Lm)
- Provides transformer turns ratio and gain curves
- Exports results as a downloadable PDF report

[Try the LLC Calculator →](/design-calculator/llc-resonant)

---

## TECHNICAL INSIGHT — WHY 96%+ EFFICIENCY MATTERS AT SCALE

3–4% efficiency improvement sounds incremental. But for a fleet of 10,000 vehicles, a gain from 91.5% to 95.8% efficiency results in:
- **Annual energy saving:** 589,755 kWh
- **Annual cost saving:** ₹41.3 lakhs
- **CO₂ reduction:** 483,799 kg — equivalent to removing 105 cars from the road.

---

## INDIA EV CHARGING STANDARDS — DECEMBER 2024 UPDATE

**AIS-138 PART 3 — WIRELESS CHARGING STANDARD PUBLISHED**
ARAI has published the final version covering wireless (inductive) charging systems up to 11 kW at 85 kHz.

**BIS CERTIFICATION TIMELINE IMPROVEMENTS**
The IS 17017 certification process has been streamlined from 8–12 months down to 5–8 months.

---

## LOOKING AHEAD — EDRIFT ELECTRIC ROADMAP 2025

- **Q1 2025:** 6.6 kW Bidirectional OBC with V2H capability.
- **Q2 2025:** 60 kW Modular DC Fast Charger (Liquid-cooled).
- **Q3 2025:** GaN-based Portable Charger (1.5 kW, <800g).
    `
  }
];
