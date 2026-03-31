import { BlogPost } from "@/types/content";

export const blogPosts: BlogPost[] = [
  {
    title: "SiC vs GaN: Why It Matters for EV OEM Efficiency",
    slug: "sic-vs-gan-power-electronics",
    date: "2026-03-31",
    category: "technical-guides",
    author: "Engineering Team",
    readingTime: "12 min",
    excerpt: "A deep-dive into wide-bandgap semiconductors and their impact on on-board charger efficiency, thermal management, and system-level cost of ownership for EV OEMs.",
    keywords: ["SiC power electronics", "GaN charger efficiency", "EV OEM specs"],
    featuredImage: "/images/blog/sic-gan.jpg",
    content: `
## Technical Comparison: Wide-Bandgap Semiconductors

As the EV industry transitions from 400V to 800V architectures, the choice between Silicon Carbide (SiC) and Gallium Nitride (GaN) has become a mission-critical decision for Tier-1 suppliers and OEMs.

### Efficiency Benchmarks
Our recent internal testing at eDrift Electric shows that SiC-based onboard chargers (OBC) consistently achieve peak efficiencies >98% in high-load scenarios (3.3kW to 11kW).

| Semiconductor | Switching Frequency | Heat Dissipation | Optimal Power Range |
|---------------|---------------------|-------------------|---------------------|
| Silicon (Si)  | Low                 | High              | < 1kW               |
| GaN           | Ultra-High          | Medium            | 1kW - 7kW           |
| SiC           | High                | Low               | 3kW - 50kW+         |

### OEM Cost Analysis
While SiC chips command a premium over traditional Si MOSFETs, the system-level ROI is clear:
1. **Magnetics**: Higher switching frequencies permit smaller inductors.
2. **Thermal**: Lower Rds(on) reduces heatsink volume by up to 35%.
3. **Packaging**: 30% reduction in total footprint for the OBC unit.

### Conclusion
For high-power OEM integration, SiC remains the dominant choice for reliability and thermal stability under mission-critical automotive loads.
    `
  },
  {
    title: "ASIL-D Compliance in EV Charging: What OEMs Need to Know",
    slug: "asil-d-compliance-guide",
    date: "2026-03-31",
    category: "oem-resources",
    author: "Compliance & Safety Dept",
    readingTime: "15 min",
    excerpt: "Functional safety is the most critical primitive in automotive power electronics. Learn how ASIL-D certification impacts your charging system validation.",
    keywords: ["ASIL-D automotive safety", "functional safety EV", "ISO 26262"],
    featuredImage: "/images/blog/asil-d.jpg",
    content: `
## Functional Safety: Beyond the Datasheet

Automotive Safety Integrity Level (ASIL) D represents the highest degree of automotive-grade risk management defined under ISO 26262.

### Why ASIL-D for Charging?
A failure in a high-voltage charging unit during operation doesn't just result in downtime—it can lead to catastrophic thermal events. ASIL-D ensures that:
- **Redundancy**: Dual-channel sensing for voltage and current.
- **Diagnostics**: Real-time hardware health checks every 10ms.
- **Fail-Safe**: Guaranteed safe-state transition in under 5ms.

### eDrift's Compliance Matrix
We design every on-board charger with a 10-year product reliability standard. Our validation pipeline includes environmental stress screening (ESS) and high-accelerated life testing (HALT) to meet global OEM standards.

### Certification Timeline
Most Tier-1 OEMs require a minimum 18-month lead time for full ASIL-D validation of a custom power unit. Partnering with eDrift reduces this cycle by leveraging our pre-validated core topologies.
    `
  },
  {
    title: "Thermal Management in Fast Charging: Engineering for Reliability",
    slug: "thermal-management-ev-charging",
    date: "2026-03-31",
    category: "technical-guides",
    author: "Thermal Systems Lead",
    readingTime: "10 min",
    excerpt: "Higher charging speeds demand 10x more thermal overhead. Learn how eDrift manages junction temperatures to prevent derating.",
    keywords: ["thermal management EV", "fast charging heat", "power electronics cooling"],
    featuredImage: "/images/blog/thermal.jpg",
    content: `
## Heat Dissipation: The Core Failure Primitive

While 98% efficiency sounds high, the 2% loss in an 11kW charger still generates 220W of concentrated waste heat.

### Cooling Strategies for OEMs
1. **Liquid Cooling**: Essential for >22kW systems, allowing high power density.
2. **Air Cooling**: Preferred for <7kW systems for cost and weight reduction.
3. **Advanced TIMs**: Using 10W/mK Thermal Interface Materials to bridge the gap between semiconductors and the cold plate.

### eDrift's Reliability Standards
We utilize computational fluid dynamics (CFD) at the design phase to ensure zero derating up to 55°C ambient.
    `
  },
  {
    title: "97.5% Efficiency Explained: Real-World Cost Savings",
    slug: "efficiency-benchmarking",
    date: "2026-03-31",
    category: "oem-resources",
    author: "Technical Sales Team",
    readingTime: "8 min",
    excerpt: "A 1.5% efficiency gain doesn't sound like much until you calculate the TCO over 1,000 vehicles and 10 years of service.",
    keywords: ["EV charger efficiency", "cost of ownership", "power loss reduction"],
    featuredImage: "/images/blog/efficiency.jpg",
    content: `
## The Economics of Efficiency

In the B2B electric mobility space, efficiency is a direct operational expense.

### ROI / TCO Model
For a fleet of 100 on-board chargers (11kW, 4 hours/day charging, 10 years):
A gain from 96% to 97.5% efficiency results in:
- **Total Energy Saved**: ~240,000 kWh
- **Operating Cost Reduction**: ~$36,000 (at $0.15/kWh)
- **Sustainability Impact**: 170 Tons of CO2 prevented.

### eDrift's Efficiency Advantage
By minimizing the switching loss in our MOSFETs, we achieve a flat efficiency curve even at partial load scenarios.
    `
  },
  {
    title: "Supply Chain Resilience in Power Electronics",
    slug: "supply-chain-resilience",
    date: "2026-03-31",
    category: "industry-insights",
    author: "Global Operations Manager",
    readingTime: "10 min",
    excerpt: "Semiconductor shortages taught us resilience. Here is eDrift's approach to securing SiC wafers and mission-critical components.",
    keywords: ["semiconductor supply chain", "SiC wafer sourcing", "supply security"],
    featuredImage: "/images/blog/supply-chain.jpg",
    content: `
## Security of Supply: A B2B Perspective

For OEMs, lead time is as important as technical spec.

### Our Resilience Strategy
1. **Multi-Source Chips**: Qualifying components from 3+ global vendors for every BOM.
2. **Local Manufacturing**: 70% of our supply chain is localized within the primary market.
3. **Strategic Stockpiling**: maintaining a 24-month horizon on long-lead items.

### Conclusion
We offer guaranteed delivery timelines and inventory transparency for our Tier-1 partners.
    `
  }
];
