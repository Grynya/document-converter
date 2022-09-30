import { Document } from '../../../../interfaces/document.interface';
import { XmlParser } from '../xmlParser';
import * as xml from 'xml-parse';
import { PayForm } from '../../xml-components/pay.form';

export class Realization extends XmlParser {
  sum: string;
  pawnSumIssued: string;
  pawnSumReceived: string;
  numOfCheck: string;
  type: string;
  letter: string;
  prc: string;
  payForms: PayForm[];

  constructor(document: Document) {
    super(document);
    this.payForms = [];
    if (
      this.dataParsed.document.getElementsByTagName('ZREPREALIZ')[0] !==
      undefined
    ) {
      const XML_ZREPREALIZ_childNodes =
        this.dataParsed.document.getElementsByTagName('ZREPREALIZ')[0].innerXML;
      const parsed_realiz = new xml.DOM(xml.parse(XML_ZREPREALIZ_childNodes));
      this.sum = parsed_realiz.document.getElementsByTagName('SUM')[0].innerXML;
      this.numOfCheck =
        parsed_realiz.document.getElementsByTagName('ORDERSCNT')[0].innerXML;
      this.pawnSumIssued =
        parsed_realiz.document.getElementsByTagName('PWNSUMISSUED')[0].innerXML;
      this.pawnSumReceived =
        parsed_realiz.document.getElementsByTagName(
          'PWNSUMRECEIVED',
        )[0].innerXML;
      this.type =
        parsed_realiz.document.getElementsByTagName('NAME')[0].innerXML;
      this.letter =
        parsed_realiz.document.getElementsByTagName('LETTER')[0].innerXML;
      this.prc = parsed_realiz.document.getElementsByTagName('PRC')[0].innerXML;
      this.setPayForms(parsed_realiz);
    }
  }
  public setPayForms(parsed_realiz): void {
    if (parsed_realiz.document.getElementsByTagName('PAYFORMS').length !== 0) {
      const parsed_payForms = new xml.DOM(
        xml.parse(
          parsed_realiz.document.getElementsByTagName('PAYFORMS')[0].innerXML,
        ),
      );
      for (const payForm of parsed_payForms.document.getElementsByTagName(
        'ROW',
      )) {
        const parsed_payForm = new xml.DOM(xml.parse(payForm.innerXML));
        this.payForms.push(
          new PayForm(
            super.getByTagNameFromDoc('PAYFORMNM', parsed_payForm),
            super.getByTagNameFromDoc('SUM', parsed_payForm),
          ),
        );
      }
    }
  }
}
