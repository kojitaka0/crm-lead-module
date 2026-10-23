export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'CLOSED';

export interface Lead {
  id: string;
  title: string;
  budget: number;
  contactEmail: string;
  status: LeadStatus;
  createdAt: string;
}

export type CreateLeadDto = Omit<Lead, 'id' | 'createdAt'>;
