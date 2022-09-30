import { NumericType } from './numeric.type';
import { DocumentType } from './enum/document.type';
import { InternalDocumentType } from './enum/internal.document.type';
import { InternalDocumentSubType } from './enum/internal.document.sub.type';

export class DocumentTypeUtil {
  private type: NumericType;

  constructor(type: NumericType) {
    this.type = type;
  }

  public getDocTypeUa(): DocumentType {
    if (this.compareTypes(null, null)) return DocumentType.ZReport;
    else if (this.compareTypes(InternalDocumentType.OPEN_SHIFT, null))
      return DocumentType.OpenShift;
    else if (this.compareTypes(InternalDocumentType.CLOSE_SHIFT, null))
      return DocumentType.CloseShift;
    else if (
      this.compareTypes(InternalDocumentType.BEGIN_OFFLINE_SESSION, null)
    )
      return DocumentType.BeginOffline;
    else if (
      this.compareTypes(InternalDocumentType.FINISH_OFFLINE_SESSION, null)
    )
      return DocumentType.FinishOffline;
    else if (
      this.compareTypes(InternalDocumentType.SALE, InternalDocumentSubType.SALE)
    )
      return DocumentType.Sale;
    else if (
      this.compareTypes(
        InternalDocumentType.SALE,
        InternalDocumentSubType.RETURN,
      )
    )
      return DocumentType.Return;
    else if (
      this.compareTypes(
        InternalDocumentType.SALE,
        InternalDocumentSubType.CANCEL,
      )
    )
      return DocumentType.Cancel;
    else if (
      this.compareTypes(
        InternalDocumentType.SALE,
        InternalDocumentSubType.SERVICE_DEPOSIT,
      )
    )
      return DocumentType.ServiceInput;
    else if (
      this.compareTypes(
        InternalDocumentType.SALE,
        InternalDocumentSubType.SERVICE_ISSUE,
      )
    )
      return DocumentType.ServiceOutput;
    else if (
      this.compareTypes(
        InternalDocumentType.CASH_WITHDRAWAL,
        InternalDocumentSubType.SALE,
      )
    )
      return DocumentType.CashWithdrawal;
    else if (
      this.compareTypes(InternalDocumentType.PAWN, InternalDocumentSubType.SALE)
    )
      return DocumentType.Pawn;
    else if (
      this.compareTypes(
        InternalDocumentType.CURRENCY_EXCHANGE,
        InternalDocumentSubType.SALE,
      )
    )
      return DocumentType.CurrencyExchange;
    else if (
      this.compareTypes(
        InternalDocumentType.CURRENCY_EXCHANGE,
        InternalDocumentSubType.SERVICE_DEPOSIT,
      )
    )
      return DocumentType.CurrencyInput;
    else if (
      this.compareTypes(
        InternalDocumentType.CURRENCY_EXCHANGE,
        InternalDocumentSubType.SERVICE_ISSUE,
      )
    )
      return DocumentType.CurrencyOutput;
    else if (
      this.compareTypes(
        InternalDocumentType.CURRENCY_EXCHANGE,
        InternalDocumentSubType.ADDITIONAL_DEPOSIT,
      )
    )
      return DocumentType.CurrencyAdditionalInput;
  }

  private compareTypes(internalDocumentType, internalDocumentSubType) {
    return (
      this.type.docType === InternalDocumentType[internalDocumentType] &&
      this.type.docSubType === InternalDocumentSubType[internalDocumentSubType]
    );
  }
}
