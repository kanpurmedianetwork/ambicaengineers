import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, FileText, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useRFQ } from '../../context/RFQContext';
import { Button } from '../ui/Button';
import { inquiryService } from '../../../infrastructure/repositories/InquiryServiceImpl';
import { RFQSubmission } from '../../../domain/entities/RFQItem';

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
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const handleSubmitRFQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!customerName.trim() || !phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setSubmitting(true);
    const submission: RFQSubmission = {
      id: `RFQ-${Date.now().toString().slice(-6)}`,
      customerName,
      companyName,
      phone,
      email,
      city,
      country,
      currency,
      notes: generalNotes,
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
      setSubmissionSuccess(result.referenceId || submission.id);
      if (result.whatsappUrl) {
        setWhatsAppUrl(result.whatsappUrl);
      }
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
                <h3 className="text-lg font-bold text-slate-900">RFQ Successfully Generated!</h3>
                <p className="text-xs text-slate-600">
                  Your reference ID is <span className="font-mono text-[#EF7D01] font-bold">{submissionSuccess}</span>.
                  Our engineering sales team has received your component requirements.
                </p>

                {whatsAppUrl && (
                  <div className="pt-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#EF7D01] hover:bg-[#D66D00] text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 w-full justify-center transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Forward BOM to Engineering Sales via WhatsApp
                    </a>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmissionSuccess(null);
                    setWhatsAppUrl(null);
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
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1 shrink-0"
                            onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 line-clamp-1">
                              {item.product.name}
                            </div>
                            <div className="text-[11px] text-[#EF7D01] font-mono font-semibold">
                              {item.product.series} • {item.product.brand.toUpperCase()}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
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

                {/* Customer Details Form */}
                <form onSubmit={handleSubmitRFQ} className="space-y-3 pt-4 border-t border-slate-200">
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
                        placeholder="John Doe"
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
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Work Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@acme.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">City / State</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Noida / Dubai"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-700 font-medium block mb-1">Country / Port</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="India / UAE / Germany"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 font-medium block mb-1">Quotation Currency</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['INR', 'USD', 'EUR'] as const).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setCurrency(curr)}
                          className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                            currency === curr
                              ? 'bg-[#EF7D01] text-white border-[#EF7D01] shadow-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                          }`}
                        >
                          {curr === 'INR' ? '₹ INR (Domestic)' : curr === 'USD' ? '$ USD (Export)' : '€ EUR (Global)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 font-medium block mb-1">General Inquiries / Specs</label>
                    <textarea
                      rows={2}
                      value={generalNotes}
                      onChange={(e) => setGeneralNotes(e.target.value)}
                      placeholder="e.g. Need A10VSO 71 DFR1/31R with SAE flange; 2-day delivery needed..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EF7D01] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                      className="w-full py-3 text-sm font-semibold"
                      icon={<Send className="w-4 h-4" />}
                    >
                      {submitting ? 'Generating RFQ...' : 'Submit Official RFQ Quotation'}
                    </Button>
                    <div className="text-[10px] text-slate-500 text-center mt-2">
                      Direct quote dispatch to Ambica Engineers Central Procurement Desk (+91 7600025020).
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
