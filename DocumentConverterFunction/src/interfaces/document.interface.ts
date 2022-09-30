export interface DocumentKey {
  registrarId?: number;
  localNumber: number;
}

export interface Document extends DocumentKey {
  registrarId?: number;
  localNumber: number;
  canceled?: boolean;
  clientId?: string;
  data: string;
  fiscalNumber: string;
  revoked?: boolean;
  shiftId?: string;
  type: string;
  uid?: string;
  createdAt?: string;
  deletedAt?: string;
}
