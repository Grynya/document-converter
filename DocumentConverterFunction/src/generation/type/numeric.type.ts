import { InternalDocumentType } from './enum/internal.document.type';
import { InternalDocumentSubType } from './enum/internal.document.sub.type';

export class NumericType {
  public docType: string | undefined;
  public docSubType: string | undefined;

  constructor(docType: string, docSubType: string) {
    this.docType = InternalDocumentType[docType];
    this.docSubType = InternalDocumentSubType[docSubType];
  }
}
