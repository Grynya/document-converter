import { Crc32 } from '@aws-crypto/crc32';
import * as iconv from 'iconv-lite';

export class ControlNumberService {
  public static getControlNumber(
    date: string,
    time: string,
    documentNumber: number,
    registrarId: number,
    registrarLocalNumber: number,
    offlineSeed?: string,
    sum?: number,
    previousDocumentHash?: string,
  ): number {
    const generated = this.createCheckNumber(
      date,
      time,
      documentNumber,
      registrarId,
      registrarLocalNumber,
      offlineSeed,
      sum,
      previousDocumentHash,
    );
    let crc32 = generated;
    if (generated == 0) crc32 = 1;
    let checkNumber = crc32.toString();
    if (checkNumber.length >= 4) {
      checkNumber = checkNumber.substring(checkNumber.length - 4);
    }

    return parseInt(checkNumber);
  }
  public static createCheckNumber(
    date: string,
    time: string,
    documentNumber: number,
    registrarId: number,
    registrarLocalNumber: number,
    offlineSeed?: string,
    sum?: number,
    previousDocumentHash?: string,
  ): number {
    let line = [
      date,
      time,
      documentNumber.toString(),
      registrarId.toString(),
      registrarLocalNumber.toString(),
    ].join(',');
    if (offlineSeed) line = offlineSeed + ',' + line;
    if (sum) line += ',' + sum;
    if (previousDocumentHash) line += ',' + previousDocumentHash;
    const buf = iconv.encode(line, 'win1251');
    const tmp = new Crc32().update(buf).digest();
    return ControlNumberService.reverseBytes(tmp) >>> 0;
  }
  private static reverseBytes(i) {
    return (i << 24) | ((i & 0xff00) << 8) | ((i >>> 8) & 0xff00) | (i >>> 24);
  }
}
