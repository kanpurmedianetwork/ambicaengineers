import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Quote, 
  Target, 
  Compass,
  Wrench,
  Droplets,
  Layers,
  Cpu,
  Settings2,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { companyData, companyMilestones } from '../../infrastructure/data/company.data';

export const AboutPage: React.FC = () => {
  const services = [
    {
      title: "Hydraulic Components & Spare Parts",
      desc: "Authorized pumps, motors, valves, and cartridge systems from Rexroth, Nachi, Polyhydron, Huade, and Voith with immediate dispatch support.",
      icon: Settings2
    },
    {
      title: "Industrial Lubricants & Maintenance Products",
      desc: "High-performance hydraulic oils, specialty synthetic greases, and filtration solutions as authorized distributors for Brenntag & Raj Petro.",
      icon: Droplets
    },
    {
      title: "Hydraulic Press Spare Parts",
      desc: "Heavy-duty press cylinders, proportional control valves, seal kits, and pressure control assemblies engineered for high-cycle industrial presses.",
      icon: Wrench
    },
    {
      title: "MDF & Particle Board Production Lines",
      desc: "End-to-end turnkey machinery spares, European silicon/copper cushion pads, and process automation lines in partnership with Aminova.",
      icon: Layers
    },
    {
      title: "Machinery Equipment & Industrial Spares",
      desc: "Precision engineering components, SS press plates, bearings, heat exchangers, and drive systems for continuous plant operations.",
      icon: Cpu
    },
    {
      title: "Technical Support & Product Consultation",
      desc: "Engineering audit, replacement retrofits, hydraulic circuit troubleshooting, and custom technical sizing by senior engineers.",
      icon: Headphones
    }
  ];

  return (
    <div className="space-y-20 pb-24 bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-slate-800 pt-32 pb-16 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Top Glow & Engineering Precision Grid for Transparent Nav */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,125,1,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-950/60 border border-[#EF7D01]/50 px-3.5 py-1 rounded-full text-xs font-mono font-semibold text-[#EF7D01] whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>ABOUT AMBICA ENGINEERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase font-display tracking-tight">
            ENGINEERING SOLUTIONS THAT DRIVE INDUSTRY
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Ambica Engineers is a trusted supplier of hydraulic components, industrial lubricants, machinery spares, and wood panel industry solutions. We support MDF, Particle Board, Laminate, and Industrial Manufacturing companies with reliable products and technical expertise.
          </p>
        </div>
      </section>

      {/* Corporate Story & Infrastructure Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
                Industrial Engineering Legacy • Since 1982
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display leading-tight">
                Delivering Excellence Across Indian Manufacturing
              </h2>
            </div>
            
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              Ambica Engineers was established to bridge the gap between world-class precision hydraulic engineering and Indian manufacturing infrastructure. Operating nationwide with stockist warehousing in Ahmedabad and our flagship corporate Experience Centre in Sovereign Corporate Tower, Noida, we supply heavy industrial plants with certified hydraulic pumps, motors, valves, and specialized wood panel machinery spares.
            </p>
            <p>
              Our commitment to quality, dependable service, and long-term customer relationships has helped us serve industries across India. We support MDF, Particle Board, Laminate, Steel Mills, Machine Tools, Plastic processing, and Infrastructure companies with high-reliability products and technical expertise.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-2xl font-extrabold text-[#EF7D01] font-display">44+</div>
                <div className="text-xs font-semibold text-slate-800 uppercase mt-0.5">Years Legacy</div>
                <div className="text-[11px] text-slate-500">Engineering Trust</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-2xl font-extrabold text-slate-900 font-display">1,200+</div>
                <div className="text-xs font-semibold text-slate-800 uppercase mt-0.5">Client Facilities</div>
                <div className="text-[11px] text-slate-500">Pan-India Support</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-2xl font-extrabold text-slate-900 font-display">50,000+</div>
                <div className="text-xs font-semibold text-slate-800 uppercase mt-0.5">Spares Delivered</div>
                <div className="text-[11px] text-slate-500">Ready Stock Dispatch</div>
              </div>
            </div>
          </div>

          {/* Facility / Corporate Showcase Photo */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-xl bg-slate-900 relative group aspect-[4/3] lg:aspect-[5/4]">
              <img
                src="/images/about/team-facility.webp"
                alt="Ambica Engineers Corporate Facility & Operations"
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[11px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
                  Corporate Experience Centre
                </span>
                <p className="text-white text-base font-bold font-display">
                  Sovereign Corporate Tower • Sector 136, Noida
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Live hydraulic test benches, European cushion pad demonstration, and customer engineering consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman & Managing Director (CMD) Executive Leadership Address */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0A0F1D] via-[#0F172A] to-[#0A0F1D] border-2 border-slate-800/90 shadow-2xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Subtle Ambient Background Watermark */}
          <Quote className="w-80 h-80 text-white/[0.03] absolute -bottom-16 -right-16 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#EF7D01]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* CMD Portrait Column (Significantly bigger, commanding visual anchor) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="relative w-full max-w-[360px] group">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#EF7D01]/40 via-transparent to-[#EF7D01]/20 blur-md group-hover:blur-lg transition-all duration-300" />
                
                {/* Main Portrait Frame */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-[#EF7D01]/60 shadow-2xl bg-slate-900">
                  <img
                    src="/images/leadership/mohit-chhajer-md.webp"
                    alt={`${companyData.managingDirector} - Chairman & Managing Director`}
                    width={976}
                    height={994}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent opacity-80" />
                  
                  {/* Badge on Photo */}
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#0A0F1D]/80 backdrop-blur-md border border-slate-700/80 text-center">
                    <div className="text-[10px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
                      CHAIRMAN &amp; MANAGING DIRECTOR
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white uppercase font-executive tracking-wider mt-0.5">
                      {companyData.managingDirector}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Executive Credentials */}
              <div className="w-full max-w-[360px] mt-4 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Leadership Desk
                </span>
                <span>Noida • Corporate HQ</span>
              </div>
            </div>

            {/* CMD Message Column (Large, authoritative, readable text with signature) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF7D01]/15 border border-[#EF7D01]/30 text-[#EF7D01] text-xs font-mono font-bold uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                CMD Leadership Address
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase font-display tracking-tight leading-tight">
                "Quality &amp; Dependability Form The Bedrock Of Industrial Progress"
              </h2>

              {/* Prominent Large Message */}
              <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed italic border-l-2 border-[#EF7D01] pl-5 sm:pl-6 bg-white/[0.02] py-2 rounded-r-xl font-normal">
                <p>
                  &ldquo;At Ambica Engineers, our success has always been driven by a commitment to quality, reliability, and customer satisfaction. Over the years, we have built strong partnerships with manufacturers across India by delivering trusted hydraulic components, industrial lubricants, machinery spares, and engineering solutions.
                </p>
                <p>
                  Our focus remains on understanding customer requirements, providing dependable support, and delivering products that create long-term value. As industries continue to evolve, we remain dedicated to innovation, excellence, and building lasting relationships with our customers and partners. Thank you for your trust and continued support.&rdquo;
                </p>
              </div>

              {/* Strategic Leadership Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800 space-y-1">
                  <div className="text-xs font-mono font-bold text-[#EF7D01] uppercase">100% Genuine</div>
                  <div className="text-[12px] text-slate-300">Direct authorized OEM stock with complete traceability.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800 space-y-1">
                  <div className="text-xs font-mono font-bold text-sky-400 uppercase">Bench Tested</div>
                  <div className="text-[12px] text-slate-300">Rigorous 350-bar pressure verification prior to dispatch.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-slate-800 space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Long-Term Trust</div>
                  <div className="text-[12px] text-slate-300">Decades-long engineering partnerships across Indian industry.</div>
                </div>
              </div>

              {/* Signature Block */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white uppercase font-executive tracking-wider">
                    {companyData.managingDirector}
                  </div>
                  <div className="text-sm font-semibold text-[#EF7D01] font-mono mt-0.5">
                    Chairman &amp; Managing Director (CMD)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    Ambica Engineers &amp; Lubricants Pvt Ltd
                  </div>
                </div>

                {/* CMD Signature */}
                <div className="sm:text-right">
                  <div className="inline-block p-2 rounded-xl bg-white/5 border border-slate-800">
                    <img
                      src="/images/leadership/mohit-signature.png"
                      alt="Signature of Mohit Abhayraj Chhajer, CMD"
                      width={180}
                      height={60}
                      loading="lazy"
                      decoding="async"
                      className="h-12 sm:h-14 w-auto object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                    Executive Signature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-white border-y border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
              Comprehensive Industrial Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display">
              OUR SERVICES &amp; SOLUTIONS
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              At Ambica Engineers, we provide a comprehensive range of industrial products and solutions to support the smooth operation of manufacturing facilities across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 hover:border-[#EF7D01]/50 hover:bg-white transition-all space-y-3 shadow-xs group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EF7D01] flex items-center justify-center group-hover:bg-[#EF7D01] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience, Accountability & Quality Policy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
                Built on Trust &amp; Performance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase font-display">
                EXPERIENCE &amp; ACCOUNTABILITY
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#EF7D01] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Decades of Industrial Experience</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    With extensive experience in hydraulic components, industrial lubricants, machinery spares, and wood panel industry solutions, Ambica Engineers delivers reliable products backed by deep technical knowledge and application engineering expertise.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#EF7D01] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Uncompromising Accountability</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    We follow strict quality control standards from procurement to dispatch, ensuring every product meets performance, durability, and reliability requirements for demanding high-cycle manufacturing lines.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Policy Box */}
            <div className="bg-orange-50 border-l-4 border-[#EF7D01] rounded-r-2xl p-6 space-y-2">
              <div className="text-xs font-mono font-bold text-[#EF7D01] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                Our Quality Policy
              </div>
              <p className="text-xs text-slate-800 leading-relaxed italic">
                &ldquo;{companyData.qualityPolicy}&rdquo;
              </p>
            </div>
          </div>

          {/* Maintenance & Precision Photo */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative group aspect-[4/3]">
              <img
                src="/images/about/maintenance-precision.webp"
                alt="Industrial Maintenance and Quality Testing"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <p className="text-white text-sm font-bold">
                    Rigorous Inspection &amp; Maintenance Protocols
                  </p>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Certified testing before dispatch to ensure zero plant downtime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white border-y border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EF7D01] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase font-display">Our Corporate Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To be India&apos;s most trusted engineering solutions partner, delivering innovative hydraulic, industrial, and manufacturing solutions that empower industries with quality, reliability, and sustainable growth.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase font-display">Our Core Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To provide world-class machinery, hydraulic systems, industrial spares, and technical services through innovation, uncompromising quality, timely support, and lasting customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold text-[#EF7D01] uppercase tracking-widest">
            A Journey of Unstoppable Growth &amp; Excellence
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 uppercase font-display">
            OUR JOURNEY (2013 – 2026)
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl mx-auto">
            Since our founding in 2013, Ambica Engineers has grown from a single office in Ahmedabad to a trusted name in hydraulic components, industrial lubricants, and engineering solutions across India.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-8 py-6">
          {companyMilestones.map((m, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#EF7D01] group-hover:bg-[#EF7D01] transition-colors" />
              
              {/* Year Label */}
              <div className="md:absolute md:-left-28 md:text-right md:w-20 md:top-1 text-sm font-bold font-mono text-[#EF7D01]">
                {m.year}
              </div>

              <div className="bg-white border border-slate-200/90 hover:border-[#EF7D01]/40 rounded-xl p-5 transition-all space-y-1.5 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
