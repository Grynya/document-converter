import { RegistrarInfo } from '../registrar.info.interface';

export class RegistrarInfoImpl implements RegistrarInfo {
  companyName: string;
  ipn: string;
  localNumber: number;
  pointAddress: string;
  pointName: string;
  registrarId: number;
  tin: string;

  constructor(
    companyName: string,
    ipn: string,
    localNumber: number,
    pointAddress: string,
    pointName: string,
    registrarId: number,
    tin: string,
  ) {
    this.companyName = companyName;
    this.ipn = ipn;
    this.localNumber = localNumber;
    this.pointAddress = pointAddress;
    this.pointName = pointName;
    this.registrarId = registrarId;
    this.tin = tin;
  }
}
