import { Document } from '../../../../interfaces/document.interface';
import { RegistrarInfo } from '../../../../interfaces/registrar.info.interface';
import { RegistrarInfoImpl } from '../../../../interfaces/impl/registrar.info.impl';
import moment from 'moment-timezone';
import { DateTranslator } from '../../../../translators/date.translator';
import { ControlNumberService } from '../../../control.number.service';
import { DocumentTypeUtil } from '../../../type/document.type.util';
import { DocumentType } from '../../../type/enum/document.type';
import { NumericType } from '../../../type/numeric.type';
import * as xml from 'xml-parse';
import { XmlParser } from '../xmlParser';

export class HeadParser extends XmlParser implements Document {
  data: string;
  fiscalNumber: string;
  localNumber: number;
  shiftId: string;
  type: string;
  registrarInfo: RegistrarInfo;
  date: string;
  time: string;
  status: string;
  controlNumber: number;
  headTagNameInXml: string;

  constructor(document: Document, headTagNameInXml: string) {
    super(document);
    this.headTagNameInXml = headTagNameInXml;
    if (
      this.dataParsed.document.getElementsByTagName(this.headTagNameInXml)
        .length !== 0
    ) {
      const head_content = this.dataParsed.document.getElementsByTagName(
        this.headTagNameInXml,
      )[0].innerXML;
      const parsed_head = new xml.DOM(xml.parse(head_content));

      this.registrarInfo = new RegistrarInfoImpl(
        super.getByTagNameFromDoc('ORGNM', parsed_head),
        super.getByTagNameFromDoc('IPN', parsed_head),
        parseInt(super.getByTagNameFromDoc('CASHDESKNUM', parsed_head)),
        super.getByTagNameFromDoc('POINTADDR', parsed_head),
        super.getByTagNameFromDoc('POINTNM', parsed_head),
        parseInt(super.getByTagNameFromDoc('CASHREGISTERNUM', parsed_head)),
        super.getByTagNameFromDoc('TIN', parsed_head),
      );
      this.type = new DocumentTypeUtil(
        new NumericType(
          super.getByTagNameFromDoc('DOCTYPE', parsed_head),
          super.getByTagNameFromDoc('DOCSUBTYPE', parsed_head),
        ),
      )
        .getDocTypeUa()
        .toString();

      this.fiscalNumber = document.fiscalNumber;
      this.setFullDate(parsed_head);
      super.getByTagNameFromDoc('OFFLINE', parsed_head)
        ? (this.status = 'офлайн')
        : (this.status = 'онлайн');
      this.localNumber = parseInt(
        super.getByTagNameFromDoc('ORDERNUM', parsed_head),
      );
      this.setShiftId(document);
      this.setControlNumber(parsed_head);
    }
  }

  setShiftId(document: Document) {
    this.type === DocumentType.OpenShift.toString()
      ? (this.shiftId = this.fiscalNumber)
      : (this.shiftId = document.shiftId);
  }

  private setFullDate(parsed_head) {
    const date = super.getByTagNameFromDoc('ORDERDATE', parsed_head);
    const time = super.getByTagNameFromDoc('ORDERTIME', parsed_head);
    const dateTime = moment(`${time}${date}`, 'HHmmssDDMMYYYY').tz(
      'Europe/Kiev',
    );
    this.date = DateTranslator.dateToPointDate(dateTime);
    this.time = DateTranslator.dateToPointTime(dateTime);
  }

  private setControlNumber(parsed_head) {
    super.getByTagNameFromDoc('OFFLINE', parsed_head)
      ? (this.controlNumber = ControlNumberService.getControlNumber(
          super.getByTagNameFromDoc('ORDERDATE', parsed_head),
          super.getByTagNameFromDoc('ORDERTIME', parsed_head),
          this.localNumber,
          this.registrarInfo.registrarId,
          this.registrarInfo.localNumber,
          super.getByTagNameFromDoc('OFFLINESEED', parsed_head),
          parseFloat(super.getByTagNameFromDoc('SUM', parsed_head)),
          super.getByTagNameFromDoc('PREVDOCHASH', parsed_head),
        ))
      : (this.controlNumber = undefined);
  }
}
