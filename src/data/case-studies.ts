import { CaseStudy } from "@/types/content";

export const caseStudies: CaseStudy[] = [
  {
    title: "Tier-1 OEM: 3.3kW On-Board Charger Integration",
    slug: "tier1-oem-obc-integration",
    industry: "Automotive OEM",
    challenge: "A leading Indian EV manufacturer needed a compact, automotive-grade 3.3kW OBC that could meet stringent ASIL-D diagnostic requirements while fitting into a highly constrained chassis space.",
    solution: "eDrift provided a custom-tailored version of the eBC-33 series, utilizing SiC MOSFETs to achieve a 25% reduction in volume and 30% reduction in thermal signature, while implementing full CAN-based diagnostics.",
    resultSummary: "The OEM successfully achieved full vehicle-level ASIL-D validation 3 months ahead of schedule, with a measurable 1.2% gain in city-cycle range efficiency.",
    metrics: [
      { label: "Range Efficiency", before: "94.2%", after: "95.5%", improvement: "+1.3%" },
      { label: "Thermal Failure Rate", before: "0.4%", after: "0.05%", improvement: "-87%" },
      { label: "Validation Time", before: "18 months", after: "15 months", improvement: "-16%" }
    ],
    testimonial: {
      quote: "eDrift's engineering depth in power electronics allowed us to hit our weight targets without compromising on charging speeds. Their ASIL-D ready platform is a game-changer for regional OEMs.",
      author: "Chief Technical Officer",
      role: "Tier-1 EV Manufacturer"
    },
    timeline: [
      { month: "Month 1-2", task: "Requirements engineering & custom topology design" },
      { month: "Month 3", task: "A-Sample prototyping & thermal stress testing" },
      { month: "Month 4", task: "B-Sample automotive validation & EMI compliance" },
      { month: "Month 5", task: "Production ramp & SOP (Start of Production)" }
    ]
  },
  {
    title: "Fleet Operator: DC Fast Charging Efficiency Gains",
    slug: "fleet-operator-dc-charging",
    industry: "Commercial Logistics",
    challenge: "A major commercial fleet operator was seeing 8% power loss in their legacy charging infrastructure, leading to unsustainable operational costs across a 1,000-vehicle hub.",
    solution: "We deployed a modular 50kW+ DC Fast Charging network utilizing eDrift's interleaved PFC controllers and specialized cooling, specifically optimized for high-utilization logistics environments.",
    resultSummary: "The transition to eDrift hardware reduced energy waste by 40%, resulting in a direct payback period of under 14 months based on energy savings alone.",
    metrics: [
      { label: "Energy Loss", before: "8.2%", after: "4.8%", improvement: "-41%" },
      { label: "Operational Downtime", before: "12 hrs/mo", after: "1.5 hrs/mo", improvement: "-87%" },
      { label: "TCO Reduction", before: "$1.2M", after: "$0.85M", improvement: "-29%" }
    ],
    testimonial: {
      quote: "Reliability is the only metric that matters for fleet operations. eDrift's hardware hasn't just saved us money on power; it has increased our vehicle uptime significantly.",
      author: "Director of Operations",
      role: "National Logistics Fleet"
    },
    timeline: [
      { month: "Month 1", task: "Site audit & legacy loss analysis" },
      { month: "Month 2", task: "Pilot deployment of 5 modular units" },
      { month: "Month 3-4", task: "Full network swap & smart dashboard integration" }
    ]
  },
  {
    title: "Regional Utility: Solar-Charging DC Microgrid",
    slug: "utility-solar-charging",
    industry: "Renewable Infrastructure",
    challenge: "A smart city project required a 48V/96V DC microgrid interface capable of bi-directional power flow with 98.2% efficiency from a solar-fed DC bus.",
    solution: "eDrift engineered a specialized isolated DC-DC topology with interleaved phase control to manage variable solar inputs and high-voltage vehicle charging.",
    resultSummary: "The project achieved zero-energy-loss goals for the transit hub, with eDrift's custom PSU serving as the master power controller for the entire site.",
    metrics: [
      { label: "Solar Conversion", before: "92.5%", after: "98.2%", improvement: "+5.7%" },
      { label: "Harmonic Distortion", before: "4.2%", after: "0.8%", improvement: "-81%" },
      { label: "Energy OpEx", before: "$22k/mo", after: "$4k/mo", improvement: "-82%" }
    ],
    testimonial: {
      quote: "The ability to customize the inner control loops of eDrift's power supply allowed us to integrate into a legacy microgrid that other suppliers found impossible to interface with.",
      author: "Infrastructure Lead",
      role: "Smart City Development"
    },
    timeline: [
      { month: "Month 1-3", task: "Simulation & microgrid topology alignment" },
      { month: "Month 4-6", task: "Custom hardware engineering & outdoor field testing" },
      { month: "Month 7", task: "Full deployment & network-level load balancing" }
    ]
  }
];
