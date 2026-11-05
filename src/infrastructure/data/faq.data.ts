export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFAQs: FAQItem[] = [
  {
    question: "What industrial hydraulic brands does Ambica Engineers stock and distribute?",
    answer: "Ambica Engineers & Lubricants Ltd is a direct stocking distributor and sourcing partner for premier fluid power manufacturers, including Bosch Rexroth (Germany), Polyhydron (India), Nachi-Fujikoshi (Japan), Huade Hydraulic (China/Germany JV), Voith Turbo (Germany), and Veljan Hydrair (India). We maintain ready inventory of axial piston pumps, radial piston pumps, internal gear pumps, vane pumps, and directional control valves."
  },
  {
    question: "Are all components supplied by Ambica Engineers 100% genuine OEM parts?",
    answer: "Yes. Every hydraulic pump, motor, valve, cartridge, and seal kit supplied is 100% genuine OEM material. Components are delivered with authentic manufacturer nameplates, serial number traceability, and factory pressure bench test certificates of conformance."
  },
  {
    question: "How quickly can emergency replacement hydraulic pumps and spares be dispatched?",
    answer: "For critical factory breakdown situations, in-stock components from our central hubs in Delhi-NCR (Noida) and Ahmedabad ship via express air cargo or dedicated surface transport within 4 to 24 hours across India, minimizing downtime for high-volume manufacturing lines."
  },
  {
    question: "What are European cushion pads and why are they used in laminate hot presses?",
    answer: "European cushion pads are engineered composite layers of high-temperature silicone rubber and twilled copper wire mesh. Installed inside short-cycle hot presses between the heating platen and the textured press plate, they compensate for platen thickness variations, buffer clamping tonnages, eliminate thermal cold spots, and extend press plate service life."
  },
  {
    question: "Can Ambica Engineers provide engineering sizing and replacement for obsolete pumps?",
    answer: "Yes. Our technical fluid power engineers assist clients with displacement calculation, mounting flange cross-referencing (SAE / ISO / DIN), and drop-in retrofits for legacy or discontinued pump models across Rexroth, Vickers, Nachi, and Polyhydron installations."
  },
  {
    question: "How do I request a formal quotation or submit a Bill of Materials (RFQ)?",
    answer: "You can assemble components into our digital RFQ Schedule directly from our online catalog and submit your Bill of Materials, or contact our engineering dispatch desk directly via phone (+91 7600025020), email (sales@ambicaengineers.in), or instant WhatsApp for fast commercial proforma pricing in INR, USD, or EUR."
  }
];

export const cushionPadFAQs: FAQItem[] = [
  {
    question: "Where are cushion pads installed in a short-cycle hot press?",
    answer: "Cushion pads are installed directly between the heating platen and the stainless steel textured press plate (top and bottom). They act as a thermal and mechanical buffer, ensuring even pressure distribution across the entire surface of the wood panel or laminate board."
  },
  {
    question: "What is the technical construction of European silicone & copper cushion pads?",
    answer: "Our European cushion pads combine high-resilience heat-resistant silicone elastomer with woven multi-strand twilled copper wire mesh. The copper wire matrix ensures rapid, uniform thermal conductivity (>180 W/m·K) from the hot platen to the press plate, while the silicone buffers peak closing pressure spikes up to 220°C."
  },
  {
    question: "How do cushion pads extend the lifespan of stainless steel press plates?",
    answer: "Without cushion pads, micro-irregularities in the press platen create concentrated pressure hotspots, causing premature plate warping, localized micro-cracks, and uneven gloss levels. Cushion pads absorb mechanical shocks and distribute tonnages evenly, doubling or tripling press plate working lifespan."
  },
  {
    question: "What standard thicknesses, widths, and roll dimensions are available?",
    answer: "We supply standard press widths including 4x8 ft (1350 mm), 5x10 ft (1600 mm), and custom continuous master rolls up to 2800 mm wide. Standard thicknesses range from 1.5 mm to 2.5 mm, tailored to specific press closing cycles and temperature profiles."
  },
  {
    question: "How often should hot press cushion pads be inspected and replaced?",
    answer: "Depending on pressing cycles, temperature, and clamping pressure, cushion pads typically operate efficiently for 30,000 to 80,000 pressing cycles. Routine inspection should check for copper wire breakage, silicone hardening, or thickness reduction beyond 15% of original gauge."
  },
  {
    question: "Do Ambica cushion pads prevent telegraphing and surface gloss defects?",
    answer: "Yes. By maintaining perfectly uniform temperature and pressure across the board during the resin curing phase (melamine / phenolic impregnation), our cushion pads prevent white spots, under-cured resin patches, and surface gloss inconsistencies."
  }
];

export const brandFAQs: Record<string, FAQItem[]> = {
  rexroth: [
    {
      question: "Are Bosch Rexroth hydraulic pumps supplied by Ambica Engineers authentic?",
      answer: "Yes. Ambica Engineers & Lubricants Ltd supplies 100% authentic Bosch Rexroth components sourced directly with original manufacturer warranty, serial number verification, and factory test conformity."
    },
    {
      question: "Which Bosch Rexroth pump series are readily stocked in India?",
      answer: "We maintain ready stock of A10VSO (Series 31, 32, 52), A4VSO heavy-duty series (Series 10, 30), A7VO bent-axis pumps, and A6VM / A2FE bent-axis hydraulic motors for immediate dispatch."
    },
    {
      question: "Can you cross-reference and replace obsolete Rexroth model codes?",
      answer: "Yes. Our fluid power engineers regularly cross-reference older Rexroth part codes (such as legacy series 28 or 30) to current Series 31 or 32 equivalents, verifying shaft splines, port threads, and control block configurations."
    },
    {
      question: "What operating pressures do Bosch Rexroth axial piston pumps support?",
      answer: "Bosch Rexroth A10VSO pumps support continuous pressures up to 280 bar with peak pressure ratings of 350 bar. The heavy-duty A4VSO series operates continuously up to 350 bar with intermittent pressure peaks of 400 bar."
    }
  ],
  polyhydron: [
    {
      question: "What makes Polyhydron radial piston pumps ideal for hydraulic presses?",
      answer: "Polyhydron 1R and 2R radial piston pumps feature valve-controlled, fixed displacement multi-piston elements capable of continuous working pressures up to 500 bar. Independent suction and delivery check valves deliver exceptional volumetric efficiency and dirt tolerance."
    },
    {
      question: "What Polyhydron valves and accessories does Ambica Engineers supply?",
      answer: "We stock the complete Polyhydron range, including pilot operated check valves, pressure relief valves, pressure reducing valves, throttle valves, pre-fill valves, and modular cartridge logic systems."
    },
    {
      question: "Are replacement piston assemblies and check valve seals available?",
      answer: "Yes. We maintain complete genuine Polyhydron repair kits, replacement piston-cylinder pumping elements, eccentric shaft bearings, and high-pressure seal kits for routine field servicing."
    }
  ],
  nachi: [
    {
      question: "What are the advantages of Nachi PVS and PZS variable piston pumps?",
      answer: "Nachi PVS and PZS series pumps feature patented semi-cylindrical swashplate supports and dual pressure balance plates that reduce operating noise to whisper-quiet levels while eliminating pressure pulsation by up to 50%."
    },
    {
      question: "Why are Nachi wet-type solenoid directional valves (SS-G01 and SA-G03) widely preferred?",
      answer: "Nachi wet-armature solenoid valves immerse the moving core in hydraulic oil, ensuring smooth, sparkless shifting, vibration dampening, and extraordinary service life exceeding 30 million cycles without external leakage."
    },
    {
      question: "What voltages are available for Nachi directional valve coils?",
      answer: "Standard stocked coils include 24V DC, 110V AC, and 220V AC with DIN 43650 connector plugs and optional surge suppression diodes."
    }
  ],
  huade: [
    {
      question: "What are the features and pressure ratings of the Huade YCY piston pump?",
      answer: "The Huade YCY14-1B series is a pressure-compensated variable displacement axial piston pump rated for 315 bar nominal and 400 bar peak pressure. It automatically trims flow to zero-stroke once system pressure reaches the preset limit, significantly reducing hydraulic power draw and heat generation during pressure holding cycles in presses."
    },
    {
      question: "What is Huade Hydraulic's manufacturing background and quality standard?",
      answer: "Huade Hydraulic was established through a joint technical cooperation introducing German licensed precision manufacturing technology and machining equipment. Huade components offer interchangeable mounting with European DIN/ISO standards at competitive industrial pricing."
    },
    {
      question: "How does the Huade HD-A8V variable double pump work?",
      answer: "The HD-A8V features two independent axial piston pumping units in a single housing with integrated total horsepower summation control, dynamically balancing flow between two hydraulic circuits without overloading the prime mover."
    },
    {
      question: "Are Huade directional valves drop-in replacements for standard CETOP valves?",
      answer: "Yes. Huade directional control valves comply precisely with ISO 4401 and CETOP 3 (NG6) and CETOP 5 (NG10) mounting standards, making them direct replacements on standard industrial manifold blocks."
    }
  ],
  voith: [
    {
      question: "Why choose Voith Turbo internal gear pumps for industrial machinery?",
      answer: "Voith IPV and IPH high-pressure internal gear pumps feature radial and axial sealing compensation, delivering near-zero pressure ripple (< 2%), exceptionally low acoustic noise levels (< 65 dBA), and high volumetric efficiency under continuous pressures up to 330 bar."
    },
    {
      question: "Can Voith internal gear pumps be used in variable-speed servo drive systems?",
      answer: "Yes. Voith internal gear pumps are engineered with low rotational inertia and high starting torque, making them ideal for modern energy-saving variable speed servo pump drives (VFD hydraulic power packs)."
    }
  ],
  veljan: [
    {
      question: "What are the features of Veljan / Sarva industrial vane pumps?",
      answer: "Veljan T6 and T7 series industrial vane pumps feature heavy-duty bimetal cam rings and dual-lip vanes capable of operating up to 320 bar peak pressure with high dirt tolerance and quiet factory operation."
    },
    {
      question: "Are replacement vane cartridge kits available for rapid servicing?",
      answer: "Yes. Veljan vane pumps utilize drop-in cartridge assemblies, allowing complete displacement alteration or pump rebuilds in under 15 minutes without disconnecting hydraulic suction or pressure lines."
    }
  ]
};
