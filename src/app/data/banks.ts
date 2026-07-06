export interface Bank {
  id: string;
  name: string;
  code: string;
  country: string;
  swift: string;
  active: boolean;
}

export const COUNTRIES = ['SA', 'AE', 'KW', 'EG', 'JO', 'QA', 'BH', 'OM'];

export const MOCK_BANKS: Bank[] = [
  { id: 'BNK-01', name: 'National Bank', code: 'NBK', country: 'KW', swift: 'NBOKKWKWXXX', active: true },
  { id: 'BNK-02', name: 'Al Rajhi Bank', code: 'RJHI', country: 'SA', swift: 'RJHISARIXXX', active: true },
  { id: 'BNK-03', name: 'Emirates NBD', code: 'ENBD', country: 'AE', swift: 'EBILAEADXXX', active: true },
  { id: 'BNK-04', name: 'Bank of Egypt', code: 'BOE', country: 'EG', swift: 'BEGYEGCXXXX', active: false },
  { id: 'BNK-05', name: 'Arab Bank', code: 'ARAB', country: 'JO', swift: 'ARABJOAXXXX', active: true },
];
