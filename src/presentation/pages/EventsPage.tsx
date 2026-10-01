import React from 'react';
import { Calendar, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { eventsData } from '../../infrastructure/data/events.data';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const EventsPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A0F1D] border-b border-slate-800 pt-32 pb-16 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#EF7D01]/10 border border-[#EF7D01]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
            <Award className="w-3.5 h-3.5" />
            Industry Exhibitions &amp; Summits
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-mono tracking-tight">
            EVENTS &amp; EXPOS
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Ambica Engineers regularly showcases our latest hydraulic innovations, filtration units, and wood panel solutions at South Asia&apos;s leading manufacturing trade fairs.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {eventsData.map((event) => {
          const isUpcoming = event.year >= 2026;
          return (
            <Card 
              key={event.id} 
              className={`p-8 sm:p-10 space-y-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow ${
                isUpcoming ? 'border-t-4 border-t-[#EF7D01]' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <Badge variant={isUpcoming ? 'amber' : 'slate'} size="md">
                      {event.badgeText}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Edition: {event.year}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono uppercase">
                    {event.title}
                  </h2>
                  <div className="text-xs text-[#EF7D01] font-semibold">
                    {event.edition}
                  </div>
                </div>

                {/* Booth Info Pill */}
                <div className="bg-orange-50/80 border border-orange-200/90 rounded-2xl p-4 text-center shrink-0 min-w-[200px]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                    Exhibition Booth
                  </div>
                  <div className="text-xl font-bold font-mono text-[#EF7D01] mt-0.5">
                    {event.stallNumber}
                  </div>
                </div>
              </div>

              {/* Event Location and Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 py-3 border-y border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EF7D01] shrink-0" />
                  <span><strong className="text-slate-800">Dates:</strong> {event.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#EF7D01] shrink-0" />
                  <span><strong className="text-slate-800">Venue:</strong> {event.venue}, {event.city}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {event.description}
              </p>

              {/* Highlight Products at this expo */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                  Featured Product Demonstrations:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {event.highlightProducts.map((prod, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EF7D01] shrink-0 mt-0.5" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Exhibition Photo Gallery */}
              {event.images && event.images.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                    <span>Exhibition Stall &amp; Live Showcase Gallery</span>
                    <span className="text-[11px] text-[#EF7D01] font-semibold">{event.images.length} Photos</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {event.images.map((imgUrl, imgIdx) => (
                      <div 
                        key={imgIdx} 
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs hover:shadow-md transition-all"
                      >
                        <img 
                          src={imgUrl} 
                          alt={`${event.title} stall exhibition showcase ${imgIdx + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isUpcoming && (
                <div className="pt-2 flex items-center gap-4">
                  <Link to="/contact">
                    <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      Book an In-Person Meeting at Stall {event.stallNumber}
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          );
        })}
      </section>
    </div>
  );
};
