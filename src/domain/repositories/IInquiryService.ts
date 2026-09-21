import { RFQSubmission } from '../entities/RFQItem';

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

export interface InquiryResult {
  success: boolean;
  message: string;
  referenceId?: string;
  whatsappUrl?: string;
}

export interface IInquiryService {
  submitRFQ(submission: RFQSubmission): Promise<InquiryResult>;
  submitContactForm(inquiry: ContactInquiry): Promise<InquiryResult>;
  generateWhatsAppLink(submission: RFQSubmission): string;
}
