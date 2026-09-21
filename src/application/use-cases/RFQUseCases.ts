import { IInquiryService, ContactInquiry, InquiryResult } from '../../domain/repositories/IInquiryService';
import { RFQSubmission } from '../../domain/entities/RFQItem';

export class RFQUseCases {
  constructor(private inquiryService: IInquiryService) {}

  async submitRFQ(submission: RFQSubmission): Promise<InquiryResult> {
    if (!submission.items || submission.items.length === 0) {
      return {
        success: false,
        message: 'Cannot submit an RFQ with zero items.'
      };
    }
    if (!submission.customerName || !submission.phone) {
      return {
        success: false,
        message: 'Customer name and phone number are required.'
      };
    }
    return this.inquiryService.submitRFQ(submission);
  }

  async submitContact(inquiry: ContactInquiry): Promise<InquiryResult> {
    if (!inquiry.name || !inquiry.email || !inquiry.phone) {
      return {
        success: false,
        message: 'Name, email, and phone number are required.'
      };
    }
    return this.inquiryService.submitContactForm(inquiry);
  }

  getWhatsAppLink(submission: RFQSubmission): string {
    return this.inquiryService.generateWhatsAppLink(submission);
  }
}
