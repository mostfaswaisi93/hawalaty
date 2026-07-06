export type TransferStatus = 'completed' | 'pending' | 'failed';

export interface Transfer {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  date: string; // ISO
  status: TransferStatus;
  /** What the customer purchased, if this transfer is tied to a catalog item. */
  itemName?: string;
}

export const MOCK_TRANSFERS: Transfer[] = [
  { id: 'TRX-1001', customer: 'Ahmad Ali', amount: 1250.5, currency: 'USD', date: '2026-07-01', status: 'completed', itemName: 'بيتزا مارغريتا' },
  { id: 'TRX-1002', customer: 'Sara Youssef', amount: 890, currency: 'ILS', date: '2026-07-02', status: 'pending' },
  { id: 'TRX-1003', customer: 'Omar Khalid', amount: 3400.75, currency: 'USD', date: '2026-07-03', status: 'completed' },
  { id: 'TRX-1004', customer: 'Layla Hassan', amount: 560.25, currency: 'ILS', date: '2026-07-04', status: 'failed', itemName: 'كالزوني باللحم' },
  { id: 'TRX-1005', customer: 'Kareem Nabil', amount: 2100, currency: 'USD', date: '2026-07-05', status: 'pending' },
];

/** The platform only supports Shekel and Dollar — by explicit business decision, no other currencies. */
export const CURRENCIES = ['ILS', 'USD'];
