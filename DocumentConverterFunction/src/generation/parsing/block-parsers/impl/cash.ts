import { Document } from '../../../../interfaces/document.interface';
import { XmlParser } from '../xmlParser';
import * as xml from 'xml-parse';

export class Cash extends XmlParser {
  sum: string;
  numOfCheck: string;

  constructor(document: Document) {
    super(document);
    if (
      this.dataParsed.document.getElementsByTagName('ZREPCASH').length !== 0
    ) {
      const XML_ZREPREALIZ_childNodes =
        this.dataParsed.document.getElementsByTagName('ZREPCASH')[0].innerXML;
      const parsed_cash = new xml.DOM(xml.parse(XML_ZREPREALIZ_childNodes));
      this.sum = parsed_cash.document.getElementsByTagName('SUM')[0].innerXML;
      this.numOfCheck =
        parsed_cash.document.getElementsByTagName('ORDERSCNT')[0].innerXML;
    }
  }
}
