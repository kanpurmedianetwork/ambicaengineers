import { IInquiryService, ContactInquiry, InquiryResult } from '../../domain/repositories/IInquiryService';
import { RFQSubmission } from '../../domain/entities/RFQItem';
import { companyData } from '../data/company.data';

export class InquiryServiceImpl implements IInquiryService {
  private whatsappNumber = companyData.contact.whatsappNumber;
  private googleSheetsWebhookUrl = (import.meta as { env?: Record<string, string> }).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';

  async submitRFQ(submission: RFQSubmission): Promise<InquiryResult> {
    try {
      // 1. Store in local storage history
      const key = 'ambica_rfq_submissions';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(submission);
      localStorage.setItem(key, JSON.stringify(existing));

      // 2. Transmit live to Google Sheets Webhook
      if (this.googleSheetsWebhookUrl) {
        try {
          await fetch(this.googleSheetsWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(submission),
          });
        } catch (webhookErr) {
          console.warn('Google Sheets live push warning (non-blocking):', webhookErr);
        }
      }

      const whatsappUrl = this.generateWhatsAppLink(submission);

      return {
        success: true,
        message: 'RFQ inquiry successfully prepared and recorded.',
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
      const ref = `INQ-${Date.now().toString().slice(-6)}`;
      const key = 'ambica_contact_inquiries';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ ...inquiry, ref, date: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));

      // Transmit contact form inquiry live to Google Sheets
      if (this.googleSheetsWebhookUrl) {
        try {
          await fetch(this.googleSheetsWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
              id: ref,
              customerName: inquiry.name,
              companyName: inquiry.company || 'N/A',
              phone: inquiry.phone,
              email: inquiry.email,
              city: '',
              country: 'India',
              currency: 'INR',
              items: [],
              notes: `[Contact Form Subject: ${inquiry.subject}] ${inquiry.message}`,
              submittedAt: new Date().toISOString()
            }),
          });
        } catch (webhookErr) {
          console.warn('Google Sheets contact push warning (non-blocking):', webhookErr);
        }
      }

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
    const lines = [
      `*REQUEST FOR QUOTATION (RFQ) - AMBICA ENGINEERS*`,
      `Ref ID: ${submission.id}`,
      `Date: ${new Date(submission.submittedAt).toLocaleDateString()}`,
      `---------------------------------------`,
      `*CLIENT INFORMATION:*`,
      `Client Name: ${submission.customerName}`,
      `Company: ${submission.companyName}`,
      `Phone: ${submission.phone}`,
      `Email: ${submission.email}`,
      `Location: ${submission.city}${submission.state ? `, ${submission.state}` : ''}${submission.country ? ` (${submission.country})` : ''}`,
      `Preferred Currency: ${submission.currency || 'INR'}`,
      `---------------------------------------`,
      `*COMPONENTS / BOM LIST:*`
    ];

    submission.items.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.productName}*`);
      lines.push(`   Series: ${item.series} | Brand: ${item.brand.toUpperCase()}`);
      lines.push(`   Qty Requested: ${item.quantity} Units`);
      if (item.notes) {
        lines.push(`   Note: ${item.notes}`);
      }
    });

    if (submission.notes) {
      lines.push(`---------------------------------------`);
      lines.push(`*Special Technical Notes:*`);
      lines.push(submission.notes);
    }

    lines.push(`---------------------------------------`);
    lines.push(`Generated via Ambica Engineers Online Portal (www.ambicaengineers.in)`);

    const fullMessage = lines.join('\n');
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
  }
}

export const inquiryService = new InquiryServiceImpl();
