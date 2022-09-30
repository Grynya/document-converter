import { HeadParser } from '../parsing/block-parsers/impl/head.parser';
import { HtmlComponent as html } from './html.component';

export class Header {
  public static getHeader(doc: HeadParser): object[] {
    const res: object[] = [];
    if (doc.type) res.push(html.getCentralizedText(doc.type));
    if (doc.registrarInfo.companyName) {
      res.push(html.getCentralizedText(doc.registrarInfo.companyName));
    }
    if (doc.registrarInfo.pointName) {
      res.push(html.getCentralizedText(doc.registrarInfo.pointName));
    }
    if (doc.registrarInfo.pointAddress) {
      res.push(html.getCentralizedText(doc.registrarInfo.pointAddress));
    }
    res.push(html.getIpnTinRow(doc.registrarInfo.ipn, doc.registrarInfo.tin));
    return res;
  }
}
