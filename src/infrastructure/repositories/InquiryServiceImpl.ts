import { IInquiryService, ContactInquiry, InquiryResult } from '../../domain/repositories/IInquiryService';
import { RFQSubmission } from '../../domain/entities/RFQItem';
import { companyData } from '../data/company.data';
import { RFQSequenceService } from '../../domain/services/RFQSequenceService';

export class InquiryServiceImpl implements IInquiryService {
  private whatsappNumber = companyData.contact.whatsappNumber;
  private webhookEndpoints = [
    'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec',
    'https://script.google.com/a/macros/ambicapanels.com/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec'
  ];

  /**
   * Dispatches payload to Google Sheets Apps Script webhooks using both
   * Beacon API (failsafe background transmission) and Fetch API with keepalive.
   */
  private async transmitToGoogleSheets(payload: Record<string, unknown>): Promise<void> {
    const rawJson = JSON.stringify(payload);

    for (const url of this.webhookEndpoints) {
      try {
        // Strategy 1: Navigator sendBeacon (immune to unload/cross-origin redirect aborts)
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          const blob = new Blob([rawJson], { type: 'text/plain;charset=utf-8' });
          navigator.sendBeacon(url, blob);
        }

        // Strategy 2: Fetch API with no-cors and keepalive
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: rawJson,
        });

        console.info(`[Google Sheets Sync] Live sync dispatched for ${payload.id || payload.ref} to: ${url}`);
      } catch (err) {
        console.warn(`[Google Sheets Sync] Sync attempt note for ${url}:`, err);
      }
    }
  }

  async submitRFQ(submission: RFQSubmission): Promise<InquiryResult> {
    try {
      // 1. Commit and record the sequential number
      RFQSequenceService.commitRFQNumber(submission.id);

      // 2. Store in local storage history
      const key = 'ambica_rfq_submissions';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(submission);
      localStorage.setItem(key, JSON.stringify(existing));

      // 3. Format comprehensive items breakdown
      const itemsSummary = submission.items
        .map((item, idx) => `${idx + 1}. ${item.productName} (${item.series || item.brand || ''}) - Qty: ${item.quantity}${item.notes ? ` [Notes: ${item.notes}]` : ''}`)
        .join('\n');

      const itemsListComma = submission.items
        .map(i => `${i.productName} (x${i.quantity})`)
        .join(', ');

      const rawPhone = submission.phone.trim();
      const safePhone = rawPhone.startsWith('+') ? `'${rawPhone}` : rawPhone;

      // 4. Build enriched payload supporting all common sheet column header names
      const enrichedPayload = {
        // ID variations
        id: submission.id,
        rfqId: submission.id,
        referenceId: submission.id,
        ref: submission.id,
        rfqNumber: submission.id,

        // Customer & Company variations
        customerName: submission.customerName,
        name: submission.customerName,
        clientName: submission.customerName,
        companyName: submission.companyName || 'N/A',
        company: submission.companyName || 'N/A',

        // Contact variations
        phone: safePhone,
        mobile: safePhone,
        contact: safePhone,
        contactNumber: safePhone,
        email: submission.email || 'N/A',

        // Location & Currency
        city: submission.city || '',
        country: submission.country || 'India',
        location: [submission.city, submission.country].filter(Boolean).join(', '),
        currency: submission.currency || 'INR',

        // Items representation
        items: submission.items,
        products: itemsListComma,
        itemsList: itemsSummary,
        itemsText: itemsSummary,
        totalQuantity: submission.items.reduce((sum, item) => sum + item.quantity, 0),

        // Remarks & Notes variations
        notes: submission.notes || '',
        message: submission.notes || '',
        remarks: submission.notes || '',

        // Timestamp variations
        submittedAt: submission.submittedAt || new Date().toISOString(),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
        time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),

        // Summary column
        summary: `RFQ ${submission.id} | ${submission.customerName} (${submission.phone}) | ${submission.companyName} | ${itemsListComma}`
      };

      // 5. Transmit live to Google Sheets
      await this.transmitToGoogleSheets(enrichedPayload);

      const whatsappUrl = this.generateWhatsAppLink(submission);

      return {
        success: true,
        message: 'RFQ inquiry successfully recorded and synchronized.',
        referenceId: submission.id,
        whatsappUrl
      };
    } catch {
      return {
        success: false,
        message: 'Could not process RFQ submission.'
      };
    }
  }

  async submitContactForm(inquiry: ContactInquiry): Promise<InquiryResult> {
    try {
      const ref = `INQ-${RFQSequenceService.getLastFollowedNumber() + 1}`;
      const key = 'ambica_contact_inquiries';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ ...inquiry, ref, date: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));

      const rawPhone = inquiry.phone.trim();
      const safePhone = rawPhone.startsWith('+') ? `'${rawPhone}` : rawPhone;

      const contactPayload = {
        id: ref,
        rfqId: ref,
        referenceId: ref,
        ref: ref,
        customerName: inquiry.name,
        name: inquiry.name,
        companyName: inquiry.company || 'N/A',
        company: inquiry.company || 'N/A',
        phone: safePhone,
        mobile: safePhone,
        contact: safePhone,
        email: inquiry.email,
        city: '',
        country: 'India',
        currency: 'INR',
        items: [],
        products: `Contact Inquiry: ${inquiry.subject}`,
        itemsList: inquiry.message,
        notes: `[Subject: ${inquiry.subject}] ${inquiry.message}`,
        message: inquiry.message,
        remarks: inquiry.subject,
        submittedAt: new Date().toISOString(),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
        time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      await this.transmitToGoogleSheets(contactPayload);

      const messageText = `*New Contact Inquiry - Ambica Engineers*\n` +
        `Ref: ${ref}\n` +
        `Name: ${inquiry.name}\n` +
        `Company: ${inquiry.company || 'N/A'}\n` +
        `Phone: ${inquiry.phone}\n` +
        `Email: ${inquiry.email}\n` +
        `Subject: ${inquiry.subject}\n` +
        `Message: ${inquiry.message}`;

      const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(messageText)}`;

      return {
        success: true,
        message: `Thank you, ${inquiry.name}. Your inquiry has been registered.`,
        referenceId: ref,
        whatsappUrl
      };
    } catch {
      return {
        success: false,
        message: 'Error submitting contact inquiry.'
      };
    }
  }

  generateWhatsAppLink(submission: RFQSubmission): string {
    const header = `*NEW RFQ INQUIRY - AMBICA ENGINEERS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Reference:* ${submission.id}\n` +
      `*Customer:* ${submission.customerName}\n` +
      `*Company:* ${submission.companyName || 'Not specified'}\n` +
      `*Phone:* ${submission.phone}\n` +
      `*Email:* ${submission.email || 'Not specified'}\n` +
      `*Location:* ${[submission.city, submission.country].filter(Boolean).join(', ')}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*BOM SCHEDULE / COMPONENTS:*\n`;

    const itemsText = submission.items.map((item, idx) => {
      let line = `${idx + 1}. *${item.productName}*\n` +
                 `   • Series/Spec: ${item.series || 'Standard OEM'}\n` +
                 `   • Brand: ${(item.brand || 'Ambica').toUpperCase()}\n` +
                 `   • Quantity: ${item.quantity} Unit(s)`;
      if (item.notes && item.notes.trim()) {
        line += `\n   • Notes: _${item.notes.trim()}_`;
      }
      return line;
    }).join('\n\n');

    let footer = `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    if (submission.notes && submission.notes.trim()) {
      footer += `\n*General Remarks:*\n${submission.notes.trim()}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    footer += `\n_Generated via Ambica Engineers Live Portal_`;

    const fullMessage = `${header}${itemsText}${footer}`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
  }
}

export const inquiryService = new InquiryServiceImpl();
