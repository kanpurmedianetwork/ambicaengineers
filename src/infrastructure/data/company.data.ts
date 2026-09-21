import { CompanyInfo, Milestone } from '../../domain/entities/CompanyInfo';

export const companyData: CompanyInfo = {
  legalName: "Ambica Engineers India Limited",
  brandName: "Ambica Engineers",
  foundedYear: 2013,
  legacyYear: 1982,
  tagline: "Powering Industrial Performance Through Engineering Excellence",
  managingDirector: "Mohit Abhay Raj Chhajer",
  mdMessage: "At Ambica Engineers, our success has always been driven by an uncompromising commitment to quality, engineering reliability, and lasting customer partnerships. Over the decades, we have built strong relationships with manufacturers across India by delivering world-class hydraulic components, industrial lubricants, machinery spares, and wood panel manufacturing solutions. Our team remains focused on understanding exacting customer specifications, providing rapid technical support, and supplying components that deliver long-term operational excellence.",
  qualityPolicy: "The brand 'AMBICA' in the Wood & Panel and Industrial Hydraulic industries defines Quality. We associate with the world's finest engineering manufacturers to provide only genuine, certified, and precision-tested hydraulic components and machinery spares. We carry out stringent quality checks at every stage from procurement to dispatch. We ensure our clients receive components that maximize uptime, withstand extreme operating pressures, and deliver continuous performance.",
  headquarters: {
    address: "5th Floor, Plot No. A-143, Sovereign Corporate Tower, Sector 136",
    building: "Sovereign Corporate Tower",
    plot: "Plot No. A-143",
    sector: "Sector 136",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    floor: "5th Floor"
  },
  contact: {
    primaryPhone: "+91 7600025020",
    primaryEmail: "info@ambicaengineers.in",
    website: "https://www.ambicaengineers.in",
    whatsappNumber: "917600025020"
  },
  keyStats: {
    yearsOfLegacy: 44,
    satisfiedClients: "1,200+",
    productsDelivered: "50,000+",
    activeSites: "150+"
  }
};

export const companyMilestones: Milestone[] = [
  {
    year: "1982",
    title: "Engineering Legacy Inception",
    description: "Foundations laid in precision engineering, industrial maintenance, and machine tool supply."
  },
  {
    year: "2013",
    title: "Ambica Engineers Established",
    description: "Commenced formal corporate operations from Ahmedabad, establishing core distribution channels for hydraulic spares."
  },
  {
    year: "2015",
    title: "Expanded Hydraulic Spares Portfolio",
    description: "Introduced global hydraulic pump and valve product lines from premier international manufacturers."
  },
  {
    year: "2017",
    title: "North India Regional Presence",
    description: "Established dedicated operations and regional engineering support in Delhi NCR."
  },
  {
    year: "2018",
    title: "Hydraulic Filtration Launch @ DelhiWood",
    description: "Unveiled advanced mobile and offline hydraulic oil filtration units at DelhiWood Expo."
  },
  {
    year: "2019",
    title: "Brenntag Authorized Distributor",
    description: "Appointed authorized distributor for Brenntag industrial lubricants by Raj Petro Specialities."
  },
  {
    year: "2020",
    title: "Premier Brand Stockist Network",
    description: "Direct official stockist status for Voith, Nachi, Polyhydron, and Veljan hydraulic lines."
  },
  {
    year: "2021",
    title: "Wood Panel Innovations (Cushion Pads & SS Plates)",
    description: "Introduced European grade Silicon & Copper cushion pads and specialized press plates for short-cycle presses."
  },
  {
    year: "2022",
    title: "Incorporation & Expansion",
    description: "Re-branded and incorporated as Ambica Engineers & Lubricants Pvt Ltd with expanded technical services."
  },
  {
    year: "2024",
    title: "Global Collaboration with Aminova",
    description: "Formed strategic alliance with Aminova for state-of-the-art wood panel and particle board automation lines."
  },
  {
    year: "2026",
    title: "State-of-the-Art Experience Centre",
    description: "Inaugurated the flagship corporate experience centre and regional headquarters at Sovereign Corporate Tower, Noida."
  }
];
