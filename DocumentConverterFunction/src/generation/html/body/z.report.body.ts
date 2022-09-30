import { Document } from '../../../interfaces/document.interface';
import { HtmlComponent as html } from '../html.component';
import { ZReportParser } from '../../parsing/z.report.parser';
import { PayForm } from '../../parsing/xml-components/pay.form';
import { Tax } from '../../parsing/xml-components/tax';

export class ZReportBody {
  private readonly parsed: ZReportParser;
  private readonly res: object[];

  constructor(document: Document) {
    this.res = [];
    this.parsed = new ZReportParser(document);
    this.buildRealisation();
    this.buildTaxes();
    this.buildReturn();
    this.buildPayForm();
    this.buildOperationsOfPawnshops();
    this.buildCashWithdrawal();
    this.buildCashRegister();
    this.buildCurrencyOfTheReportUAH();
  }

  public getBody(): object[] {
    return this.res;
  }

  private buildRealisation(): void {
    this.res.push(html.getHrCentralizedText('Підсумки реалізації'));
    this.res.push(html.getCentralizedText('ОДЕРЖАНО ЗА ФОРМАМИ ОПЛАТИ'));
    this.res.push(html.getCentralizedText(''));

    if (this.parsed.realization.sum)
      this.res.push(
        html.getTwoColumnRow('ЗАГАЛЬНИЙ ОБОРОТ', this.parsed.realization.sum),
      );

    if (this.parsed.realization.numOfCheck)
      this.res.push(
        html.getTwoColumnRow(
          'Кiлькicть чеків',
          this.parsed.realization.numOfCheck,
        ),
      );
  }
  private buildTaxes(): void {
    this.res.push(html.getHrCentralizedText('Підсумки по податках'));
    let tax: Tax;
    for (tax of this.parsed.taxes) {
      if (tax.name || tax.letter || tax.prc)
        this.res.push(
          html.getTwoColumnRow(tax.name + ' ' + tax.letter, tax.prc),
        );
      if (tax.sourceSum)
        this.res.push(html.getTwoColumnRow('Оборот по податку', tax.sourceSum));
      if (tax.sum)
        this.res.push(
          html.getTwoColumnRow('Сума податку вiд обороту', tax.sum),
        );
      this.res.push(html.getCentralizedText(''));
    }
  }

  private buildReturn(): void {
    this.res.push(html.getHrCentralizedText('Підсумки повернення'));
    this.res.push(html.getCentralizedText('ВИДАНО ЗА ФОРМАМИ ОПЛАТИ'));
    this.res.push(html.getCentralizedText(''));

    if (this.parsed.returnCash.sum)
      this.res.push(
        html.getTwoColumnRow('ЗАГАЛЬНИЙ ОБОРОТ', this.parsed.returnCash.sum),
      );
    if (this.parsed.returnCash.numOfCheck)
      this.res.push(
        html.getTwoColumnRow(
          'Кiлькicть чеків',
          this.parsed.returnCash.numOfCheck,
        ),
      );
    if (
      this.parsed.returnCash.type ||
      this.parsed.returnCash.letter ||
      this.parsed.returnCash.prc
    ) {
      this.res.push(html.getHr());
      this.res.push(
        html.getTwoColumnRow(
          this.parsed.returnCash.type + ' ' + this.parsed.returnCash.letter,
          this.parsed.returnCash.prc,
        ),
      );
    }
  }
  private buildPayForm(): void {
    this.res.push(html.getHrCentralizedText('Підсумки по формам оплати'));
    let payForm: PayForm;
    for (payForm of this.parsed.realization.payForms) {
      this.res.push(html.getTwoColumnRow(payForm.name, payForm.sum));
    }
  }
  private buildOperationsOfPawnshops(): void {
    this.res.push(
      html.getHrCentralizedText('Підсумки за операціями ломбардів'),
    );
    if (this.parsed.realization.pawnSumIssued)
      this.res.push(
        html.getTwoColumnRow(
          'Видано клієнтам',
          this.parsed.realization.pawnSumIssued,
        ),
      );
    if (this.parsed.realization.pawnSumReceived)
      this.res.push(
        html.getTwoColumnRow(
          'Отримано від клієнтів',
          this.parsed.realization.pawnSumReceived,
        ),
      );
  }

  private buildCashWithdrawal(): void {
    this.res.push(html.getHrCentralizedText('Підсумки видачі готівки'));
    if (this.parsed.cash.sum)
      this.res.push(html.getTwoColumnRow('ГРОШI', this.parsed.cash.sum));
    if (this.parsed.cash.numOfCheck)
      html.getTwoColumnRow('Кiлькiсть чеків', this.parsed.cash.numOfCheck);
  }

  private buildCashRegister(): void {
    this.res.push(html.getHrCentralizedText('Готівкові кошти в касі'));
    if (this.parsed.serviceInput)
      this.res.push(
        html.getTwoColumnRow('Службове внесення', this.parsed.serviceInput),
      );
    if (this.parsed.serviceOutput)
      this.res.push(
        html.getTwoColumnRow('Служебне вилучення', this.parsed.serviceOutput),
      );
  }

  private buildCurrencyOfTheReportUAH(): void {
    this.res.push(html.getHrCentralizedText('Валюта Звіту ГРН'));
    this.res.push(html.getSpanRow('1. Підсумкові регістри даних обнулені'));
    this.res.push(html.getSpanRow('2. ФІСКАЛЬНИЙ ЗВІТ ДІЙСНИЙ'));
  }
}
