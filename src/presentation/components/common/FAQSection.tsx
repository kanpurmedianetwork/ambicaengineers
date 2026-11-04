import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquareQuote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQItem } from '../../../infrastructure/data/faq.data';
import { Button } from '../ui/Button';

export interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  showContactCTA?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Direct engineering answers regarding industrial fluid power components, authentic sourcing, dispatch timelines, and technical press applications.",
  badge = "Technical Knowledge Base & FAQ",
  className = "",
  showContactCTA = true,
}) => {
  // First item open by default
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({ 0: true });

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Build FAQPage Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Server-rendered FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
            <HelpCircle className="w-3.5 h-3.5" />
            {badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-4xl mx-auto pt-2">
          {faqs.map((faq, index) => {
            const isOpen = !!openIndexes[index];
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#EF7D01]/50 bg-orange-50/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug flex items-start gap-3">
                    <span className="text-[#EF7D01] font-mono text-xs sm:text-sm pt-0.5 font-extrabold shrink-0">
                      Q{index + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#EF7D01] text-white rotate-180'
                        : 'bg-white border border-slate-200 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150">
                    <div className="pl-7 border-l-2 border-[#EF7D01]/40 space-y-2">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation CTA */}
        {showContactCTA && (
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#EF7D01] shrink-0">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Have a specific fluid power inquiry?</h3>
                <p className="text-xs text-slate-500">Our engineering consultation desk answers technical questions within 2 hours.</p>
              </div>
            </div>
            <Link to="/contact" className="shrink-0">
              <Button size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Ask Our Engineering Team
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default FAQSection;
