import { BlogPost } from "@/types/content";

export const blogPosts: BlogPost[] = [
  {
    title: "SiC vs IGBT in EV Chargers: A Complete Engineering Comparison",
    slug: "sic-vs-igbt-engineering-comparison",
    date: "2025-07-15",
    category: "technical-guides",
    author: "Edrift Engineering Team",
    readingTime: "12 min",
    excerpt: "Why the switch from Silicon IGBT to Silicon Carbide MOSFET is not just an upgrade — it is a fundamental shift in how EV charging systems are designed, sized, and deployed.",
    keywords: ["SiC MOSFET", "IGBT comparison", "EV charger design", "power electronics"],
    featuredImage: "/images/blog/sic-vs-igbt.png",
    content: `
## The Physics — Why SiC Is Fundamentally Different

The performance advantages of SiC over silicon are not a matter of better manufacturing. They come from the intrinsic material properties of silicon carbide.

### Material Properties Comparison

| Property | Silicon (Si) | SiC (4H-SiC) | Advantage Factor |
|----------|--------------|--------------|------------------|
| Bandgap (eV) | 1.12 | 3.26 | 2.9× |
| Breakdown field (MV/cm) | 0.3 | 3.0 | 10× |
| Electron mobility cm²/Vs | 1400 | 950 | 0.68× |
| Thermal conductivity (W/cm·K) | 1.5 | 3.7 | 2.5× |
| Saturation velocity (cm/s) | 1.0×10⁷ | 2.0×10⁷ | 2× |
| Max operating temp (°C) | 150 | 200+ | 1.3× |

### The Key Numbers That Matter for EV Chargers

1. **BREAKDOWN FIELD — 10× HIGHER**: Silicon breaks down at 0.3 MV/cm. SiC breaks down at 3.0 MV/cm. This means a SiC device can support the same voltage as a silicon device using a drift region that is 10× thinner. A thinner drift region means dramatically lower on-state resistance (Rdson).

2. **THERMAL CONDUCTIVITY — 2.5× HIGHER**: SiC conducts heat 2.5× better than silicon. This means the junction-to-case thermal resistance of a SiC device is significantly lower — heat generated at the junction escapes to the case faster.

3. **HIGHER OPERATING TEMPERATURE**: SiC is rated to 200°C+ junction temperature. Silicon IGBTs are typically rated to 150–175°C.

## Loss Mechanisms — Where the Difference Actually Shows Up

In an EV charger, semiconductor losses come from two primary mechanisms: conduction losses and switching losses.

### Conduction Losses

For an IGBT, conduction loss is determined by: $P_{cond} = I_c \times V_{ce(sat)}$.
For a SiC MOSFET, conduction loss is: $P_{cond} = I_d^2 \times R_{dson}$.

At typical EV charger operating currents (20–100A), the IGBT $V_{ce(sat)}$ is approximately 1.8–2.2V regardless of current. The SiC MOSFET Rdson creates a loss that scales with the square of current. At light loads, the SiC advantage is even more pronounced.

### Switching Losses

This is where SiC truly separates from IGBT.

| Loss Type | IGBT | SiC MOSFET |
|-----------|------|------------|
| Eon | 1.8 mJ | 0.22 mJ |
| Eoff | 2.1 mJ | 0.18 mJ |
| Err (diode) | 1.2 mJ | 0.02 mJ |
| **Total / cycle** | **5.1 mJ** | **0.42 mJ** |
| **At 100 kHz** | **510 W** | **42 W** |

At 100 kHz switching frequency, the difference is 510W vs 42W of switching loss per device.

## Design Implications for EV Chargers

1. **Higher Switching Frequency**: SiC MOSFETs can switch at 100–300 kHz without switching losses dominating the thermal budget. This reduces inductor and transformer volume by 5-10x.
2. **Passive Cooling**: At 3.3 kW output, SiC losses (~80-110W) can be managed with passive heatsinks, eliminating failure-prone cooling fans.
3. **Higher Efficiency at Partial Load**: SiC designs maintain >92% efficiency even at 10-20% load, critical for the CV phase of battery charging.
4. **Bidirectional Operation**: SiC body diodes have near-zero reverse recovery, making them ideal for V2G and V2H applications.

## Conclusion

SiC MOSFETs fundamentally change what is achievable in terms of efficiency, power density, and thermal management. At Edrift Electric, every charger we design is built on SiC or GaN power stages because the physics and engineering numbers demand it.
    `
  },
  {
    title: "LLC Resonant Converter Design: A Step-by-Step Engineering Guide",
    slug: "llc-resonant-converter-design-guide",
    date: "2025-08-20",
    category: "technical-guides",
    author: "Edrift Engineering Team",
    readingTime: "15 min",
    excerpt: "The LLC resonant converter is the dominant isolated DC-DC topology in modern on-board chargers. Here is exactly how to design one from first principles.",
    keywords: ["LLC converter", "resonant tank", "transformer design", "ZVS", "OBC"],
    featuredImage: "/images/blog/llc-design.png",
    content: `
## LLC Topology — What It Is and Why It Works

LLC stands for the three reactive elements in the resonant tank: Two Inductors (L) and one Capacitor (C).

### The Two Resonant Frequencies

1. **fr1 (series resonance)**: $f_{r1} = \frac{1}{2\pi\sqrt{L_r C_r}}$
2. **fr2 (parallel resonance)**: $f_{r2} = f_{r1} \sqrt{\frac{L_r}{L_r + L_m}}$

The LLC converter achieves Zero Voltage Switching (ZVS) on primary switches across the entire load range, which is its most important advantage over phase-shifted full bridge topologies.

## Step 1 — Define Your Design Specifications (3.3 kW Example)

| Parameter | Value |
|-----------|-------|
| Input voltage (nom) | 400V DC |
| Output voltage (max) | 58.8V DC |
| Output current (max) | 56A |
| Rated Power | 3,300W |
| Target Frequency | 150 kHz |

## Step 2 — Calculate the Transformer Turns Ratio

$n = \frac{V_{in(nom)}}{2 \times (V_{out} + V_{diode})} = \frac{400}{2 \times (58.8 + 0.6)} \approx 3.37$
Practical ratio selected: **3.4 : 1**

## Step 3 — Design the Resonant Tank

Using an inductance ratio $m = 4$ and quality factor $Q = 0.35$:
- **Characteristic Impedance (Zo)**: 4.24 Ω
- **Series Inductance (Lr)**: 4.5 μH
- **Resonant Capacitance (Cr)**: 235 nF
- **Magnetising Inductance (Lm)**: 18 μH

## Step 4 — Transformer Design

At 154.5 kHz, an **EE55/28/21 core (N87 ferrite)** is selected.
- **Primary Turns**: 22
- **Secondary Turns**: 7
- **Wire**: Litz wire (250-strand 0.1mm for primary, 500-strand for secondary)

## Summary

The LLC design process involves iteration. Your first pass parameters rarely survive contact with real component values and gain verification. Use our Design Calculator to automate these calculations.
    `
  },
  {
    title: "Thermal Management in EV Chargers: From Junction to Ambient",
    slug: "thermal-management-engineering-guide",
    date: "2025-09-10",
    category: "technical-guides",
    author: "Edrift Engineering Team",
    readingTime: "11 min",
    excerpt: "Thermal design is not an afterthought in EV charger development. It is the constraint that shapes every other design decision.",
    keywords: ["thermal management", "heat dissipation", "TIM", "heatsink sizing", "reliability"],
    featuredImage: "/images/blog/thermal-mgmt.png",
    content: `
## Understanding the Thermal Chain

Heat generated in a semiconductor device must travel from the junction to the ambient environment. Every interface has a thermal resistance.

$T_j = T_a + P \times (R_{\theta jc} + R_{\theta cs} + R_{\theta sa})$

Where:
- **Tj**: Junction temperature
- **Ta**: Ambient temperature
- **P**: Power dissipated
- **Rθjc**: Junction-to-case resistance
- **Rθcs**: Case-to-heatsink resistance
- **Rθsa**: Heatsink-to-ambient resistance

## Calculating Power Dissipation

### MOSFET Losses
$P_{total} = P_{cond} + P_{sw} = (I_{rms}^2 \times R_{dson(Tj)}) + ((E_{on} + E_{off}) \times f_{sw})$

Critical: Always use Rdson at operating junction temperature (e.g., 150°C), not the 25°C datasheet value. SiC Rdson can increase 2–3× over this range.

## Thermal Interface Materials (TIM)

| TIM Type | Thermal Cond. (W/m·K) | Typical Use |
|----------|-----------------------|-------------|
| Thermal grease | 3–8 | Prototyping |
| Thermal pad | 1–6 | Volume production |
| Phase change | 3–7 | Premium applications |
| Bergquist GP3000 | 3.0 | Recommended for EV |

## Heatsink Sizing

For passive cooling (natural convection), the heatsink must handle the total system loss (e.g., 151W for a 3.3 kW OBC). This often requires a machined aluminium cold plate or a large extruded fin structure integrated into the enclosure.

## Key Takeaways

1. Calculate dissipation for EVERY component.
2. Use operating Tj for calculations.
3. Target $T_j < 125^\circ C$ at $60^\circ C$ ambient for reliability in harsh climates.
4. Validate with thermal imaging of the first prototype.
    `
  },
  {
    title: "GaN vs SiC: Which Semiconductor for Which EV Application?",
    slug: "gan-vs-sic-semiconductor-selection",
    date: "2025-10-05",
    category: "technical-guides",
    author: "Edrift Engineering Team",
    readingTime: "10 min",
    excerpt: "Both GaN and SiC outperform silicon in power electronics. But they are not interchangeable. Here is a precise engineering framework for choosing between them.",
    keywords: ["GaN", "SiC", "semiconductor comparison", "efficiency", "OBC", "fast charger"],
    featuredImage: "/images/blog/gan-vs-sic.png",
    content: `
## Material Properties Comparison

| Property | Silicon | SiC | GaN |
|----------|---------|-----|-----|
| Bandgap (eV) | 1.12 | 3.26 | 3.44 |
| Breakdown field (MV/cm) | 0.3 | 3.0 | 3.3 |
| Electron mobility (cm²/V·s) | 1400 | 950 | 2000 |
| Thermal conductivity (W/cm·K) | 1.5 | 3.7 | 1.3 |

**Key Insight**: GaN has higher electron mobility (lower Rdson), but SiC has much higher thermal conductivity. This makes SiC better for high-power density and high-temperature applications.

## Application Selection Framework

### By Voltage
- **< 200V**: GaN wins clearly.
- **200V – 400V**: GaN competitive, but SiC thermal advantage starts showing.
- **400V – 1200V**: SiC wins (GaN limited to 650V in mainstream).

### By Power Level
- **< 1 kW**: GaN preferred (low dissipation).
- **1 kW – 7 kW**: Both viable. GaN for PFC, SiC for DC-DC.
- **> 22 kW**: SiC dominates due to thermal requirements and paralleling maturity.

## Decision Table: EV Charging Applications

| Application | GaN | SiC |
|-------------|-----|-----|
| Totem-pole PFC | Preferred | Viable |
| 3.3 kW OBC DC-DC | Viable | Preferred |
| 22 kW Bidirectional | Not Recommended | Preferred |
| 60 kW DC Fast Charger | Not Recommended | Preferred |
| Wireless Charging Pad | Preferred | Not Recommended |

## The Edrift Approach: Hybrid Design

We extract optimal performance by using **GaN for the totem-pole PFC stage** (high frequency, zero recovery) and **SiC for the isolated DC-DC stage** (bidirectional body diode, thermal advantage). This achieves >96% system efficiency.
    `
  },
  {
    title: "Planar Transformer Design for High-Frequency EV Chargers",
    slug: "planar-transformer-design-guide",
    date: "2025-11-12",
    category: "technical-guides",
    author: "Edrift Engineering Team",
    readingTime: "13 min",
    excerpt: "Planar magnetics are becoming the standard for compact, high-frequency EV charger designs. Advantages, trade-offs, and design rules.",
    keywords: ["planar transformer", "magnetics design", "PCB winding", "interleaving", "LLC"],
    featuredImage: "/images/blog/planar-transformer.png",
    content: `
## What Makes a Transformer "Planar"?

A planar transformer replaces traditional wound bobbins with flat copper conductors (PCB traces or flat copper foil).

1. **PCB Integrated**: Windings are traces on a multi-layer PCB.
2. **Copper Foil**: Flat foil conductors wound in planar configuration.
3. **Hybrid**: PCB primary + heavy foil secondary (optimal for high-current).

## Advantages Over Wound Magnetics

- **Low Profile**: Reduces height from 60-80mm to 10-18mm.
- **Consistent Leakage Inductance**: Controlled to ±3–5% in production, vs ±20–30% for wound.
- **Thermal Performance**: Flat geometry allows excellent coupling to heatsinks (3–8°C/W).
- **EMI**: Interleaved structure contains flux better, reducing interference.

## Winding Design and Interleaving

Interleaving is the most critical design decision. It determines AC winding loss.

- **Non-interleaved**: Rac/Rdc factor of 3–8 at 150 kHz.
- **Fully Interleaved**: Rac/Rdc factor of 1.1–1.4 at 150 kHz.

## Design Rules Summary

1. Use planar-specific cores (EQ, EL, ER).
2. Always interleave windings to minimize proximity effects.
3. Specify heavy copper (2-3 oz for primary, foil for high-current secondary).
4. Use 3C95 or N87 ferrite for 100-300 kHz.
5. Validate parameters with an impedance analyzer on the first prototype.
    `
  },
  {
    title: "AIS-138 Explained: What EV Charger Engineers Need to Know",
    slug: "ais-138-india-ev-standards-guide",
    date: "2025-12-05",
    category: "industry-insights",
    author: "Edrift Engineering Team",
    readingTime: "9 min",
    excerpt: "AIS-138 is India's primary technical standard for EV charging equipment. Here is what the standard requires, explained in engineering terms.",
    keywords: ["AIS-138", "India EV standards", "ARAI", "BIS certification", "Bharat AC001"],
    featuredImage: "/images/blog/ais-138.png",
    content: `
## Scope of AIS-138

AIS-138 covers electric vehicle conductive charging systems in India. It is closely aligned with IEC 61851-1 but includes India-specific requirements for grid conditions and climate.

## Key Electrical Requirements

### Supply Voltage Tolerance
India's grid fluctuates significantly. AIS-138 requires operation across:
- **Single phase**: 180V AC – 260V AC
- **Three phase**: 300V AC – 460V AC

### Dielectric Strength (Hipot)
For a 230V AC charger, the standard specifies **2,000V AC for 1 minute** between live parts and protective earth. DC chargers require 4,000V AC isolation between input and output.

## Safety Mandates

- **IP Rating**: IP55 minimum for outdoor installations; IP67 for portable chargers.
- **Ground Fault**: RCD must detect and interrupt faults < 30 mA within 40 ms.
- **Connectors**: Type 2 for 4W AC; Bharat AC001/DC001 for public infra.

## Communication Protocols

For DC fast chargers (AIS-138 Part 2):
- **CCS2**: ISO 15118 + IEC 61851-23 (PLC communication).
- **Control Pilot (CP)**: 1 kHz PWM signal communicating max available current.

## Certification Process

1. **Pre-compliance**: Internal safety and functional tests.
2. **Submission**: To NABL labs like ARAI (Pune) or ICAT (Manesar).
3. **BIS License**: Submit test reports for IS 17017 license.

**Timeline**: Expect 6–9 months from prototype freeze to full BIS certification.
    `
  }
];
