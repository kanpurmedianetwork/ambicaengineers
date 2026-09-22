import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { clientsData } from '../../../infrastructure/data/clients.data';

export const ClientMarquee: React.FC = () => {
  // Split the 25 clients into two balanced staggered rows
  const half = Math.ceil(clientsData.length / 2);
  const row1 = clientsData.slice(0, half);
  const row2 = clientsData.slice(half);

  // Duplicate arrays to create continuous infinite loops
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="py-16 bg-[#F8FAFC] border-y border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/80 px-3.5 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#EF7D01]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EF7D01]">
            Partners in Manufacturing Excellence
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display tracking-tight">
          Trusted by 500+ Wood Panel &amp; Industrial Leaders
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Supplying precision hydraulic pumps, proportional valves, and European hot press cushion pads to India&apos;s foremost laminate, MDF, plywood, and composite panel manufacturing facilities.
        </p>
      </div>

      {/* Marquee Viewport with Left & Right Gradient Mask Fades */}
      <div className="relative w-full overflow-hidden space-y-4 py-2">
        {/* Left Fade Gradient */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
        
        {/* Right Fade Gradient */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

        {/* Row 1: Leftward Infinite Scroll */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 shrink-0">
            {marqueeRow1.map((client, index) => (
              <div
                key={`row1-${client.id}-${index}`}
                className="bg-white border border-slate-200/90 hover:border-[#EF7D01]/50 rounded-2xl p-4 h-20 sm:h-24 w-44 sm:w-56 flex items-center justify-center shadow-xs hover:shadow-md transition-all duration-300 shrink-0 group select-none cursor-pointer"
                title={client.name}
              >
                <img
                  src={client.imageUrl}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 max-w-[82%] object-contain filter grayscale group-hover:grayscale-0 contrast-110 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    // Fallback to text label if image fails
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className="hidden text-xs font-mono font-bold text-slate-800 text-center uppercase">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Infinite Scroll (Reverse Direction) */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 shrink-0">
            {marqueeRow2.map((client, index) => (
              <div
                key={`row2-${client.id}-${index}`}
                className="bg-white border border-slate-200/90 hover:border-[#EF7D01]/50 rounded-2xl p-4 h-20 sm:h-24 w-44 sm:w-56 flex items-center justify-center shadow-xs hover:shadow-md transition-all duration-300 shrink-0 group select-none cursor-pointer"
                title={client.name}
              >
                <img
                  src={client.imageUrl}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 max-w-[82%] object-contain filter grayscale group-hover:grayscale-0 contrast-110 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className="hidden text-xs font-mono font-bold text-slate-800 text-center uppercase">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
