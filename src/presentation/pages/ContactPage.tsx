import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Building2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { companyData } from '../../infrastructure/data/company.data';
import { inquiryService } from '../../infrastructure/repositories/InquiryServiceImpl';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await inquiryService.submitContactForm({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    if (result.success) {
      setSubmitted(true);
      if (result.whatsappUrl) {
        setWhatsappUrl(result.whatsappUrl);
      }
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A0F1D] border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#EF7D01]/10 border border-[#EF7D01]/30 px-3.5 py-1 rounded-full text-xs font-semibold text-[#EF7D01]">
            <Building2 className="w-3.5 h-3.5" />
            Noida Experience Centre &amp; Headquarters
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-mono tracking-tight">
            CONTACT &amp; ENGINEERING DESK
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Connect with our senior fluid power engineers for part cross-referencing, custom cushion pad sizing, or same-day dispatch inquiries.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Col: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#EF7D01] uppercase tracking-wider">
                  Corporate Headquarters
                </div>
                <h2 className="text-2xl font-bold text-slate-900 uppercase font-mono">
                  Ambica Engineers India Limited
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
                    <strong className="text-slate-900 block text-sm">Direct Phone &amp; WhatsApp:</strong>
                    <a href={`tel:${companyData.contact.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-[#EF7D01] font-mono transition-colors">
                      {companyData.contact.primaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#EF7D01] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block text-sm">Official Inquiries:</strong>
                    <a href={`mailto:${companyData.contact.primaryEmail}`} className="hover:text-[#EF7D01] font-mono transition-colors">
                      {companyData.contact.primaryEmail}
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
                  href={`https://wa.me/${companyData.contact.whatsappNumber}?text=${encodeURIComponent('Hello Ambica Engineers, I would like to consult with an engineer regarding hydraulic parts.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#EF7D01] hover:bg-[#D66D00] text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-md shadow-orange-500/20 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Direct WhatsApp Engineering Chat
                </a>
              </div>
            </Card>

            {/* Google Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 h-64 shadow-sm">
              <iframe
                title="Ambica Engineers Sovereign Corporate Tower Noida Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2625895744883!2d77.38289567549605!3d28.501726075735043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce7cb146603a1%3A0xe54955b2cae51f8a!2sSovereign%20Corporate%20Tower!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Col: Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 space-y-6 bg-white border border-slate-200/90 shadow-sm">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#EF7D01] font-bold uppercase tracking-wider">
                  Technical Inquiry &amp; RFQ
                </div>
                <h2 className="text-2xl font-bold text-slate-900 uppercase font-mono">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs text-slate-500">
                  Our application engineering team typically responds within 2-4 hours on business days.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">Inquiry Received</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {name}. Your message has been logged in our system and forwarded to the appropriate technical sales team.
                  </p>
                  {whatsappUrl && (
                    <div className="pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#EF7D01] hover:bg-[#D66D00] text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Also send via WhatsApp for urgent response
                      </a>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setCompany('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="mt-4"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company / Plant Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Century Ply / Greenpanel / ABC Manufacturing"
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
                        placeholder="procurement@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Subject / Product of Interest *</label>
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
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please include part numbers, working pressure, required quantity, or delivery timeline..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3 text-sm font-semibold"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Submit Technical Inquiry
                    </Button>
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
