export type TransferStatus = 'completed' | 'pending' | 'failed';

export interface Transfer {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  date: string; // ISO
  status: TransferStatus;
}

export const MOCK_TRANSFERS: Transfer[] = [
  { id: 'TRX-1001', customer: 'Ahmad Ali', amount: 1250.5, currency: 'USD', date: '2026-07-01', status: 'completed' },
  { id: 'TRX-1002', customer: 'Sara Youssef', amount: 890, currency: 'EUR', date: '2026-07-02', status: 'pending' },
  { id: 'TRX-1003', customer: 'Omar Khalid', amount: 3400.75, currency: 'USD', date: '2026-07-03', status: 'completed' },
  { id: 'TRX-1004', customer: 'Layla Hassan', amount: 560.25, currency: 'GBP', date: '2026-07-04', status: 'failed' },
  { id: 'TRX-1005', customer: 'Kareem Nabil', amount: 2100, currency: 'USD', date: '2026-07-05', status: 'pending' },
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'SAR', 'AED'];
