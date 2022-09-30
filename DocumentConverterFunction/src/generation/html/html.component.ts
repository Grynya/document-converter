export class HtmlComponent {
  public static getHr(): object {
    return {
      type: 'tr',
      content: [
        {
          type: 'td',
          attributes: { colspan: '2', class: 'center' },
          content: [
            {
              type: 'hr',
            },
          ],
        },
      ],
    };
  }
  public static getHrCentralizedText(text: string): object {
    return {
      type: 'tr',
      content: [
        {
          type: 'td',
          attributes: { colspan: '2', class: 'center' },
          content: [
            {
              type: 'hr',
            },
            { content: text },
            {
              type: 'hr',
            },
          ],
        },
      ],
    };
  }
  public static getCentralizedText(text: string): object {
    return {
      type: 'tr',
      content: [
        {
          type: 'td',
          attributes: { colspan: '2', class: 'center' },
          content: text,
        },
      ],
    };
  }
  public static getSpanRow(text: string): object {
    return {
      type: 'tr',
      content: [
        {
          type: 'td',
          attributes: { colspan: '2', class: 'left' },
          content: text,
        },
      ],
    };
  }
  public static getTwoColumnRow(
    key: string,
    value: string,
    isBold?: boolean,
  ): object {
    if (isBold) {
      key = '<b>' + key + '</b>';
      value = '<b>' + value + '</b>';
    }
    return {
      type: 'tr',
      content: [
        {
          type: 'td',
          attributes: { class: 'left' },
          content: key,
        },
        {
          type: 'td',
          attributes: { class: 'right' },
          content: value,
        },
      ],
    };
  }

  public static getIpnTinRow(ipn: string, tin: string): object {
    if (ipn && tin)
      return HtmlComponent.getTwoColumnRow('ПН&nbsp;' + ipn, 'ІД&nbsp;' + tin);
    else if (!ipn && tin)
      return HtmlComponent.getTwoColumnRow('', 'ІД&nbsp;' + tin);
    else if (ipn && !tin)
      return HtmlComponent.getTwoColumnRow('ПН&nbsp;' + ipn, '');
    return HtmlComponent.getTwoColumnRow('', '');
  }
}
