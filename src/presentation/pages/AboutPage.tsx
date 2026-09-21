import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Quote, 
  Target, 
  Compass 
} from 'lucide-react';
import { companyData, companyMilestones } from '../../infrastructure/data/company.data';
import { Card } from '../components/ui/Card';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24 bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0A0F1D] text-white border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-950/60 border border-[#EF7D01]/50 px-3.5 py-1 rounded-full text-xs font-mono font-semibold text-[#EF7D01]">
            <ShieldCheck className="w-3.5 h-3.5" />
            ABOUT AMBICA ENGINEERS INDIA LIMITED
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase font-display tracking-tight">
            ENGINEERING EXCELLENCE &amp; TRUST SINCE 1982
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            From humble beginnings to India&apos;s leading supplier of specialized hydraulic components, wood panel manufacturing equipment, and industrial lubricants.
          </p>
        </div>
      </section>

      {/* Story & Managing Director Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story */}
          <div className="lg:col-span-7 space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase font-display">
              Decades of Driving Indian Industrial Progress
            </h2>
            <p>
              Ambica Engineers was established to bridge the gap between global precision hydraulic engineering and Indian industrial manufacturing. Operating nationwide with facilities in Ahmedabad and our corporate experience centre in Noida, we supply heavy industrial plants with certified hydraulic pumps, motors, valves, and specialized wood panel machinery spares.
            </p>
            <p>
              Over four decades, our team has developed deep application know-how across MDF, Particle Board, Laminate, Steel Mills, Machine Tools, and Plastic processing industries. Whether replacing critical axial piston pumps on a continuous production line or custom-cutting European silicon-copper cushion pads for short cycle hot presses, we ensure minimal plant downtime and maximum productivity.
            </p>

            {/* Quality Statement Box */}
            <div className="bg-orange-50 border-l-4 border-[#EF7D01] rounded-r-2xl p-6 space-y-2">
              <div className="text-xs font-mono font-bold text-[#EF7D01] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                Our Uncompromising Quality Policy
              </div>
              <p className="text-xs text-slate-800 italic">
                &ldquo;{companyData.qualityPolicy}&rdquo;
              </p>
            </div>
          </div>

          {/* MD Message Card */}
          <div className="lg:col-span-5">
            <div className="p-8 space-y-6 border border-slate-200/90 bg-white rounded-3xl shadow-sm relative overflow-hidden">
              <Quote className="w-16 h-16 text-orange-100 absolute top-4 right-4 pointer-events-none" />
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#EF7D01] font-semibold uppercase tracking-wider">
                  Leadership Perspective
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Message from Managing Director
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;{companyData.mdMessage}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 border-t border-slate-100">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#EF7D01] shadow-sm shrink-0">
                  <img
                    src="/images/leadership/mohit-chhajer-md.jpg"
                    alt={companyData.managingDirector}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="text-base font-bold text-slate-900 font-mono uppercase">
                    {companyData.managingDirector}
                  </div>
                  <div className="text-xs text-[#EF7D01] font-medium">
                    Managing Director • Ambica Engineers India Limited
                  </div>
                  {/* Handwritten signature (Natural black ink on white) */}
                  <div className="pt-2">
                    <img
                      src="/images/leadership/mohit-signature.png"
                      alt="Signature of Mohit Chhajer"
                      className="h-10 w-auto object-contain sm:mx-0 mx-auto"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
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
              To provide world-class machinery, hydraulic systems, industrial spares, and technical services through continuous innovation, uncompromising quality control, same-day dispatch support, and lasting customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold text-[#EF7D01] uppercase tracking-widest">
            A Legacy of Continuous Growth
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 uppercase font-display">
            Corporate Milestones (1982 – 2026)
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-10 py-6">
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
