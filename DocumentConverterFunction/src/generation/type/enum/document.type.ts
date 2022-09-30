export enum DocumentType {
  BeginOffline = 'Початок офлайн сесії',

  OpenShift = 'Відкриття зміни',

  Sale = '', //Касовий чек (реалізація)
  Return = 'Видатковий чек (повернення)',

  Cancel = 'Чек сторнування попереднього чека',

  ServiceInput = 'Чек операції «службове внесення»/«отримання авансу»',
  ServiceOutput = 'Чек операції «службова видача»/«інкасація»',

  CashWithdrawal = 'Чек видачі готівки',
  Pawn = 'Чек застави в ломбарді',

  ZReport = 'Z-звіт',
  CloseShift = 'Закриття зміни',

  CurrencyExchange = 'Чек операції обміну валюти',
  CurrencyInput = 'Чек операції внесення валюти',
  CurrencyOutput = 'Чек операції видачі валюти',
  CurrencyAdditionalInput = 'Чек операції додаткового внесення валюти',

  FinishOffline = 'Завершення офлайн сесії',
}
