import { Product } from '../../domain/entities/Product';

export const productsData: Product[] = [
  // -------------------------------------------------------------
  // WOOD PANEL SOLUTIONS & CUSHION PADS
  // -------------------------------------------------------------
  {
    id: 'prod-cushion-pad-silicon-copper',
    slug: 'cushion-pad-silicon-copper',
    name: 'European Quality Silicon & Twilled Copper Cushion Pad',
    series: 'Ambica European Spec CP-Series',
    brand: 'ambica',
    category: 'cushion-pads',
    shortDescription: 'European quality silicone and twilled bunched copper cushion pads for short cycle hot press machines in laminate, MDF, and particle board manufacturing.',
    fullDescription: 'Our Cushion Pads are manufactured using premium European Quality Silicon and twilled bunched copper wire. Specifically designed for short cycle hot press lines, they are positioned between the hot platen and the press plate to buffer high hydraulic pressure and achieve uniform heat conductivity. This ensures flawless surface lamination, prevents plate warping, eliminates hot-spot defects, and significantly extends the service life of press platens.',
    imageUrl: '/images/products/cushion-pad-mesh.jpg',
    keyFeatures: [
      'Imported heat-resistant European silicone elastomer core',
      'High-grade twilled bunched copper weave for rapid, uniform heat conduction',
      'Exceptional compression elasticity and recovery under high cycling pressure',
      'Significantly prolongs the lifespan of stainless steel press plates',
      'Suitable for both domestic and imported short cycle hot press machinery',
      'Withstands continuous press temperatures up to 220°C'
    ],
    specifications: [
      { key: 'Material Composition', value: 'High-Purity Twilled Copper Wire + Heat-Resistant Silicone' },
      { key: 'Operating Temperature Max', value: '220', unit: '°C' },
      { key: 'Standard Thicknesses', value: '1.5mm, 2.0mm, 2.5mm, 3.0mm, 3.5mm' },
      { key: 'Standard Dimensions', value: 'Custom cut up to 4x8 ft, 6x9 ft, 7x14 ft or continuous rolls' },
      { key: 'Thermal Conductivity', value: '> 180', unit: 'W/m·K' },
      { key: 'Application Machine', value: 'Short Cycle Hot Press, Melamine Press, Multi-Opening Press' }
    ],
    applications: [
      'Short Cycle Melamine Paper Lamination',
      'MDF & HDF Board Surface Pressing',
      'Particle Board & HDHMR Flooring Production',
      'Compact & High-Pressure Laminates (HPL)'
    ],
    isFeatured: true
  },
  {
    id: 'prod-continuous-processing-line',
    slug: 'continuous-production-processing-line',
    name: 'Continuous Production & Processing Line for MDF & Particle Board',
    series: 'Ambica-Aminova Continuous Series',
    brand: 'ambica',
    category: 'wood-panel-solutions',
    shortDescription: 'Integrated high-capacity continuous production line with automated conveying, mat forming, pre-pressing, and finishing for MDF, HDHMR, and Particle Board plants.',
    fullDescription: 'The Continuous Production & Processing Line is engineered for high-capacity industrial wood panel manufacturing. Equipped with advanced conveying, computerized mat thickness regulation, cross-cutting saws, and precision hydraulic cooling/handling systems, it guarantees seamless material throughput. Designed in collaboration with global partners, the system minimizes plant downtime, optimizes resin consumption, and delivers dimensional accuracy conforming to international particle board standards.',
    imageUrl: '/images/products/continuous-line-machinery.jpg',
    keyFeatures: [
      'Fully automated PLC/SCADA controlled continuous mat forming and transfer',
      'Precision mat scalper and density control modules',
      'Integrated hydraulic pre-press with automated de-aeration zones',
      'Heavy-duty cooling turner and cut-to-size automated trimming lines',
      'Energy-efficient servo-driven motion and synchronized variable conveyor speeds'
    ],
    specifications: [
      { key: 'Board Type Supported', value: 'MDF, HDF, HDHMR, Particle Board (PB)' },
      { key: 'Board Thickness Range', value: '2mm - 35mm' },
      { key: 'Production Capacity', value: 'Up to 600', unit: 'm³/day' },
      { key: 'Line Speed', value: 'Up to 1200', unit: 'mm/s' },
      { key: 'Automation System', value: 'Siemens S7-1500 PLC + Industrial SCADA' }
    ],
    applications: [
      'Industrial MDF & Particle Board Manufacturing',
      'HDHMR Water-Resistant Board Plants',
      'High-Speed Laminate Core Board Processing'
    ],
    isFeatured: true
  },
  {
    id: 'prod-multi-opening-hot-press',
    slug: 'multi-opening-hot-press-system',
    name: 'Multi-Opening High-Tonnage Hot Press System',
    series: 'MOHP Heavy Series',
    brand: 'ambica',
    category: 'wood-panel-solutions',
    shortDescription: 'Heavy-duty multi-opening hydraulic hot press designed for batch consolidation of high-density fiberboards, particle boards, and plywood with synchronous closing.',
    fullDescription: 'The Multi-Opening Hot Press System is a cornerstone in MDF, HDHMR, and Particle Board manufacturing. Engineered to apply extreme tonnage and uniform thermal distribution simultaneously across multiple daylight openings, it guarantees uniform board density, superior resin curing bonding strength, and tight thickness tolerances. Equipped with simultaneous closing mechanisms to prevent pre-curing of lower boards.',
    imageUrl: '/images/products/wood-panel-press.webp',
    keyFeatures: [
      'Synchronous rack-and-pinion platen closing mechanism',
      'Multi-cylinder high-tonnage hydraulic ram arrangement for equalized pressure',
      'Deep-drilled solid steel thermal platens for balanced hot oil/steam circulation',
      'Automatic loading and unloading cages with synchronized indexers',
      'Integrated high-pressure hydraulic power pack with proportional pressure throttling'
    ],
    specifications: [
      { key: 'Daylight Openings', value: '8, 10, 12, 15, 20 Daylights' },
      { key: 'Total Clamping Force', value: '1500 to 5000', unit: 'Tons' },
      { key: 'Platen Size', value: '1370 x 2750 mm up to 2100 x 4200 mm' },
      { key: 'Operating Pressure Max', value: '315', unit: 'bar' },
      { key: 'Heating Medium', value: 'Thermal Oil / High-Pressure Steam (up to 240°C)' }
    ],
    applications: [
      'MDF & Plywood Manufacturing',
      'Industrial Particle Board Batch Consolidation',
      'Heavy Densified Industrial Wood Laminates'
    ],
    isFeatured: true
  },
  {
    id: 'prod-rotary-airlock-valve',
    slug: 'rotary-airlock-valve-wood',
    name: 'Industrial Rotary Airlock Valve & Feeder',
    series: 'RAV Heavy Duty',
    brand: 'ambica',
    category: 'wood-panel-solutions',
    shortDescription: 'Precision machined heavy-duty rotary airlock valves for pneumatic conveying of wood chips, sawdust, fiber, and cyclone material discharge.',
    fullDescription: 'Engineered specifically for wood panel fiber preparation and pneumatic dust collection systems, Ambica Rotary Airlock Valves maintain continuous pressure differentials while metering dry or semi-wet wood fibers, sawdust, and shavings without air leakage or binding.',
    imageUrl: '/images/products/directional-valve.png',
    keyFeatures: [
      'Reinforced cast iron/cast steel body with wear-resistant hard-chromed bore',
      'Heavy-duty 8-vane closed-end rotor with replaceable polyurethane or bronze tips',
      'Outboard heavy-duty spherical roller bearings protected by quadruple lip seals',
      'Anti-jamming sheared inlet geometry prevents fiber accumulation'
    ],
    specifications: [
      { key: 'Inlet/Outlet Flange Size', value: '200mm to 600mm round or square' },
      { key: 'Throughput Capacity', value: '5 to 80', unit: 'm³/hr' },
      { key: 'Pressure Differential', value: 'Up to 1.5', unit: 'bar' },
      { key: 'Drive Configuration', value: 'Helical Geared Motor with Torque Limiter' }
    ],
    applications: [
      'Wood Chip Screening & Cyclone Discharge',
      'Fiber Sifter & Blow Line Infeed',
      'Baghouse & Dust Collector Material Evacuation'
    ]
  },

  // -------------------------------------------------------------
  // HYDRAULIC PUMPS (REXROTH, HUADE, NACHI, POLYHYDRON, VOITH)
  // -------------------------------------------------------------
  {
    id: 'prod-rexroth-a10vso',
    slug: 'bosch-rexroth-a10vso-axial-piston-pump',
    name: 'Bosch Rexroth A10VSO Variable Displacement Axial Piston Pump',
    series: 'A10VSO Series 31 / 32',
    brand: 'rexroth',
    category: 'hydraulic-pumps',
    shortDescription: 'World-renowned swashplate design axial piston pump for hydrostatic drives in open circuit industrial hydraulic systems.',
    fullDescription: 'The Bosch Rexroth A10VSO is an industry-standard variable axial piston pump engineered for open hydraulic circuits. Featuring a precision swashplate drive, flow is proportional to drive speed and displacement, which can be smoothly adjusted from zero to maximum by regulating the swashplate angle. Renowned for low operating noise, high power-to-weight ratio, rapid control response, and exceptional service life under continuous industrial duties.',
    imageUrl: '/images/products/a10vso-pump.png',
    operatingPressureMaxBar: 350,
    displacementCm3Rev: '18 to 140 cm³/rev',
    keyFeatures: [
      'Nominal continuous pressure 280 bar, peak pressure rating up to 350 bar',
      'Highly flexible control options: DFR1 (pressure & flow), DR (pressure), DFLR (power)',
      'Through-drive capability for mounting secondary pumps (gear pumps, radial pumps)',
      'Low noise levels across the entire operating pressure envelope',
      'Excellent suction characteristics with long bearing life'
    ],
    specifications: [
      { key: 'Displacement Sizes', value: '18, 28, 45, 71, 100, 140', unit: 'cm³/rev' },
      { key: 'Nominal Pressure (Continuous)', value: '280', unit: 'bar' },
      { key: 'Maximum Peak Pressure', value: '350', unit: 'bar' },
      { key: 'Maximum Speed at Suction', value: '1800 to 3300', unit: 'rpm' },
      { key: 'Mounting Flange', value: 'SAE 2-bolt / 4-bolt ISO standard' },
      { key: 'Fluid Compatibility', value: 'Mineral Oil (HL, HLP), Environmental fluids (HEES)' }
    ],
    applications: [
      'Wood Panel Hydraulic Press Units',
      'Injection Molding Machinery',
      'Industrial Metal Stamping & Forming Presses',
      'Machine Tool Power Packs'
    ],
    isFeatured: true
  },
  {
    id: 'prod-rexroth-a4vso',
    slug: 'bosch-rexroth-a4vso-heavy-duty-pump',
    name: 'Bosch Rexroth A4VSO Heavy-Duty Axial Piston Pump',
    series: 'A4VSO Series 10 / 30',
    brand: 'rexroth',
    category: 'hydraulic-pumps',
    shortDescription: 'High-pressure variable swashplate axial piston pump rated up to 400 bar for severe industrial drive systems.',
    fullDescription: 'Engineered for the most demanding heavy-duty continuous industrial applications, the Bosch Rexroth A4VSO handles continuous working pressures up to 350 bar with intermittent peak spikes of 400 bar. Features oversized hydrostatic bearings, robust swashplate swivel cradles, and modular control blocks including electro-proportional displacement controls.',
    imageUrl: '/images/products/a4vso-pump.png',
    operatingPressureMaxBar: 400,
    displacementCm3Rev: '40 to 1000 cm³/rev',
    keyFeatures: [
      'Heavy-duty industrial pump rated up to 400 bar peak pressure',
      'Large displacements available up to 1000 cm³/rev for high-tonnage hydraulic presses',
      'Moog / Rexroth servo and proportional displacement control options',
      'Long-life fluid bearing system designed for 24/7 continuous factory duty',
      'Full torque through-drive capability'
    ],
    specifications: [
      { key: 'Displacement Sizes', value: '40, 71, 125, 180, 250, 355, 500, 750, 1000', unit: 'cm³/rev' },
      { key: 'Nominal Working Pressure', value: '350', unit: 'bar' },
      { key: 'Maximum Peak Pressure', value: '400', unit: 'bar' },
      { key: 'Shaft Type', value: 'Splined or Keyed Cylindrical' }
    ],
    applications: [
      'Heavy Particle Board Multi-Daylight Presses',
      'Steel Rolling Mill Hydraulics',
      'Marine & Offshore Winches and Deck Machinery',
      'Forging & Extrusion Presses'
    ],
    isFeatured: true
  },
  {
    id: 'prod-rexroth-a7vo',
    slug: 'bosch-rexroth-a7vo-bent-axis-pump',
    name: 'Bosch Rexroth A7VO Variable Displacement Bent Axis Pump',
    series: 'A7VO Series 63',
    brand: 'rexroth',
    category: 'hydraulic-pumps',
    shortDescription: 'Robust bent axis axial piston pump engineered for extreme self-suction and high rotational speeds in open circuits.',
    fullDescription: 'The Rexroth A7VO bent axis variable displacement pump utilizes conical tapered pistons arranged around an inclined cylinder block. Because of its bent axis geometry, it delivers unmatched mechanical efficiency, superior self-priming suction speeds, and outstanding service life even when operating under harsh contamination or viscosity variations.',
    imageUrl: '/images/products/a7vo-pump.png',
    operatingPressureMaxBar: 400,
    displacementCm3Rev: '28 to 500 cm³/rev',
    keyFeatures: [
      'High self-priming rotational speed without cavitation',
      'Bent axis geometry with conical piston rings for zero leakage past pistons',
      'Nominal pressure 350 bar, maximum pressure 400 bar',
      'Extremely compact footprint relative to high power output',
      'Immune to high fluid acceleration forces'
    ],
    specifications: [
      { key: 'Nominal Pressure', value: '350', unit: 'bar' },
      { key: 'Peak Maximum Pressure', value: '400', unit: 'bar' },
      { key: 'Displacement Sizes', value: '28, 55, 80, 107, 160, 250, 500', unit: 'cm³/rev' },
      { key: 'Drive Speeds', value: 'Up to 3400', unit: 'rpm' }
    ],
    applications: [
      'Industrial Mobile & Stationary Hydraulic Cranes',
      'Material Handling Equipment',
      'High-Cycle Short Press Hydraulic Systems'
    ]
  },
  {
    id: 'prod-huade-a8v-pump',
    slug: 'huade-hd-a8v-variable-double-pump',
    name: 'Huade HD-A8V Variable Double Axial Piston Pump',
    series: 'HD-A8V Series',
    brand: 'huade',
    category: 'hydraulic-pumps',
    shortDescription: 'Twin-circuit variable displacement double axial piston pump with total horsepower summation control.',
    fullDescription: 'The Huade HD-A8V is a high-performance double variable displacement pump featuring two independent swashplate pumping units inside a compact monoblock housing. Fitted with a summation horsepower limiter, both circuits dynamically balance flow and pressure to utilize 100% of available prime mover motor horsepower without overload, making it ideal for excavators, heavy loaders, and multi-cylinder press circuits.',
    imageUrl: '/images/products/a8v-pump.png',
    operatingPressureMaxBar: 350,
    displacementCm3Rev: '2x 55 to 2x 107 cm³/rev',
    keyFeatures: [
      'Twin variable displacement pumps in a single compact housing',
      'Automatic summation horsepower control prevents motor stall',
      'Auxiliary gear charge pump and pilot pressure valves integrated directly',
      'Direct interchangeable fitment with European OEM models',
      'Superior volumetric efficiency exceeding 94%'
    ],
    specifications: [
      { key: 'Displacements Available', value: 'HD-A8V 55, HD-A8V 80, HD-A8V 107', unit: 'cm³/rev x 2' },
      { key: 'Nominal Operating Pressure', value: '300', unit: 'bar' },
      { key: 'Maximum Peak Pressure', value: '350', unit: 'bar' },
      { key: 'Control Types', value: 'Summation HP Limiter + Hydraulic Pilot Overdrive' }
    ],
    applications: [
      'Hydraulic Excavators & Material Handlers',
      'Dual-Circuit Hot Press Hydraulic Power Units',
      'Industrial Forestry & Log Handling Machines'
    ],
    isFeatured: true
  },
  {
    id: 'prod-huade-a2f-pump',
    slug: 'huade-hd-a2f-fixed-displacement-pump',
    name: 'Huade HD-A2F Fixed Displacement Bent Axis Piston Pump',
    series: 'HD-A2F Series',
    brand: 'huade',
    category: 'hydraulic-pumps',
    shortDescription: 'Constant displacement bent-axis piston pump and motor suitable for hydrostatic transmissions in both open and closed loops.',
    fullDescription: 'The Huade HD-A2F is a proven, reliable bent-axis fixed displacement axial piston pump. Renowned for ruggedness, high starting efficiency, and low sensitivity to fluid contamination, it can operate as either a hydraulic pump or a hydraulic motor without modification.',
    imageUrl: '/images/products/a2f-pump.png',
    operatingPressureMaxBar: 350,
    displacementCm3Rev: '10 to 500 cm³/rev',
    keyFeatures: [
      'Spherical piston heads with tapered rings provide superior volumetric seal',
      'Heavy-duty bearings designed for radial and axial shaft side-loads',
      'Wide displacement portfolio from 10 cm³ up to 500 cm³ per revolution',
      'Operates seamlessly up to 350 bar peak pressure'
    ],
    specifications: [
      { key: 'Nominal Pressure', value: '315', unit: 'bar' },
      { key: 'Peak Maximum Pressure', value: '350', unit: 'bar' },
      { key: 'Displacements', value: '10, 16, 28, 55, 80, 107, 160, 250, 500', unit: 'cm³/rev' }
    ],
    applications: [
      'Hydrostatic Vehicle Drives',
      'Auxiliary Power Units for Industrial Presses',
      'Hydraulic Winch and Cutter Head Drives'
    ]
  },
  {
    id: 'prod-polyhydron-radial-pump',
    slug: 'polyhydron-1r-2r-radial-piston-pump',
    name: 'Polyhydron 1R / 2R High-Pressure Radial Piston Pump',
    series: 'Polyhydron 1R, 2R, 11RC Series',
    brand: 'polyhydron',
    category: 'hydraulic-pumps',
    shortDescription: 'High-pressure valve-controlled radial piston pump capable of up to 400 bar continuous pressure with multiple outlet ports.',
    fullDescription: 'Polyhydron radial piston pumps are valve-controlled, fixed displacement high-pressure units. Featuring radially arranged pumping elements driven by an eccentric drive shaft, they are available in 3, 5, or 7-piston configurations. Each piston element operates as a self-contained pump with independent suction and delivery check valves, allowing multiple separate pressure outputs or combined high-flow discharge.',
    imageUrl: '/images/products/radial-piston-pump.png',
    operatingPressureMaxBar: 400,
    displacementCm3Rev: '0.45 to 19.8 cm³/rev',
    keyFeatures: [
      'High working pressure capability up to 400 bar continuous',
      'Individual pumping elements can be split into multiple isolated hydraulic circuits',
      'Pumping elements easily replaceable during plant maintenance without dismounting pump',
      'Submerged or external tank mounting options',
      'Very high volumetric efficiency even at maximum operating pressures'
    ],
    specifications: [
      { key: 'Series Options', value: '1R3 (3 Piston), 2R (5 Piston), 11RC (Multi-Stage)' },
      { key: 'Maximum Continuous Pressure', value: '315 to 400', unit: 'bar' },
      { key: 'Flow Range at 1450 rpm', value: '0.65 to 28.7', unit: 'LPM' },
      { key: 'Mounting Direction', value: 'Horizontal or Vertical tank immersion' }
    ],
    applications: [
      'High-Pressure Hydraulic Clamping Systems',
      'Hydrostatic Testing Equipment',
      'Hydraulic Jacks and Compact Power Packs',
      'Laminate Edge Banding and Multi-Point Presses'
    ],
    isFeatured: true
  },
  {
    id: 'prod-nachi-pvs-pump',
    slug: 'nachi-pvs-series-variable-piston-pump',
    name: 'Nachi PVS Series Variable Displacement Piston Pump',
    series: 'Nachi PVS Series',
    brand: 'nachi',
    category: 'hydraulic-pumps',
    shortDescription: 'Ultra-quiet Japanese high-efficiency variable piston pump engineered for energy conservation and minimal pulsation.',
    fullDescription: 'Nachi Fujikoshi PVS series variable displacement piston pumps feature patented Japanese semi-cylindrical swashplate supports and double balance plates. These design breakthroughs suppress pressure ripples by up to 50% compared to conventional pumps while minimizing operational noise to whisper-quiet levels.',
    imageUrl: '/images/products/nachi-piston-pump.png',
    operatingPressureMaxBar: 250,
    displacementCm3Rev: '16 to 45 cm³/rev',
    keyFeatures: [
      'Whisper quiet operation (<62 dB(A) at 210 bar)',
      'Sharp pressure compensation cut-off saves massive electrical energy',
      'Dual pressure adjustment and load-sensing control configurations',
      'Extremely compact footprint allows tight integration inside machine power units'
    ],
    specifications: [
      { key: 'Displacement Sizes', value: 'PVS-1B-16, PVS-1B-22, PVS-2B-35, PVS-2B-45' },
      { key: 'Maximum Working Pressure', value: '210 to 250', unit: 'bar' },
      { key: 'Rated Speed', value: '800 to 1800', unit: 'rpm' }
    ],
    applications: [
      'CNC Lathes & Machining Centers',
      'Precision Hydraulic Tool Clamping',
      'Industrial Test Benches and Automation Cells'
    ]
  },
  {
    id: 'prod-voith-ipv-pump',
    slug: 'voith-ipv-internal-gear-pump',
    name: 'Voith IPV High-Pressure Internal Gear Pump',
    series: 'Voith IPV / IPH Series',
    brand: 'voith',
    category: 'hydraulic-pumps',
    shortDescription: 'Radial and axial gap compensated internal gear pump for ultra-high pressures up to 330 bar with near-zero pulsation.',
    fullDescription: 'Voith internal gear pumps represent the pinnacle of fluid power precision. Featuring patented radial and axial hydrodynamic gap compensation, they maintain exceptional volumetric efficiency (>95%) across their entire service life while running virtually silent under immense 330 bar loads.',
    imageUrl: '/images/products/a2fo-pump.png',
    operatingPressureMaxBar: 330,
    displacementCm3Rev: '3.5 to 125 cm³/rev',
    keyFeatures: [
      'Patented hydrodynamic gap compensation eliminates internal slip',
      'Lowest noise emissions in the fluid power industry',
      'Extremely low pressure pulsation protects sensitive servo valves',
      'Direct variable speed drive (VFD) compatibility for servo-hydraulic energy savings'
    ],
    specifications: [
      { key: 'Operating Pressure Max', value: '330', unit: 'bar' },
      { key: 'Displacements', value: 'IPV 3, IPV 4, IPV 5, IPV 6, IPV 7 (3.5 to 125 cm³/rev)' },
      { key: 'Efficiency Rating', value: '> 95%', unit: 'Volumetric' }
    ],
    applications: [
      'Plastic & Rubber Injection Molding Machines',
      'Precision Sheet Metal Press Brakes',
      'Servo-Electric Hydraulic Power Packs'
    ]
  },

  // -------------------------------------------------------------
  // HYDRAULIC MOTORS (FIXED, VARIABLE, HTLS)
  // -------------------------------------------------------------
  {
    id: 'prod-huade-a2fm-motor',
    slug: 'huade-hd-a2fm-bent-axis-motor',
    name: 'Huade HD-A2FM Bent Axis Fixed Displacement Hydraulic Motor',
    series: 'HD-A2FM Series',
    brand: 'huade',
    category: 'hydraulic-motors',
    shortDescription: 'High-speed bent-axis axial piston motor delivering tremendous starting torque and continuous high operating pressures.',
    fullDescription: 'The Huade HD-A2FM is a fixed displacement bent-axis axial piston motor engineered for hydrostatic transmissions in both open and closed circuits. Its 40° bent axis cylinder geometry provides exceptional mechanical starting torque efficiency and high allowable output shaft speeds, making it the preferred choice for industrial winch drums, mixer agitators, and rotary cutter heads.',
    imageUrl: '/images/products/hydraulic-motor-fixed.png',
    operatingPressureMaxBar: 400,
    displacementCm3Rev: '10 to 500 cm³/rev',
    keyFeatures: [
      'High starting torque efficiency exceeding 92%',
      'High maximum speed rating up to 8000 rpm on smaller frames',
      'Nominal continuous pressure 350 bar, maximum peak pressure 400 bar',
      'Heavy-duty tapered roller bearings for high radial and axial shaft loads',
      'Bi-directional rotation with integrated counterbalance valve option'
    ],
    specifications: [
      { key: 'Displacements Available', value: '10, 16, 23, 28, 32, 45, 56, 63, 80, 107, 125, 160, 180, 200, 250, 500', unit: 'cm³/rev' },
      { key: 'Nominal Pressure', value: '350', unit: 'bar' },
      { key: 'Peak Pressure', value: '400', unit: 'bar' },
      { key: 'Max Shaft Speed', value: 'Up to 8000', unit: 'rpm' }
    ],
    applications: [
      'Wood Chipper & Shredder Rotor Drives',
      'Hydraulic Winches & Hoists',
      'Industrial Agitators & Resin Mixers',
      'Track Drive & Wheeled Propulsion'
    ],
    isFeatured: true
  },
  {
    id: 'prod-huade-a2fe-motor',
    slug: 'huade-hd-a2fe-plug-in-motor',
    name: 'Huade HD-A2FE Plug-In Fixed Displacement Hydraulic Motor',
    series: 'HD-A2FE Series',
    brand: 'huade',
    category: 'hydraulic-motors',
    shortDescription: 'Compact plug-in bent axis motor designed for direct insertion into planetary gearboxes for space-saving industrial drives.',
    fullDescription: 'The HD-A2FE features an intermediate mounting flange located centrally along the motor casing, allowing the cylinder assembly to plug directly into the housing of a mechanical planetary gearbox. This eliminates bulky drive couplings, cuts assembly length in half, and provides a fully enclosed, rigid drive unit.',
    imageUrl: '/images/products/hydraulic-motor-variable.png',
    operatingPressureMaxBar: 400,
    displacementCm3Rev: '28 to 180 cm³/rev',
    keyFeatures: [
      'Space-saving plug-in design fits directly inside planetary gearboxes',
      'High starting torque and high volumetric efficiency',
      'Standardized DIN / ISO mounting interface',
      'Handles extreme continuous pressures up to 350 bar'
    ],
    specifications: [
      { key: 'Nominal Pressure', value: '350', unit: 'bar' },
      { key: 'Peak Pressure', value: '400', unit: 'bar' },
      { key: 'Frame Sizes', value: '28, 32, 45, 56, 63, 80, 90, 107, 125, 160, 180', unit: 'cm³/rev' }
    ],
    applications: [
      'Planetary Track Drives for Heavy Machinery',
      'Slewing Ring Gear Drives',
      'Compact Conveyor Head Pulley Drives'
    ]
  },

  // -------------------------------------------------------------
  // HYDRAULIC VALVES (NACHI, POLYHYDRON, HUADE, MODULAR)
  // -------------------------------------------------------------
  {
    id: 'prod-nachi-ss-g01-valve',
    slug: 'nachi-ss-g01-wet-solenoid-directional-valve',
    name: 'Nachi SS-G01 Wet-Type Solenoid Directional Control Valve',
    series: 'SS Series (D03 / NG6 / CETOP 3)',
    brand: 'nachi',
    category: 'hydraulic-valves',
    shortDescription: 'High-pressure wet-armature solenoid directional valve engineered for high flow, long service life, and shockless spool switching.',
    fullDescription: 'The Nachi SS-G01 directional control valve utilizes wet-armature solenoids where the solenoid core is immersed in system hydraulic fluid. This design eliminates mechanical oil seals, prevents external leakage, provides natural acoustic damping, and ensures virtually indefinite coil and spool lifespan. Rated for 350 bar continuous pressure and up to 100 LPM max flow.',
    imageUrl: '/images/products/nachi-solenoid-valve.png',
    operatingPressureMaxBar: 350,
    keyFeatures: [
      'Wet-armature construction eliminates dynamic seal friction and leaks',
      'High maximum pressure rating up to 350 bar (5000 psi)',
      'Subplate mounting according to ISO 4401-03 (CETOP 3 / NG6)',
      'Available in 12VDC, 24VDC, 110VAC, 220VAC with integrated surge suppressors',
      'Wide spool configuration portfolio: Closed center, Open center, Float, Tandem'
    ],
    specifications: [
      { key: 'Mounting Standard', value: 'ISO 4401-03 / CETOP 3 / NG6' },
      { key: 'Maximum Working Pressure', value: '350', unit: 'bar' },
      { key: 'Maximum Allowable Tank Port Pressure', value: '160 to 210', unit: 'bar' },
      { key: 'Maximum Flow Capacity', value: '100', unit: 'LPM' },
      { key: 'Coil Insulation Class', value: 'Class H (180°C thermal endurance)' }
    ],
    applications: [
      'Hydraulic Hot Press Cylinder Sequencers',
      'Automated Clamping and Indexing Fixtures',
      'General Industrial Hydraulic Power Units'
    ],
    isFeatured: true
  },
  {
    id: 'prod-nachi-sa-g03-valve',
    slug: 'nachi-sa-g03-wet-solenoid-directional-valve',
    name: 'Nachi SA-G03 Wet-Type Solenoid Directional Control Valve',
    series: 'SA Series (D05 / NG10 / CETOP 5)',
    brand: 'nachi',
    category: 'hydraulic-valves',
    shortDescription: 'High-flow wet armature directional control valve handling up to 160 LPM for large bore hydraulic cylinders.',
    fullDescription: 'The Nachi SA-G03 provides double the flow capacity of the SS-G01 in an ISO 4401-05 (CETOP 5 / NG10) mounting interface. Capable of handling main cylinder rapid-advance and high-volume return strokes on industrial presses without excessive pressure drops.',
    imageUrl: '/images/products/directional-valve.png',
    operatingPressureMaxBar: 315,
    keyFeatures: [
      'High flow rating up to 160 LPM with low pressure loss',
      'Shockless spool transition option prevents hydraulic pipe hammer',
      'Dust- and water-resistant DIN 43650 Hirschmann connector with indicator LED',
      'Available with detent mechanism or spring-centered configurations'
    ],
    specifications: [
      { key: 'Mounting Standard', value: 'ISO 4401-05 / CETOP 5 / NG10' },
      { key: 'Maximum Pressure', value: '315', unit: 'bar' },
      { key: 'Max Flow Rate', value: '160', unit: 'LPM' }
    ],
    applications: [
      'Wood Panel Multi-Opening Press Main Ram Circuits',
      'Heavy Scrap Shears & Balers',
      'Primary Mill Hydraulic Distribution Manifolds'
    ]
  },
  {
    id: 'prod-modular-sandwich-valves',
    slug: 'modular-sandwich-valves-cetop',
    name: 'Modular Sandwich Stack Valves (CETOP 3 & CETOP 5)',
    series: 'MSV Modular Series',
    brand: 'polyhydron',
    category: 'hydraulic-valves',
    shortDescription: 'Comprehensive stackable modular valves including pilot check, pressure reducing, flow control, and counterbalance valves.',
    fullDescription: 'Ambica modular sandwich valves stack directly between directional control valves and the subplate manifold, eliminating intermediate piping, potential leak points, and installation labor. Our lineup includes pilot-operated check valves, direct and pilot pressure relief valves, pressure reducing valves, and dual throttle check valves in NG6 and NG10 sizes.',
    imageUrl: '/images/products/modular-valve.png',
    operatingPressureMaxBar: 350,
    keyFeatures: [
      'Direct stackable sandwich design eliminates piping and leak paths',
      'Available functions: Pilot Check (P, A, B, AB), Pressure Relief, Flow Control, Counterbalance',
      'High-precision micrometer adjustment knobs with tamper-proof lock nuts',
      'Precision honed cast ductile iron body withstands up to 350 bar pressure'
    ],
    specifications: [
      { key: 'Standard Sizes', value: 'CETOP 3 (NG6) & CETOP 5 (NG10)' },
      { key: 'Operating Pressure Max', value: '350', unit: 'bar' },
      { key: 'Maximum Flow Rating', value: 'Up to 100 LPM (NG6), 200 LPM (NG10)' }
    ],
    applications: [
      'Vertical Press Ram Anti-Drop & Counterbalance',
      'Cylinder Speed Throttling and Deceleration Control',
      'Multi-Station Hydraulic Manifold Stacks'
    ]
  },
  {
    id: 'prod-proportional-servo-valve',
    slug: 'proportional-servo-directional-valve',
    name: 'Electromagnetic Proportional Directional Valve with On-Board Electronics',
    series: 'OBE Proportional Series',
    brand: 'rexroth',
    category: 'hydraulic-valves',
    shortDescription: 'High-precision electro-proportional valve with integrated digital electronics (OBE) for closed-loop position, speed, and pressure control.',
    fullDescription: 'Designed for automated machinery demanding sub-millimeter positioning and synchronized press platen leveling, this proportional directional valve integrates high-response proportional solenoids with on-board digital control electronics (OBE). Operates on standard 0-10V or 4-20mA control signals.',
    imageUrl: '/images/products/proportional-valve.png',
    operatingPressureMaxBar: 350,
    keyFeatures: [
      'Integrated digital on-board electronics (OBE) with factory calibrated zero-point',
      'Linearized progressive flow characteristic curves for gentle acceleration',
      'LVDT spool position feedback ensures rapid 20ms step response times',
      'Subplate mounting according to ISO 4401 standards'
    ],
    specifications: [
      { key: 'Nominal Sizes', value: 'NG6 / CETOP 3 & NG10 / CETOP 5' },
      { key: 'Operating Pressure', value: 'Up to 350', unit: 'bar' },
      { key: 'Command Signal', value: '±10V, 0-10V, or 4-20mA' },
      { key: 'Hysteresis', value: '< 0.1%' }
    ],
    applications: [
      'Synchronized Short Cycle Hot Press Platen Leveling',
      'High-Speed Flying Cut-off Saws',
      'Precision Metal Extrusion Positioning'
    ],
    isFeatured: true
  },

  // -------------------------------------------------------------
  // INDUSTRIAL LUBRICATION & FILTRATION
  // -------------------------------------------------------------
  {
    id: 'prod-brenntag-hydraulic-oil',
    slug: 'brenntag-industrial-hydraulic-oil-vg46-68',
    name: 'Brenntag Premium Anti-Wear Industrial Hydraulic Oil (ISO VG 46 / 68)',
    series: 'Brenntag Hydrolube AW Series',
    brand: 'ambica',
    category: 'lubrication-systems',
    shortDescription: 'High-performance anti-wear hydraulic fluid formulated with premium virgin base stocks and advanced thermal-oxidation inhibitors.',
    fullDescription: 'Ambica Engineers is an authorized distributor of Brenntag industrial lubricants (by Raj Petro Specialities). Specifically formulated for continuous high-pressure industrial hydraulic systems, Hydrolube AW contains zinc-based anti-wear additives that prevent pump vane, piston, and gear wear while maintaining superior demulsibility, foam resistance, and thermal stability under severe operating conditions.',
    imageUrl: '/images/products/gear-pump-mechanics.jpeg',
    keyFeatures: [
      'Superior anti-wear protection passes Vickers 35VQ25 and Denison T6H20C tests',
      'Exceptional thermal and oxidation resistance prevents varnish and sludge build-up',
      'Rapid air release and anti-foaming characteristics prevent pump cavitation',
      'Outstanding hydrolytic stability and water separation (demulsibility)',
      'Compatible with standard nitrile (NBR), Viton (FKM), and polyurethane seals'
    ],
    specifications: [
      { key: 'ISO Viscosity Grades', value: 'ISO VG 32, VG 46, VG 68, VG 100' },
      { key: 'Viscosity Index', value: '> 102' },
      { key: 'Flash Point (COC)', value: '> 220', unit: '°C' },
      { key: 'Pour Point', value: '< -18', unit: '°C' },
      { key: 'Packaging Available', value: '26 Liter Pail, 210 Liter Barrel, Bulk Tanker' }
    ],
    applications: [
      'Wood Panel Hydraulic Press Power Packs',
      'High-Pressure Industrial Axial & Radial Piston Pumps',
      'Plastic Injection Molding and Blow Molding Plants',
      'Industrial Gearboxes and Circulation Systems'
    ],
    isFeatured: true
  },
  {
    id: 'prod-hydraulic-oil-filtration-unit',
    slug: 'mobile-hydraulic-oil-filtration-unit',
    name: 'Mobile High-Efficiency Hydraulic Oil Filtration & Kidney Loop Unit',
    series: 'Ambica CleanLube Pro Series',
    brand: 'ambica',
    category: 'lubrication-systems',
    shortDescription: 'Trolley-mounted offline kidney-loop filtration unit engineered to remove solid contaminants down to 3 microns and absorb free moisture.',
    fullDescription: 'Over 75% of all hydraulic component failures are directly caused by contaminated fluid. The Ambica CleanLube Pro mobile filtration trolley provides offline kidney-loop fluid purification while factory machinery continues to operate without interruption. Equipped with dual-stage high dirt-capacity micro-fiberglass filter elements and water removal media, it purifies oil to NAS 1638 Class 5 / ISO 4406 14/12/9 cleanliness standards.',
    imageUrl: '/images/products/a8v-pump.png',
    keyFeatures: [
      'Purifies fluid to NAS Class 5 while production runs uninterrupted',
      'Dual-stage filtration: 25-micron suction pre-filter + 3-micron high-beta polishing element',
      'Integrated water absorption cartridge removes emulsified moisture',
      'Differential pressure gauge alerts operators when filter element requires replacement',
      'Heavy-duty pneumatic wheels for effortless mobility across factory shop floors'
    ],
    specifications: [
      { key: 'Flow Rate Capacity', value: '25 to 60', unit: 'LPM' },
      { key: 'Filtration Absolute Rating', value: 'β3(c) ≥ 1000 (3 Micron Absolute)' },
      { key: 'Motor Rating', value: '1.5 kW / 2 HP, 3-Phase 415V' },
      { key: 'Fluid Viscosity Range', value: '10 to 460', unit: 'cSt' }
    ],
    applications: [
      'Preventive Maintenance Flushing for Wood Panel Presses',
      'New Hydraulic Fluid Pre-Filtration Before Reservoir Filling',
      'Offline Conditioning for Metal Stamping & Plastic Presses'
    ]
  }
];
