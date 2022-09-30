export interface RegistrarInfoKey {
  registrarId: number;
}

export interface RegistrarInfo extends RegistrarInfoKey {
  entityId?: string;
  registrarId: number;
  localNumber?: number;
  companyName?: string;
  pointName?: string;
  pointAddress?: string;
  name?: string;
  ipn?: string;
  tin?: string;
  closed?: string;
  test?: string;
  clientId?: string;
}
