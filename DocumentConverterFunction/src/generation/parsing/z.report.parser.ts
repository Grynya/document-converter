import { Document } from '../../interfaces/document.interface';
import { Realization } from './block-parsers/impl/realization';
import { Return } from './block-parsers/impl/return';
import { Cash } from './block-parsers/impl/cash';
import * as xml from 'xml-parse';
import { WithTaxesXmlParser } from './withTaxesXmlParser';

export class ZReportParser extends WithTaxesXmlParser {
  serviceInput: string;
  serviceOutput: string;
  realization: Realization; //Підсумки реалізації
  returnCash: Return; //Підсумки повернення
  cash: Cash; //Підсумки видачі готівки
  sum: string;

  constructor(document: Document) {
    super(document, 'TAXES');
    this.realization = new Realization(document);
    this.returnCash = new Return(document);
    this.cash = new Cash(document);
    this.setService();
    super.setTaxes();
  }
  private setService(): void {
    if (
      this.dataParsed.document.getElementsByTagName('ZREPBODY').length !== 0
    ) {
      const parsed_body = new xml.DOM(
        xml.parse(super.getByTagNameFromDoc('ZREPBODY', this.dataParsed)),
      );
      this.serviceInput = super.getByTagNameFromDoc(
        'SERVICEINPUT',
        parsed_body,
      );
      this.serviceOutput = super.getByTagNameFromDoc(
        'SERVICEOUTPUT',
        parsed_body,
      );
    }
  }
}
