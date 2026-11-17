import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, Send, FileText, CheckCircle2, ShoppingBag, Hash, MessageSquare, ShieldCheck, Globe } from 'lucide-react';
import { useRFQ } from '../../context/RFQContext';
import { Button } from '../ui/Button';
import { inquiryService } from '../../../infrastructure/repositories/InquiryServiceImpl';
import { RFQSubmission } from '../../../domain/entities/RFQItem';
import { RFQSequenceService } from '../../../domain/services/RFQSequenceService';
import { COUNTRIES } from '../../../infrastructure/data/countries.data';

export const RFQDrawer: React.FC = () => {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, updateNotes, clearRFQ } = useRFQ();
  
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('India');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');
  const [generalNotes, setGeneralNotes] = useState('');
  const [dpdpaConsent, setDpdpaConsent] = useState(false);
  
  // Anti-bot safeguards: Honeypot & Time-gate
  const [botTrap, setBotTrap] = useState('');
  const mountTimeRef = useRef<number>(Date.now());
  const [validationError, setValidationError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  // Sequential RFQ tracking (strictly automated - no manual editing)
  const [currentRfqId, setCurrentRfqId] = useState<string>('');

  useEffect(() => {
    if (isDrawerOpen) {
      const nextId = RFQSequenceService.getNextRFQId();
      setCurrentRfqId(nextId);
      mountTimeRef.current = Date.now();
      setValidationError(null);
    }
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleCountryChange = (selectedCountryName: string) => {
    setCountry(selectedCountryName);
    // Suggest USD/EUR for international destinations outside India
    if (selectedCountryName !== 'India') {
      if (currency === 'INR') {
        setCurrency('USD');
      }
    } else {
      setCurrency('INR');
    }
  };

  const handleSubmitRFQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (items.length === 0) {
      setValidationError('Your RFQ schedule is empty. Please add components first.');
      return;
    }

    // 1. Anti-bot honeypot check
    if (botTrap.trim().length > 0) {
      console.warn('[Security Guard] Automated bot RFQ submission blocked.');
      setSubmissionSuccess(currentRfqId || RFQSequenceService.getNextRFQId());
      return;
    }

    // 2. Anti-bot time-gate check (< 1.5 seconds)
    const elapsedMs = Date.now() - mountTimeRef.current;
    if (elapsedMs < 1500) {
      console.warn('[Security Guard] Suspicious instant RFQ submission blocked.');
      setSubmissionSuccess(currentRfqId || RFQSequenceService.getNextRFQId());
      return;
    }

    if (!customerName.trim() || !phone.trim()) {
      setValidationError('Please provide your name and contact phone number.');
      return;
    }

    // 3. Phone validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setValidationError('Please provide a valid contact telephone or WhatsApp number (minimum 7 digits).');
      return;
    }

    // 4. DPDPA 2023 Explicit Consent
    if (!dpdpaConsent) {
      setValidationError('Please acknowledge the DPDPA 2023 consent checkbox to proceed.');
      return;
    }

    setSubmitting(true);
    const finalId = currentRfqId || RFQSequenceService.getNextRFQId();

    const submission: RFQSubmission = {
      id: finalId,
      customerName: customerName.trim(),
      companyName: companyName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      country: country.trim(),
      currency,
      notes: generalNotes.trim(),
      items: items.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        series: i.product.series,
        brand: i.product.brand,
        quantity: i.quantity,
        notes: i.notes
      })),
      submittedAt: new Date().toISOString()
    };

    const result = await inquiryService.submitRFQ(submission);
    setSubmitting(false);

    if (result.success) {
      RFQSequenceService.commitRFQNumber(finalId);
      setSubmissionSuccess(finalId);
      if (result.whatsappUrl) {
        setWhatsAppUrl(result.whatsappUrl);
        // Direct to WhatsApp popup
        if (typeof window !== 'undefined') {
          window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
        }
      }
      // Prepare next consecutive RFQ number
      setCurrentRfqId(RFQSequenceService.getNextRFQId());
      clearRFQ();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#0A0F1D]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#EF7D01]" />
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  Request For Quote (RFQ)
                </h2>
                <div className="text-xs text-slate-400">
                  {items.length} Component{items.length === 1 ? '' : 's'} in BOM Schedule
                </div>
              </div>
            </div>
            <button 
              onClick={closeDrawer}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submissionSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">RFQ Generated &amp; Routed to WhatsApp!</h3>
                  <div className="text-xs text-slate-600">
                    Sequential reference: <span className="font-mono text-[#EF7D01] font-bold text-sm">{submissionSuccess}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your complete BOM breakdown has been packaged and opened directly in WhatsApp for immediate pricing by our application engineering team.
                </p>

                {whatsAppUrl && (
                  <div className="pt-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md shadow-emerald-500/20 w-full justify-center transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Forward BOM to Engineering Sales via WhatsApp
                    </a>
                  </div>
                )}

                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DPDPA 2023 Aligned • Direct Engineering Communication</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmissionSuccess(null);
                    setWhatsAppUrl(null);
                    setDpdpaConsent(false);
                    closeDrawer();
                  }}
                  className="w-full mt-2"
                >
                  Close Window
                </Button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                <div className="text-slate-800 font-semibold">Your RFQ Schedule is Empty</div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our hydraulic pumps, motors, valves, or cushion pads and click &quot;Add to RFQ&quot; to build your component inquiry.
                </p>
                <Button variant="outline" size="sm" onClick={closeDrawer}>
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <span>Selected Components</span>
                    <button 
                      onClick={clearRFQ} 
                      className="text-rose-500 hover:text-rose-600 text-[11px] underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5 flex-1">
                          <div className="text-[10px] font-mono text-[#EF7D01] font-semibold uppercase">
                            {item.product.series} • {item.product.brand.toUpperCase()}
                          </div>
                          <div className="text-xs font-bold text-slate-900 leading-snug">
                            {item.product.name}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          title="Remove component"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                        <div className="flex items-center border border-slate-200 bg-white rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-slate-900 px-2">
                            {item.quantity} Qty
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Spec / Model note..."
                          value={item.notes || ''}
                          onChange={(e) => updateNotes(item.product.id, e.target.value)}
                          className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] w-44"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sequential RFQ Reference Banner (Strictly Automated Tracking) */}
                <div className="bg-orange-50/80 border border-orange-200/90 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                        <Hash className="w-3 h-3 text-[#EF7D01]" />
                        Sequential RFQ Reference
                      </div>
                      <div className="text-base font-extrabold font-mono text-[#EF7D01]">
                        {currentRfqId || RFQSequenceService.getNextRFQId()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider inline-flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-emerald-700" />
                        Direct WhatsApp
                      </span>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        Auto-Assigned Sequence
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Details Form */}
                <form onSubmit={handleSubmitRFQ} className="space-y-3 pt-2 border-t border-slate-200">
                  {/* Anti-bot Honeypot Field */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
                    <input
                      type="text"
                      name="rfq_hp_check"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botTrap}
                      onChange={(e) => setBotTrap(e.target.value)}
                    />
                  </div>

                  {validationError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
                      {validationError}
                    </div>
                  )}

                  <div className="text-xs font-semibold text-[#EF7D01] uppercase tracking-wider">
                    Contact &amp; Delivery Information
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Company / Plant</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Panels Ltd"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@acme.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">City / Region</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Dubai / Noida"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[11px] text-slate-700 font-medium block mb-1 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-[#EF7D01]" />
                        Country *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.name} ({c.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Currency</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD' | 'EUR')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 font-medium block mb-1">Application Notes / Requirements</label>
                    <textarea
                      rows={2}
                      value={generalNotes}
                      onChange={(e) => setGeneralNotes(e.target.value)}
                      placeholder="e.g. Need A10VSO 71 DFR1/31R with SAE flange; urgent delivery required..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* DPDPA 2023 Explicit Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] leading-relaxed text-slate-600 bg-orange-50/60 p-2.5 rounded-lg border border-orange-200/70 hover:border-orange-300 transition-colors">
                      <input
                        type="checkbox"
                        required
                        checked={dpdpaConsent}
                        onChange={(e) => setDpdpaConsent(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#EF7D01] focus:ring-[#EF7D01] shrink-0 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>
                        <strong className="text-slate-800">DPDPA 2023 Consent:</strong> I agree to Ambica Engineers &amp; Lubricants Ltd processing my contact and BOM details to generate quotations via WhatsApp in accordance with the{' '}
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
                      size="md"
                      disabled={submitting}
                      className="w-full justify-center"
                      icon={<Send className="w-4 h-4" />}
                    >
                      {submitting ? 'Preparing WhatsApp Dispatch...' : `Submit RFQ via WhatsApp (${currentRfqId || RFQSequenceService.getNextRFQId()})`}
                    </Button>
                    <div className="text-center text-[10px] text-slate-400 mt-1.5">
                      Direct WhatsApp Transmission • Pan-India &amp; Global Export Inquiries
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
