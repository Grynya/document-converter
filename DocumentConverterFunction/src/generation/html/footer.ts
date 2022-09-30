import { HeadParser } from '../parsing/block-parsers/impl/head.parser';
import { HtmlComponent as html } from './html.component';

export class Footer {
  public static getFooter(doc: HeadParser): object[] {
    const res = [html.getHr()];
    if (doc.date || doc.time)
      res.push(html.getTwoColumnRow('Дата', doc.date + '&nbsp;' + doc.time));

    if (doc.status) html.getTwoColumnRow('Режим', doc.status.toLowerCase());

    if (doc.fiscalNumber || doc.localNumber)
      res.push(
        html.getTwoColumnRow(
          'ФН ЧЕК ' + doc.fiscalNumber,
          'ВН ' + doc.localNumber,
        ),
      );

    if (doc.registrarInfo.registrarId || doc.registrarInfo.localNumber)
      res.push(
        html.getTwoColumnRow(
          'ФН ПРРО&nbsp;' + doc.registrarInfo.registrarId,
          'ВН&nbsp;' + doc.registrarInfo.localNumber,
        ),
      );
    if (doc.shiftId) html.getTwoColumnRow('Зміна №', doc.shiftId);

    if (doc.registrarInfo.registrarId)
      res.push(
        html.getCentralizedText(
          'КАСИР Для РРО № ' + doc.registrarInfo.registrarId,
        ),
      );

    if (doc.controlNumber)
      res.push(
        html.getCentralizedText('Контрольное число ' + doc.controlNumber),
      );

    res.push(html.getCentralizedText('- - - check-online.com.ua - - -'));

    return res;
  }
}
