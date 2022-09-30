import { Document } from '../../interfaces/document.interface';
import { Purchase } from './xml-components/purchase';
import { PayForm } from './xml-components/pay.form';
import * as xml from 'xml-parse';
import { WithTaxesXmlParser } from './withTaxesXmlParser';
import { PaySystem } from './block-parsers/impl/pay.system';
import moment from 'moment-timezone';
import { DateTranslator } from '../../translators/date.translator';

export class CheckParser extends WithTaxesXmlParser {
  sum: string;
  discount: string;
  roundSum: string;
  payForms: PayForm[];
  purchases: Purchase[];
  paySystem: PaySystem;

  constructor(document: Document) {
    super(document, 'CHECKTAX');
    this.setTotal();
    this.setPayForms();
    this.setPurchases();
    super.setTaxes();
    this.setPaySystem();
  }

  setTotal(): void {
    if (
      this.dataParsed.document.getElementsByTagName('CHECKTOTAL').length !== 0
    ) {
      const total_payForms = new xml.DOM(
        xml.parse(super.getByTagNameFromDoc('CHECKTOTAL', this.dataParsed)),
      );
      this.sum = super.getByTagNameFromDoc('SUM', total_payForms);
      this.roundSum = super.getByTagNameFromDoc('RNDSUM', total_payForms);
      this.discount = super.getByTagNameFromDoc('DISCOUNTSUM', total_payForms);
    }
  }

  setPayForms(): void {
    this.payForms = [];
    if (
      this.dataParsed.document.getElementsByTagName('CHECKPAY').length !== 0
    ) {
      const parsed_payForms = new xml.DOM(
        xml.parse(super.getByTagNameFromDoc('CHECKPAY', this.dataParsed)),
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

  private setPurchases() {
    this.purchases = [];
    if (
      this.dataParsed.document.getElementsByTagName('CHECKBODY').length !== 0
    ) {
      const parsed_checkBody = new xml.DOM(
        xml.parse(super.getByTagNameFromDoc('CHECKBODY', this.dataParsed)),
      );
      for (const product of parsed_checkBody.document.getElementsByTagName(
        'ROW',
      )) {
        const parsed_product = new xml.DOM(xml.parse(product.innerXML));
        this.purchases.push(
          new Purchase(
            super.getByTagNameFromDoc('CODE', parsed_product),
            super.getByTagNameFromDoc('NAME', parsed_product),
            super.getByTagNameFromDoc('AMOUNT', parsed_product),
            super.getByTagNameFromDoc('PRICE', parsed_product),
            super.getByTagNameFromDoc('LETTERS', parsed_product),
            super.getByTagNameFromDoc('COST', parsed_product),
            super.getByTagNameFromDoc('DISCOUNTSUM', parsed_product),
          ),
        );
      }
    }
  }

  private setPaySystem() {
    if (
      this.dataParsed.document.getElementsByTagName('CHECKPTKS').length !== 0
    ) {
      const parsed_paySystem = new xml.DOM(
        xml.parse(
          this.dataParsed.document.getElementsByTagName('CHECKPTKS').innerXML,
        ),
      );
      const tmp = super.getByTagNameFromDoc('ORDERTIME', parsed_paySystem);
      const dateTime = moment(`${tmp}`, 'DDMMYYYYHHmmss').tz('Europe/Kiev');
      this.paySystem = new PaySystem(
        DateTranslator.dateToPointDate(dateTime),
        DateTranslator.dateToPointTime(dateTime),
        super.getByTagNameFromDoc('ACQUIRETRANSID', parsed_paySystem),
        super.getByTagNameFromDoc('AUTHCD', parsed_paySystem),
        super.getByTagNameFromDoc('BANKNM', parsed_paySystem),
        super.getByTagNameFromDoc('PAYSYSTEMNM', parsed_paySystem),
        super.getByTagNameFromDoc('EPZDETAILS', parsed_paySystem),
        super.getByTagNameFromDoc('POSTRANSNUM', parsed_paySystem), //Номер чека транзакції (128 символів)
        super.getByTagNameFromDoc('TERMINALNUM', parsed_paySystem),
      );
    }
  }
}
