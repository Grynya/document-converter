import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Document, DocumentKey } from '../interfaces/document.interface';
import { HeadParser } from './parsing/block-parsers/impl/head.parser';
import { Header } from './html/header';
import { Footer } from './html/footer';
import { CheckBody } from './html/body/check.body';
import { HtmlHeader } from './html/html-header';
import { ZReportBody } from './html/body/z.report.body';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Documents')
    private documentModel: Model<Document, DocumentKey>,
  ) {}

  private async getByUid(uid: string): Promise<Document> {
    const curReports = await this.documentModel
      .query('uid')
      .eq(uid)
      .using('DocumentByUid')
      .exec();

    return curReports[0];
  }

  public async getHtml(documentUid: string): Promise<object> {
    let tableTrs: object[] = [];
    const doc: Document = await this.getByUid(documentUid);
    if (!doc)
      throw new HttpException('Документ не существует', HttpStatus.NOT_FOUND);
    else {
      doc.type === 'ZReport'
        ? (tableTrs = this.createCheckByType(tableTrs, doc, 'ZREPHEAD'))
        : (tableTrs = this.createCheckByType(tableTrs, doc, 'CHECKHEAD'));

      return HtmlHeader.get(tableTrs);
    }
  }
  private createCheckByType(
    tableTrs: object[],
    doc: Document,
    type: string,
  ): object[] {
    const document: HeadParser = new HeadParser(doc, type);
    Header.getHeader(document).forEach((obj) => tableTrs.push(obj));
    type === 'CHECKHEAD'
      ? new CheckBody(doc).getBody().forEach((obj) => tableTrs.push(obj))
      : new ZReportBody(doc).getBody().forEach((obj) => tableTrs.push(obj));
    Footer.getFooter(document).forEach((obj) => tableTrs.push(obj));
    return tableTrs;
  }
}
