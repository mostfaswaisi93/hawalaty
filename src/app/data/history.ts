export type TxnStatus = 'completed' | 'pending' | 'failed';
export type TxnDirection = 'in' | 'out';

export interface HistoryTxn {
  ref: string;
  party: string;
  noteKey: string;
  typeKey: string;
  date: string; // ISO
  status: TxnStatus;
  amount: number;
  currency: string;
  direction: TxnDirection;
  icon: string;
}

export const MOCK_HISTORY: HistoryTxn[] = [
  { ref: 'TX-90231', party: 'Amazon Global', noteKey: 'dashboard.transactions.online', typeKey: 'dashboard.transactions.direct', date: '2026-07-04', status: 'completed', amount: 145000, currency: 'IQD', direction: 'out', icon: 'shopping_bag' },
  { ref: 'TX-90230', party: 'Rafidain Bank', noteKey: 'dashboard.transactions.incoming', typeKey: 'dashboard.transactions.bankTransfer', date: '2026-07-02', status: 'completed', amount: 2500000, currency: 'IQD', direction: 'in', icon: 'account_balance' },
  { ref: 'TX-90228', party: 'Jasim Abbas', noteKey: 'dashboard.transactions.expenseShare', typeKey: 'dashboard.transactions.requestType', date: '2026-06-29', status: 'pending', amount: 50000, currency: 'IQD', direction: 'out', icon: 'group' },
  { ref: 'TX-90225', party: 'Sara Ali', noteKey: 'dashboard.scheduled.rent', typeKey: 'dashboard.transactions.bankTransfer', date: '2026-06-25', status: 'completed', amount: 500000, currency: 'IQD', direction: 'out', icon: 'home' },
  { ref: 'TX-90221', party: 'Electricity Co.', noteKey: 'dashboard.scheduled.utilities', typeKey: 'dashboard.transactions.direct', date: '2026-06-22', status: 'failed', amount: 75250, currency: 'IQD', direction: 'out', icon: 'bolt' },
  { ref: 'TX-90218', party: 'Ali Hassan', noteKey: 'dashboard.transactions.incoming', typeKey: 'dashboard.transactions.requestType', date: '2026-06-18', status: 'completed', amount: 320000, currency: 'IQD', direction: 'in', icon: 'person' },
  { ref: 'TX-90214', party: 'Emirates NBD', noteKey: 'dashboard.transactions.incoming', typeKey: 'dashboard.transactions.bankTransfer', date: '2026-06-14', status: 'completed', amount: 1800000, currency: 'IQD', direction: 'in', icon: 'account_balance' },
  { ref: 'TX-90210', party: 'Reem Hamad', noteKey: 'dashboard.transactions.expenseShare', typeKey: 'dashboard.transactions.requestType', date: '2026-06-10', status: 'pending', amount: 90000, currency: 'IQD', direction: 'out', icon: 'group' },
  { ref: 'TX-90205', party: 'Mohammed Jasim', noteKey: 'dashboard.transactions.online', typeKey: 'dashboard.transactions.direct', date: '2026-06-05', status: 'completed', amount: 210000, currency: 'IQD', direction: 'out', icon: 'shopping_bag' },
  { ref: 'TX-90201', party: 'Layla Ahmad', noteKey: 'dashboard.transactions.incoming', typeKey: 'dashboard.transactions.bankTransfer', date: '2026-06-01', status: 'completed', amount: 640000, currency: 'IQD', direction: 'in', icon: 'person' },
];
