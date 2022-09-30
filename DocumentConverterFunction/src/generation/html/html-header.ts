import htmlCreator from 'html-creator';
import { Style } from './style';

export class HtmlHeader {
  public static get(tableTrs: object[]): object {
    return new htmlCreator([
      {
        type: 'head',
        content: [
          { type: 'meta', attributes: { charset: 'UTF-8' } },
          {
            type: 'meta',
            attributes: {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
          },
          {
            type: 'style',
            content: Style.content,
          },
        ],
      },
      {
        type: 'body',
        content: [
          {
            type: 'div',
            content: [
              {
                type: 'table',
                content: tableTrs,
              },
            ],
          },
        ],
      },
    ]).renderHTML({
      htmlTagAttributes: {
        lang: 'ua',
      },
    });
  }
}
