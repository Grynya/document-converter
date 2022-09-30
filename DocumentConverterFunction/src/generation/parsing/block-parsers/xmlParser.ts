import * as xml from 'xml-parse';
import { Document } from '../../../interfaces/document.interface';

export class XmlParser {
  dataParsed: any;

  constructor(document: Document) {
    this.dataParsed = new xml.DOM(xml.parse(document.data));
  }

  public getByTagName(tagName: string) {
    let res;
    if (this.dataParsed.document.getElementsByTagName(tagName).length !== 0) {
      if (
        this.dataParsed.document.getElementsByTagName(tagName)[0].childNodes
          .length !== 0
      ) {
        res =
          this.dataParsed.document.getElementsByTagName(tagName)[0]
            .childNodes[0].text;
      } else {
        res =
          this.dataParsed.document.getElementsByTagName(tagName)[0].innerXML;
      }
    } else res = undefined;
    return res;
  }

  public getByTagNameFromDoc(tagName: string, from: any): string | undefined {
    if (from.document.getElementsByTagName(tagName).length !== 0)
      return from.document.getElementsByTagName(tagName)[0].innerXML;
    return undefined;
  }
}
