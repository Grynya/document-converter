import * as xml from 'xml-parse';
import { Document } from '../../interfaces/document.interface';
import { Tax } from './xml-components/tax';
import { XmlParser } from './block-parsers/xmlParser';

export class WithTaxesXmlParser extends XmlParser {
  taxes: Tax[];
  taxesTagNameInXml: string;

  constructor(document: Document, taxesTagNameInXml: string) {
    super(document);
    this.taxesTagNameInXml = taxesTagNameInXml;
  }

  public setTaxes() {
    this.taxes = [];
    if (
      this.dataParsed.document.getElementsByTagName(this.taxesTagNameInXml)
        .length !== 0
    ) {
      const parsed_checkBody = new xml.DOM(
        xml.parse(
          this.getByTagNameFromDoc(this.taxesTagNameInXml, this.dataParsed),
        ),
      );
      for (const product of parsed_checkBody.document.getElementsByTagName(
        'ROW',
      )) {
        const parsed_product = new xml.DOM(xml.parse(product.innerXML));
        this.taxes.push(
          new Tax(
            this.getByTagNameFromDoc('NAME', parsed_product),
            this.getByTagNameFromDoc('LETTER', parsed_product),
            this.getByTagNameFromDoc('PRC', parsed_product),
            Boolean(this.getByTagNameFromDoc('SIGN', parsed_product)),
            this.getByTagNameFromDoc('TURNOVER', parsed_product),
            this.getByTagNameFromDoc('SOURCESUM', parsed_product),
            this.getByTagNameFromDoc('SUM', parsed_product),
          ),
        );
      }
    }
  }
}
