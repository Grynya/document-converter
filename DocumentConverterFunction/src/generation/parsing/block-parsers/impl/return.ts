import { XmlParser } from '../xmlParser';
import { Document } from '../../../../interfaces/document.interface';
import * as xml from 'xml-parse';

export class Return extends XmlParser {
  sum: string;
  pawnSumIssued: string;
  pawnSumReceived: string;
  numOfCheck: string;
  type: string;
  letter: string;
  prc: string;

  constructor(document: Document) {
    super(document);
    if (
      this.dataParsed.document.getElementsByTagName('ZREPRETURN')[0] !==
      undefined
    ) {
      const XML_ZREPREALIZ_childNodes =
        this.dataParsed.document.getElementsByTagName('ZREPRETURN')[0].innerXML;
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
    }
  }
}
