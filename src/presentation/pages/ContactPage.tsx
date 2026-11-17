import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Building2, ExternalLink, Navigation, ShieldCheck, MessageSquare, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { companyData } from '../../infrastructure/data/company.data';
import { inquiryService } from '../../infrastructure/repositories/InquiryServiceImpl';
import { COUNTRIES } from '../../infrastructure/data/countries.data';
import { SEOHead } from '../components/common/SEOHead';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [dpdpaConsent, setDpdpaConsent] = useState(false);
  
  // Anti-bot safeguards: Honeypot & Time-gate
  const [botTrap, setBotTrap] = useState('');
  const mountTimeRef = useRef<number>(Date.now());

  const [submitted, setSubmitted] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // 1. Bot Honeypot Check: if the invisible honeypot field is filled, silently discard
    if (botTrap.trim().length > 0) {
      console.warn('[Security Guard] Automated bot submission rejected.');
      setSubmitted(true);
      return;
    }

    // 2. Time-gate Check: reject submissions completed unnaturally fast (< 1.5 seconds)
    const elapsedMs = Date.now() - mountTimeRef.current;
    if (elapsedMs < 1500) {
      console.warn('[Security Guard] Suspicious instant submission blocked.');
      setSubmitted(true);
      return;
    }

    // 3. Phone validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setValidationError('Please provide a valid contact telephone or WhatsApp number (minimum 7 digits).');
      return;
    }

    // 4. DPDPA 2023 Explicit Consent Check
    if (!dpdpaConsent) {
      setValidationError('Please acknowledge the DPDPA 2023 consent checkbox to proceed.');
      return;
    }

    const result = await inquiryService.submitContactForm({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      country: country.trim(),
      city: city.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    if (result.success) {
      setSubmitted(true);
      if (result.referenceId) {
        setSubmittedRefId(result.referenceId);
      }
      if (result.whatsappUrl) {
        setWhatsappUrl(result.whatsappUrl);
        // Automatically open WhatsApp in new tab for direct client engagement
        if (typeof window !== 'undefined') {
          window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
        }
      }
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SEOHead 
        title="Contact Us | Ambica Engineers & Lubricants"
        description="Connect with Ambica Engineers & Lubricants Ltd for hydraulic pumps, proportional valves, press cushion pads, or visit our Noida Experience Centre."
        canonicalPath="/contact"
      />
      {/* Header Banner */}
      <section className="relative bg-[#0A0F1D] text-white border-b border-slate-800 pt-32 pb-16 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Top Glow & Engineering Precision Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(239,125,1,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_60%,transparent_100%)] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EF7D01]/10 border border-[#EF7D01]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
            <Building2 className="w-3.5 h-3.5" />
            Noida Experience Centre &amp; Headquarters
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-display tracking-tight">
            CONTACT &amp; ENGINEERING DESK
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Connect with our senior fluid power engineers for part cross-referencing, custom cushion pad sizing, or same-day dispatch inquiries across India and international industrial markets.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Col: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-5 sm:p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
              <div className="space-y-1.5 overflow-hidden">
                <div className="text-[11px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Corporate Headquarters
                </div>
                <h2 className="text-[clamp(12px,2vw,22px)] font-extrabold text-slate-900 uppercase whitespace-nowrap tracking-tight">
                  Ambica Engineers &amp; Lubricants Ltd
                </h2>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#EF7D01] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Experience Centre &amp; Office:</strong>
                    Floor No: 5th Floor, Plot No. A-143,<br />
                    Sovereign Corporate Tower, Sector 136,<br />
                    Noida, Uttar Pradesh 201304, India
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#EF7D01] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Direct Phone &amp; Helpline:</strong>
                    <a href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-[#EF7D01] font-mono transition-colors">
                      {companyData.contact.primaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#EF7D01] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Official Inquiries &amp; Grievances:</strong>
                    <a href="mailto:info@ambicaengineers.in" className="hover:text-[#EF7D01] font-mono transition-colors">
                      info@ambicaengineers.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <Clock className="w-5 h-5 text-[#EF7D01] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Operating Hours:</strong>
                    Monday – Saturday: 9:30 AM – 6:30 PM (IST)<br />
                    24/7 Emergency Breakdown Support Available
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${companyData.contact.whatsappNumber}?text=${encodeURIComponent('Hello Ambica Engineers, I would like to consult with an application engineer regarding hydraulic parts.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-md shadow-emerald-500/20 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Direct WhatsApp Engineering Desk (+91 76000 25020)
                </a>
              </div>
            </Card>

            {/* Google Map Card with Live Business Location */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm space-y-0">
              <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono font-bold text-[#EF7D01] uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#EF7D01]" />
                    Live Google Maps Location
                  </div>
                  <div className="text-xs font-bold text-slate-900 font-mono">
                    28.5050948° N, 77.3991225° E
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/Ambica+Engineers+%26+Lubricants+Pvt+Ltd/@28.5050948,77.3991225,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfb6fde65dd9b:0xcaf224d0f79b6a4a!8m2!3d28.5050948!4d77.3991225!16s%2Fg%2F11bxfyyngf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#EF7D01] hover:text-[#D66D00] bg-orange-50 hover:bg-orange-100 border border-orange-200/80 px-2.5 py-1.5 rounded-lg transition-colors"
                  title="Open live pin in Google Maps"
                >
                  Open Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Exact Google Map Iframe Pin */}
              <div className="h-64 w-full relative">
                <iframe
                  title="Ambica Engineers & Lubricants Ltd Sovereign Corporate Tower Noida Map"
                  src="https://maps.google.com/maps?q=28.5050948,77.3991225&hl=en&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* One-Click Direct Navigation Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="text-[11px] text-slate-500 font-mono">
                  Sovereign Corporate Tower, Sector 136, Noida
                </span>
                <a
                  href="https://www.google.com/maps/dir//Ambica+Engineers+%26+Lubricants+Pvt+Ltd,+Floor+No:+5th+Floor,+Plot+No.+A-143,+Sovereign+Corporate+Tower,+Sector+136,+Noida,+Uttar+Pradesh+201304/@28.5050948,77.3991225,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#EF7D01] hover:text-[#D66D00] inline-flex items-center gap-1 text-[11px]"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Right Col: Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#EF7D01] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span>Direct WhatsApp Inquiries</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    DPDPA 2023 Aligned
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 uppercase font-mono">
                  Send Us an Inquiry
                </h2>
                <p className="text-xs text-slate-500">
                  Global inquiries welcome. Your message is formatted into a direct WhatsApp dispatch to our senior engineering desk.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">Inquiry Prepared &amp; WhatsApp Opened</h3>
                    {submittedRefId && (
                      <div className="text-xs font-mono font-bold text-[#EF7D01]">
                        Reference: {submittedRefId}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{name}</strong>. Your inquiry details have been packaged into WhatsApp. If WhatsApp did not open automatically, click the button below to connect with our team.
                  </p>

                  {whatsappUrl && (
                    <div className="pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all w-full sm:w-auto"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Open WhatsApp Chat (+91 76000 25020)
                      </a>
                    </div>
                  )}

                  <div className="pt-3 border-t border-emerald-200/80 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Processed under DPDPA 2023 • End-to-End Encrypted Communication</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedRefId('');
                      setName('');
                      setEmail('');
                      setPhone('');
                      setCompany('');
                      setCity('');
                      setSubject('');
                      setMessage('');
                      setDpdpaConsent(false);
                      setBotTrap('');
                      mountTimeRef.current = Date.now();
                    }}
                    className="mt-2"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Anti-bot Honeypot Field (Hidden from real users, filled by naive scrapers) */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="company_website_url">Do not fill this field</label>
                    <input
                      id="company_website_url"
                      type="text"
                      name="company_website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botTrap}
                      onChange={(e) => setBotTrap(e.target.value)}
                    />
                  </div>

                  {validationError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                      {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company / Plant Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Greenpanel / Century Ply / Plant Unit"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* International Country & City Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#EF7D01]" />
                        <span>Country / Region *</span>
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.name} ({c.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">City / Location</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Noida / Dubai / Jakarta / Riyadh"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="purchase@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Subject / Product Requirement *</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Quotation for Rexroth A10VSO 71 / Cushion Pad 4x8 ft"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Message / Operating Parameters *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please mention specific part codes, displacement, working pressure, required quantity, or delivery timeline..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* DPDPA 2023 Explicit Consent Opt-In Notice */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none text-[11px] leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                      <input
                        type="checkbox"
                        required
                        checked={dpdpaConsent}
                        onChange={(e) => setDpdpaConsent(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#EF7D01] focus:ring-[#EF7D01] shrink-0 w-4 h-4 cursor-pointer"
                      />
                      <span>
                        <strong className="text-slate-800">DPDPA 2023 Consent:</strong> I consent to Ambica Engineers &amp; Lubricants Ltd collecting and processing my contact details solely to respond to this commercial inquiry via WhatsApp / Phone, in accordance with the{' '}
                        <a href="/privacy-policy" target="_blank" className="text-[#EF7D01] underline font-medium hover:text-[#D66D00]">
                          DPDPA 2023 Privacy Policy
                        </a>.
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3 text-sm font-semibold justify-center"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Send Inquiry via WhatsApp
                    </Button>
                    <div className="text-center text-[10px] text-slate-400 mt-2">
                      Instant connection to Ambica Technical Sales • Direct WhatsApp link
                    </div>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
