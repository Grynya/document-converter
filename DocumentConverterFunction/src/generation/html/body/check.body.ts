import { Document } from '../../../interfaces/document.interface';
import { HtmlComponent as html } from '../html.component';
import { CheckParser } from '../../parsing/check.parser';
import { Purchase } from '../../parsing/xml-components/purchase';
import { Tax } from '../../parsing/xml-components/tax';

export class CheckBody {
  private readonly res: object[];
  private readonly parsed: CheckParser;

  constructor(document: Document) {
    this.res = [];
    this.parsed = new CheckParser(document);
    this.buildPurchases();
    this.buildPaySystem();
    this.buildPayForm();
    this.buildTaxes();
    this.buildConclusion();
  }

  public getBody(): object[] {
    return this.res;
  }

  private buildPurchases(): void {
    if (this.parsed.purchases.length !== 0) {
      this.res.push(html.getHr());
      let purchase: Purchase;
      for (purchase of this.parsed.purchases) {
        if (purchase.amount || purchase.price)
          this.res.push(
            html.getTwoColumnRow(purchase.amount + ' x ' + purchase.price, ''),
          );
        if (purchase.code)
          this.res.push(html.getTwoColumnRow('АРТ.№', purchase.code));

        if (purchase.name || purchase.cost || purchase.letters)
          this.res.push(
            html.getTwoColumnRow(
              purchase.name,
              purchase.cost + ' ' + purchase.letters,
            ),
          );
        if (purchase.discountSum)
          this.res.push(
            html.getTwoColumnRow('Дисконт: ' + purchase.discountSum, ''),
          );
        this.res.push(html.getCentralizedText(''));
        this.res.push(html.getCentralizedText(''));
      }
    }
  }

  private buildPaySystem(): void {
    if (this.parsed.paySystem) {
      this.res.push(html.getHrCentralizedText('Платіжна система'));
      if (this.parsed.paySystem.bankName)
        this.res.push(
          html.getSpanRow('Банк: ' + this.parsed.paySystem.bankName),
        );
      if (this.parsed.paySystem.terminalNumber)
        this.res.push(
          html.getSpanRow('Термінал: ' + this.parsed.paySystem.terminalNumber),
        );

      if (this.parsed.paySystem.epzDetails)
        this.res.push(
          html.getSpanRow('ЕПЗ: ' + this.parsed.paySystem.epzDetails),
        );
      if (this.parsed.paySystem.systemName)
        this.res.push(
          html.getSpanRow(
            'ПЛАТІЖНА СИСТЕМА: ' + this.parsed.paySystem.systemName,
          ),
        );
      if (this.parsed.paySystem.authorizationCode)
        this.res.push(
          html.getSpanRow(
            'КОД АВТ.: ' + this.parsed.paySystem.authorizationCode,
          ),
        );
      if (this.parsed.paySystem.transactionId)
        this.res.push(
          html.getSpanRow('RRN: ' + this.parsed.paySystem.transactionId),
        );

      this.res.push(html.getSpanRow('КАСИР Підпис не передбачено'));
      this.res.push(html.getSpanRow('ДЕРЖАТЕЛЬ ЕПЗ  Підпис не передбачено'));

      if (this.parsed.paySystem.date && this.parsed.paySystem.time)
        this.res.push(
          html.getSpanRow(
            'Час транзакції: ' +
              this.parsed.paySystem.date +
              ' ' +
              this.parsed.paySystem.time,
          ),
        );

      if (this.parsed.paySystem.checkNumber)
        this.res.push(
          html.getSpanRow('Номер Чеку: ' + this.parsed.paySystem.checkNumber),
        );
    }
  }

  private buildPayForm(): void {
    if (this.parsed.payForms.length !== 0) {
      this.res.push(html.getHrCentralizedText('Підсумки по формам оплати'));
      this.parsed.payForms.forEach((payForm) => {
        this.res.push(html.getTwoColumnRow(payForm.name, payForm.sum));
      });
    }
  }

  private buildTaxes(): void {
    if (this.parsed.taxes.length !== 0) {
      this.res.push(html.getHrCentralizedText('Підсумки по податках'));
      let tax: Tax;
      for (tax of this.parsed.taxes) {
        if (tax.name || tax.letter || tax.prc)
          this.res.push(
            html.getTwoColumnRow(tax.name + ' ' + tax.letter, tax.prc),
          );
        if (tax.sourceSum)
          this.res.push(
            html.getTwoColumnRow('Оборот по податку', tax.sourceSum),
          );
        if (tax.sum)
          this.res.push(
            html.getTwoColumnRow('Сума податку вiд обороту', tax.sum),
          );
        this.res.push(html.getCentralizedText(''));
        this.res.push(html.getCentralizedText(''));
      }
    }
  }

  private buildConclusion(): void {
    if (this.parsed.discount || this.parsed.roundSum || this.parsed.sum)
      this.res.push(html.getHrCentralizedText('Підсумок по чеку'));
    if (this.parsed.discount)
      this.res.push(html.getTwoColumnRow('ДИСКОНТ:', this.parsed.discount));
    if (this.parsed.roundSum)
      this.res.push(
        html.getTwoColumnRow('ЗАОКРУГЛЕННЯ:', this.parsed.roundSum),
      );
    if (this.parsed.sum)
      this.res.push(html.getTwoColumnRow('ДО СПЛАТИ:', this.parsed.sum, true));
  }
}
