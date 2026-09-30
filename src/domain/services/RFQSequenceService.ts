/**
 * RFQSequenceService
 * Manages strictly sequential, continuous RFQ numbering (e.g. RFQ-1001, RFQ-1002...)
 * Replaces pseudo-random timestamp hashes with continuous last-followed numbers.
 */

export class RFQSequenceService {
  private static STORAGE_KEY = 'ambica_last_followed_rfq_number';
  private static DEFAULT_INITIAL_NUMBER = 1001;

  /**
   * Retrieve the last recorded sequential RFQ integer.
   */
  static getLastFollowedNumber(): number {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val > 0) return val;
      }

      // Check existing submission history in localStorage
      const history = JSON.parse(localStorage.getItem('ambica_rfq_submissions') || '[]');
      if (Array.isArray(history) && history.length > 0) {
        let max = 0;
        for (const item of history) {
          const match = String(item.id || '').match(/(\d+)/g);
          if (match) {
            const num = parseInt(match[match.length - 1], 10);
            if (num > max && num < 1000000) max = num;
          }
        }
        if (max >= this.DEFAULT_INITIAL_NUMBER) return max;
      }
    } catch {
      // ignore storage access errors
    }
    return this.DEFAULT_INITIAL_NUMBER - 1;
  }

  /**
   * Get the next sequential RFQ ID string (e.g. "RFQ-1001", "RFQ-1002").
   */
  static getNextRFQId(): string {
    const nextNum = this.getLastFollowedNumber() + 1;
    return `RFQ-${nextNum}`;
  }

  /**
   * Commit and persist the used RFQ number to guarantee monotonic progression.
   */
  static commitRFQNumber(rfqId: string): void {
    try {
      const match = rfqId.match(/(\d+)/g);
      if (match) {
        const num = parseInt(match[match.length - 1], 10);
        if (!isNaN(num) && num > 0) {
          localStorage.setItem(this.STORAGE_KEY, String(num));
        }
      }
    } catch {
      // ignore
    }
  }

  /**
   * Explicitly set the last sequence number (allows matching company's existing Google Sheet log).
   */
  static setSequence(num: number): void {
    try {
      if (!isNaN(num) && num > 0) {
        localStorage.setItem(this.STORAGE_KEY, String(num));
      }
    } catch {
      // ignore
    }
  }
}
