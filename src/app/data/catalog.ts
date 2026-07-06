export type CatalogType = 'service' | 'good';

export interface CatalogItem {
  id: string;
  name: string;
  type: CatalogType;
  category: string;
  price: number;
  currency: string;
  active: boolean;
}

export const MOCK_CATALOG: CatalogItem[] = [
  { id: 'ITM-01', name: 'Mobile Phone Repair', type: 'service', category: 'Electronics', price: 45, currency: 'USD', active: true },
  { id: 'ITM-02', name: 'Grocery Package', type: 'good', category: 'Groceries', price: 60, currency: 'USD', active: true },
  { id: 'ITM-03', name: 'Consulting Session', type: 'service', category: 'Consulting', price: 120, currency: 'USD', active: true },
  { id: 'ITM-04', name: 'Laptop - Dell XPS 13', type: 'good', category: 'Electronics', price: 950, currency: 'USD', active: true },
  { id: 'ITM-05', name: 'Home Cleaning Service', type: 'service', category: 'Home Services', price: 35, currency: 'USD', active: false },
];
