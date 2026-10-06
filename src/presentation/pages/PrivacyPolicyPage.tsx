import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { companyData } from '../../infrastructure/data/company.data';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 bg-[#F8FAFC]">
      {/* Dark Header Banner for Transparent Nav */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-slate-800 pt-32 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Top Glow & Engineering Precision Grid for Transparent Nav */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,125,1,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] opacity-80" />
        </div>

        <div className="max-w-5xl mx-auto space-y-3 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EF7D01]/10 border border-[#EF7D01]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
            <Lock className="w-3.5 h-3.5" />
            Legal &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display tracking-tight">
            Privacy Policy &amp; Terms of Service
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: March 2026 • <span className="whitespace-nowrap font-medium text-slate-300">Ambica Engineers &amp; Lubricants Ltd</span>
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border border-slate-200/90 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase font-display">
            <span className="text-[#EF7D01] mr-2">1.</span> Overview &amp; Commitment
          </h2>
          <p>
            At <span className="whitespace-nowrap font-medium text-slate-900">Ambica Engineers &amp; Lubricants Ltd</span> (&ldquo;Ambica Engineers&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect the privacy of our industrial clients, procurement managers, and website visitors. This Privacy Policy sets forth our practices regarding the collection, storage, and handling of business and personal information provided through our website (<a href="https://www.ambicaengineers.in" className="text-[#EF7D01] underline">www.ambicaengineers.in</a>) and related inquiry services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase font-display">
            <span className="text-[#EF7D01] mr-2">2.</span> Information We Collect
          </h2>
          <p>
            When you request a quotation, register for technical support, or submit an official Request For Quote (RFQ), we collect the following business details:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Contact details: Name, corporate email address, telephone/WhatsApp number, delivery city/state.</li>
            <li>Company details: Plant name, operating industry, machinery model numbers, and technical specifications.</li>
            <li>BOM Schedule information: Selected part numbers, required quantities, and engineering notes.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase font-display">
            <span className="text-[#EF7D01] mr-2">3.</span> Use of Business Information
          </h2>
          <p>
            We process your information strictly for legitimate commercial purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Preparing formal pricing quotations and commercial proforma invoices.</li>
            <li>Coordinating warehouse logistics and same-day component dispatch.</li>
            <li>Providing manufacturer technical datasheets and warranty registration.</li>
            <li>Communicating scheduled exhibition booth details (e.g. IndiaWood, Matecia, Delhiwood).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase font-display">
            <span className="text-[#EF7D01] mr-2">4.</span> Data Security &amp; Non-Disclosure
          </h2>
          <p>
            Ambica Engineers does not sell, rent, or lease your corporate procurement records to third-party marketing companies. Technical specifications and project requirements are maintained confidentially in adherence to strict industrial trade secret standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 uppercase font-display">
            <span className="text-[#EF7D01] mr-2">5.</span> Contact Information
          </h2>
          <p>
            For inquiries regarding our privacy standards or to update your company contact records, please reach us at:
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs font-mono space-y-1.5 text-slate-700">
            <div className="font-bold text-slate-900 whitespace-nowrap">Ambica Engineers &amp; Lubricants Ltd</div>
            <div>Attn: Compliance &amp; Legal Desk</div>
            <div>5th Floor, Sovereign Corporate Tower, Sector 136, Noida, UP 201304</div>
            <div>Email: <a href={`mailto:${companyData.contact.primaryEmail}`} className="text-[#EF7D01] hover:underline">{companyData.contact.primaryEmail}</a></div>
            <div>Telephone: {companyData.contact.primaryPhone}</div>
          </div>
        </section>
      </Card>
      </div>
    </div>
  );
};
