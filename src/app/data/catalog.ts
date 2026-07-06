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
  { id: 'ITM-01', name: 'بيتزا مارغريتا', type: 'good', category: 'بيتزا', price: 45, currency: 'ILS', active: true },
  { id: 'ITM-02', name: 'بيتزا ببروني', type: 'good', category: 'بيتزا', price: 50, currency: 'ILS', active: true },
  { id: 'ITM-03', name: 'كالزوني باللحم', type: 'good', category: 'كالزوني', price: 40, currency: 'ILS', active: true },
  { id: 'ITM-04', name: 'كالزوني بالجبن', type: 'good', category: 'كالزوني', price: 35, currency: 'ILS', active: true },
  { id: 'ITM-05', name: 'تميس تقليدي', type: 'good', category: 'تميس', price: 8, currency: 'ILS', active: true },
  { id: 'ITM-06', name: 'تميس بالجبن', type: 'good', category: 'تميس', price: 12, currency: 'ILS', active: true },
  { id: 'ITM-07', name: 'طلب مناسبات (كيترينغ)', type: 'service', category: 'خدمات', price: 500, currency: 'ILS', active: true },
];
