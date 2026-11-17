import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, UserCheck, AlertCircle, Phone, Mail, Building2, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { companyData } from '../../infrastructure/data/company.data';
import { SEOHead } from '../components/common/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 bg-[#F8FAFC]">
      <SEOHead 
        title="Privacy Policy & DPDPA 2023 Compliance | Ambica Engineers & Lubricants"
        description="Comprehensive Privacy Policy and Digital Personal Data Protection Act (DPDPA), 2023 compliance statement for Ambica Engineers & Lubricants Ltd."
        canonicalPath="/privacy-policy"
      />
      {/* Dark Header Banner for Transparent Nav */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-slate-800 pt-32 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Top Glow & Engineering Precision Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,125,1,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] opacity-80" />
        </div>

        <div className="max-w-5xl mx-auto space-y-3 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EF7D01]/10 border border-[#EF7D01]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
            <ShieldCheck className="w-3.5 h-3.5" />
            DPDPA 2023 Statutory Compliance &amp; Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display tracking-tight">
            Privacy Policy &amp; Data Protection Statement
          </h1>
          <p className="text-xs text-slate-400">
            Aligned with the <span className="text-[#EF7D01] font-semibold">Digital Personal Data Protection Act (DPDPA), 2023</span> (Act No. 22 of 2023, India)
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 space-y-10 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border border-slate-200/90 shadow-sm">
          {/* Statutory Notice Card */}
          <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2 text-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#EF7D01] uppercase tracking-wider">
              <Lock className="w-4 h-4 text-[#EF7D01]" />
              DPDPA 2023 Statutory Notice to Data Principals
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              This Privacy Policy serves as the formal Notice mandated under Section 5 of the Digital Personal Data Protection Act, 2023. By providing your personal and business contact details on <strong className="text-slate-900">www.ambicaengineers.in</strong> or submitting a Request for Quotation (RFQ), you acknowledge that your data will be processed strictly for legitimate commercial inquiry resolution and technical consultation.
            </p>
          </div>

          {/* Section 1: Data Fiduciary Identity */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">1.</span> Data Fiduciary Identification
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023, the <strong className="text-slate-900">&ldquo;Data Fiduciary&rdquo;</strong> responsible for determining the purpose and means of processing your personal data is:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700 font-mono">
              <div className="font-bold text-slate-900 text-sm">Ambica Engineers &amp; Lubricants Ltd</div>
              <div>Corporate Headquarters &amp; Experience Centre:</div>
              <div>5th Floor, Plot No. A-143, Sovereign Corporate Tower, Sector 136, Noida, Uttar Pradesh 201304, India</div>
              <div>Website: <a href="https://www.ambicaengineers.in" className="text-[#EF7D01] underline">www.ambicaengineers.in</a></div>
              <div>Corporate Contact: <a href={`mailto:${companyData.contact.primaryEmail}`} className="text-[#EF7D01]">{companyData.contact.primaryEmail}</a> | {companyData.contact.primaryPhone}</div>
            </div>
          </section>

          {/* Section 2: Grounds for Processing & Consent */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">2.</span> Grounds for Processing &amp; Affirmative Consent (Section 6)
            </h2>
            <p>
              In accordance with Section 6 of the DPDPA 2023, we process personal data exclusively on the basis of your <strong>free, specific, informed, unconditional, and unambiguous consent</strong> signified by an affirmative action (such as ticking the explicit consent checkbox on our inquiry form or RFQ drawer).
            </p>
            <p>
              Your consent may be withdrawn at any time with ease equal to the ease with which it was given, by writing to our designated Grievance Redressal Officer at <a href="mailto:compliance@ambicaengineers.in" className="text-[#EF7D01] underline font-mono">compliance@ambicaengineers.in</a>. The withdrawal of consent does not affect the lawfulness of processing undertaken prior to such withdrawal.
            </p>
          </section>

          {/* Section 3: Categories of Data Collected */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">3.</span> Categories of Personal &amp; Commercial Data Collected
            </h2>
            <p>
              We collect only the minimum personal data strictly necessary to fulfill your technical and commercial inquiries:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong className="text-slate-800">Identity &amp; Contact Details:</strong> Full name, company/plant name, corporate email address, telephone/WhatsApp mobile number, and delivery city/country.</li>
              <li><strong className="text-slate-800">Technical &amp; RFQ Information:</strong> Hydraulic component part codes, pump displacement, working pressure parameters, bill of materials (BOM), required quantities, and specific engineering notes.</li>
              <li><strong className="text-slate-800">Security &amp; Abuse Prevention Metadata:</strong> Client IP address, browser user-agent header, and request timestamps, processed transiently to enforce anti-bot honeypot shields and thwart automated cyber-attacks.</li>
            </ul>
          </section>

          {/* Section 4: Lawful Purpose of Data Processing */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">4.</span> Specified Lawful Purpose of Processing (Section 4 &amp; 5)
            </h2>
            <p>
              Your personal data is collected and processed exclusively for the following specified commercial purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Commercial Quotations
                </div>
                <div className="text-[11px] text-slate-600">
                  Formulating official proforma invoices, pricing schedules, and delivery estimates for hydraulic components.
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Fluid Power Engineering Advice
                </div>
                <div className="text-[11px] text-slate-600">
                  Evaluating circuit operating parameters, interchangeable part recommendations, and European cushion pad sizing.
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Logistics &amp; Dispatch
                </div>
                <div className="text-[11px] text-slate-600">
                  Facilitating courier consignment bookings, same-day dispatches, and warehouse transit tracking across India.
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Emergency Breakdown Support
                </div>
                <div className="text-[11px] text-slate-600">
                  Prioritizing 24/7 technical hotline dispatch for unexpected factory downtime and line shutdowns.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Direct WhatsApp Routing Architecture */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">5.</span> Direct WhatsApp Dispatch &amp; Channel Privacy
            </h2>
            <p>
              To protect customer data against unauthorized third-party harvesting, automated scraping, or unauthenticated spreadsheet webhooks, all website inquiries and BOM schedules are packaged directly into client-to-business communications via WhatsApp (<strong className="font-mono text-slate-900">+91 76000 25020</strong>).
            </p>
            <p>
              WhatsApp messages are protected by WhatsApp&apos;s Signal protocol end-to-end encryption in transit. Once delivered to Ambica Engineers, records are processed exclusively within password-protected, encrypted corporate devices and ERP systems.
            </p>
          </section>

          {/* Section 6: Rights of the Data Principal under DPDPA 2023 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">6.</span> Rights of the Data Principal (Sections 11–14)
            </h2>
            <p>
              As a Data Principal under the Digital Personal Data Protection Act, 2023, you are entitled to exercise the following statutory rights at no cost:
            </p>
            
            <div className="space-y-2.5 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900 block text-xs mb-0.5">A. Right to Access Information (Section 11)</strong>
                <span className="text-[11px] text-slate-600">
                  You have the right to request a concise summary of the personal data processed by us and the identity of any third parties with whom such data has been shared.
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900 block text-xs mb-0.5">B. Right to Correction and Erasure (Section 12)</strong>
                <span className="text-[11px] text-slate-600">
                  You have the right to correct inaccurate or misleading personal data, complete incomplete records, update outdated information, and request the erasure/deletion of your personal data once the commercial inquiry or contract lifecycle has concluded.
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900 block text-xs mb-0.5">C. Right of Grievance Redressal (Section 13)</strong>
                <span className="text-[11px] text-slate-600">
                  You have the right to register grievances with our Grievance Redressal Officer regarding any aspect of personal data processing. If your grievance is not redressed within the statutory period of 30 days, you retain the right to lodge a complaint with the Data Protection Board of India (DPBI).
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900 block text-xs mb-0.5">D. Right to Nominate (Section 14)</strong>
                <span className="text-[11px] text-slate-600">
                  You have the right to nominate any other individual who shall, in the event of death or incapacity of the Data Principal, exercise your rights under the DPDPA 2023.
                </span>
              </div>
            </div>
          </section>

          {/* Section 7: Security Safeguards & Data Retention */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">7.</span> Security Safeguards &amp; Data Retention (Section 8)
            </h2>
            <p>
              Ambica Engineers implements reasonable security safeguards in accordance with Section 8(5) of the DPDPA 2023, including TLS 1.3 cryptographic transport security, anti-bot honeypot traps, strict access permissions, and periodic data audits.
            </p>
            <p>
              Inquiry and quotation records are retained only for the duration required to complete commercial negotiations, service equipment warranties, or comply with statutory Indian tax and accounting obligations (e.g. GST and Companies Act requirements). Once the retention threshold expires, records are permanently purged or anonymized.
            </p>
          </section>

          {/* Section 8: Grievance Redressal Officer */}
          <section className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-slate-900 uppercase font-display flex items-center gap-2">
              <span className="text-[#EF7D01] font-mono">8.</span> Grievance Redressal Officer &amp; Statutory Contact Desk (Section 8(9))
            </h2>
            <p>
              In compliance with Section 8(9) of the Digital Personal Data Protection Act, 2023, Ambica Engineers has designated a Grievance Redressal Officer to address all queries, consent revocations, and data principal rights requests:
            </p>

            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-[#EF7D01] uppercase tracking-wider font-bold">
                    Statutory Grievance Desk
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    Grievance Redressal Officer (DPDPA Desk)
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  30-Day Turnaround Guarantee
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#EF7D01] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Corporate Office:</strong>
                      Ambica Engineers &amp; Lubricants Ltd<br />
                      5th Floor, Plot No. A-143, Sovereign Corporate Tower, Sector 136, Noida, UP 201304, India
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#EF7D01] shrink-0" />
                    <div>
                      <strong className="text-white block">Grievance Email:</strong>
                      <a href="mailto:compliance@ambicaengineers.in" className="text-[#EF7D01] hover:underline font-mono">
                        compliance@ambicaengineers.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#EF7D01] shrink-0" />
                    <div>
                      <strong className="text-white block">Helpline / WhatsApp:</strong>
                      <span className="font-mono text-slate-200">+91 76000 25020</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                All statutory data requests are acknowledged within 48 hours and resolved within thirty (30) calendar days from receipt, in accordance with the DPDPA 2023.
              </div>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
};
