export class PaySystem {
  date: string;
  time: string;
  transactionId: string; //prn
  authorizationCode: string;
  bankName: string;
  systemName: string;
  epzDetails: string;
  checkNumber: string;
  terminalNumber: string;

  constructor(
    date: string,
    time: string,
    transactionId: string,
    authorizationCode: string,
    bankName: string,
    systemName: string,
    epzDetails: string,
    checkNumber: string,
    terminalNumber: string,
  ) {
    this.date = date;
    this.time = time;
    this.transactionId = transactionId;
    this.authorizationCode = authorizationCode;
    this.bankName = bankName;
    this.systemName = systemName;
    this.epzDetails = epzDetails;
    this.checkNumber = checkNumber;
    this.terminalNumber = terminalNumber;
  }
}
