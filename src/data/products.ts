export interface Product {
    id: string;
    name: string;
    subtitle: string;
    category: "Portable Charger" | "On-Board Charger" | "Din Rail Power Supply" | "Custom PSU";
    powerRating: "1-3 kW" | "3-6 kW" | "6-11 kW" | "11 kW+";
    inputType: "Single Phase" | "Three Phase" | "Wide Range";
    outputVoltage: "48 V" | "72 V" | "96 V" | "Custom";
    ipRating: "IP65" | "IP67" | "IP68";
    useCase: ("2W/3W" | "4W" | "Commercial Fleet" | "Industrial Automation")[];
    efficiency: string;
    topology: string;
    badges: ("In production" | "Customizable" | "Sample available")[];
    image: string;
    href: string;
  }
  
  export const products: Product[] = [
    {
      id: "ebc-33",
      name: "3.3kW On-Board Charger",
      subtitle: "Automotive-Grade SiC High-Efficiency Charging",
      category: "On-Board Charger",
      powerRating: "3-6 kW",
      inputType: "Single Phase",
      outputVoltage: "72 V",
      ipRating: "IP67",
      useCase: ["2W/3W", "4W"],
      efficiency: "95%+",
      topology: "Isolated LLC",
      badges: ["In production", "Customizable"],
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop",
      href: "/products/onboard-charger"
    },
    {
      id: "ebc-66",
      name: "6.6kW On-Board Charger",
      subtitle: "Ultra-Compact Liquid Cooled Solution",
      category: "On-Board Charger",
      powerRating: "6-11 kW",
      inputType: "Three Phase",
      outputVoltage: "96 V",
      ipRating: "IP68",
      useCase: ["4W", "Commercial Fleet"],
      efficiency: "96%",
      topology: "ZVS Full Bridge",
      badges: ["In production", "Sample available"],
      image: "https://images.unsplash.com/photo-1620218173997-442402f114a2?q=80&w=800&h=600&auto=format&fit=crop",
      href: "/products/onboard-charger-66"
    },
    {
      id: "epc-22",
      name: "2.2kW Portable Charger",
      subtitle: "Premium Plug-and-Play EVSE",
      category: "Portable Charger",
      powerRating: "1-3 kW",
      inputType: "Single Phase",
      outputVoltage: "48 V",
      ipRating: "IP65",
      useCase: ["2W/3W"],
      efficiency: "93%",
      topology: "PFC + LLC",
      badges: ["In production"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop",
      href: "/products/portable-charger"
    },
    {
      id: "dr-psu-48",
      name: "Industrial Din Rail PSU",
      subtitle: "High-Efficiency Control Cabinet Power",
      category: "Din Rail Power Supply",
      powerRating: "1-3 kW",
      inputType: "Wide Range",
      outputVoltage: "48 V",
      ipRating: "IP65",
      useCase: ["Industrial Automation"],
      efficiency: "94%",
      topology: "Isolated DC-DC",
      badges: ["Customizable", "Sample available"],
      image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?q=80&w=800&h=600&auto=format&fit=crop",
      href: "/products/din-rail-psu"
    },
    {
      id: "custom-psu-1",
      name: "Custom Fleet PSU",
      subtitle: "Tailored Power Solutions for OEMs",
      category: "Custom PSU",
      powerRating: "11 kW+",
      inputType: "Three Phase",
      outputVoltage: "Custom",
      ipRating: "IP67",
      useCase: ["Commercial Fleet", "Industrial Automation"],
      efficiency: "97%",
      topology: "Interleaved PFC",
      badges: ["Customizable"],
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&h=600&auto=format&fit=crop",
      href: "/products/custom-psu"
    }
  ];
