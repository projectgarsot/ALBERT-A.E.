export enum Section {
  HERO = 'HERO',
  PORTFOLIO = 'PORTFOLIO',
  CRAFT = 'CRAFT',
  FINANCIALS = 'FINANCIALS',
  CONTACT = 'CONTACT'
}

export interface Project {
  id: string;
  title: string;
  category: string;
  technique: string;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  texture: string; // CSS class for texture hint
}

export interface CraftStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export type DocType = 'balance' | 'income';

export interface CompanyDetail {
  label: string;
  value: string;
}

export interface FinancialDoc {
  id: string;
  year: string;
  type: DocType;
  title: string;
  url: string;
}