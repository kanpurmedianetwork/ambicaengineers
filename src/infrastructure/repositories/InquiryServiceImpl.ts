import { IInquiryService, ContactInquiry, InquiryResult } from '../../domain/repositories/IInquiryService';
import { RFQSubmission } from '../../domain/entities/RFQItem';
import { companyData } from '../data/company.data';
import { RFQSequenceService } from '../../domain/services/RFQSequenceService';

export class InquiryServiceImpl implements IInquiryService {
  private whatsappNumber = companyData.contact.whatsappNumber;

  async submitRFQ(submission: RFQSubmission): Promise<InquiryResult> {
    try {
      // 1. Commit and record sequential RFQ tracking number
      RFQSequenceService.commitRFQNumber(submission.id);

      // 2. Store in client-side session history for verification
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const key = 'ambica_rfq_submissions';
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push(submission);
          localStorage.setItem(key, JSON.stringify(existing));
        } catch {
          // Non-critical local storage fallback
        }
      }

      // 3. Generate direct WhatsApp dispatch link
      const whatsappUrl = this.generateWhatsAppLink(submission);

      return {
        success: true,
        message: 'RFQ successfully recorded and prepared for direct WhatsApp dispatch.',
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
      
      // Store in client-side session history
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const key = 'ambica_contact_inquiries';
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push({ ...inquiry, ref, date: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(existing));
        } catch {
          // Non-critical local storage fallback
        }
      }

      const locationStr = [inquiry.city, inquiry.country || 'India'].filter(Boolean).join(', ');

      const messageText = `*NEW CONTACT INQUIRY - AMBICA ENGINEERS*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*Reference:* ${ref}\n` +
        `*Customer Name:* ${inquiry.name}\n` +
        `*Company / Plant:* ${inquiry.company || 'Not Specified'}\n` +
        `*Country / Location:* ${locationStr}\n` +
        `*Phone / WhatsApp:* ${inquiry.phone}\n` +
        `*Email:* ${inquiry.email}\n` +
        `*Subject:* ${inquiry.subject}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*Message / Operating Parameters:*\n` +
        `${inquiry.message}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Dispatched via Ambica Engineers Live Portal (DPDPA 2023 Consent Confirmed)_`;

      const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(messageText)}`;

      return {
        success: true,
        message: `Thank you, ${inquiry.name}. Your inquiry is ready for WhatsApp dispatch.`,
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
      `*Currency:* ${submission.currency || 'INR'}\n` +
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
      footer += `\n*Application Notes:*\n${submission.notes.trim()}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    footer += `\n_Dispatched via Ambica Engineers Live Portal (DPDPA 2023 Consent Confirmed)_`;

    const fullMessage = `${header}${itemsText}${footer}`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
  }
}

export const inquiryService = new InquiryServiceImpl();
