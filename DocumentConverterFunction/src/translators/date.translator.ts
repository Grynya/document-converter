export class DateTranslator {
  public static dateToPointDate(date) {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${da}.${mo}.${ye}`;
  } //06.06.2022

  public static dateToPointTime(date) {
    const ho = new Intl.DateTimeFormat('uk-UA', { hour: '2-digit' }).format(
      date,
    );
    const mi = new Intl.DateTimeFormat('uk-UA', { minute: '2-digit' }).format(
      date,
    );
    const se = new Intl.DateTimeFormat('uk-UA', { second: '2-digit' }).format(
      date,
    );
    return `${ho}.${mi}.${se}`;
  }
}
