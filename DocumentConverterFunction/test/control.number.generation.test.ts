import { ControlNumberService } from '../src/generation/control.number.service';

it('getControlNumber', () => {
  const result = ControlNumberService.getControlNumber(
    '20082020',
    '142338',
    10,
    4000002411,
    10,
    '179625192271939',
    null,
    'cdd68bb111f8993f3603f0179341571b35b73a07d5acee9b28fbfb714698e1b3',
  );
  expect(result).toStrictEqual(4758);
});
it('createCheckNumber', () => {
  const result = ControlNumberService.createCheckNumber(
    '20082020',
    '142338',
    10,
    4000002411,
    10,
    '179625192271939',
    null,
    'cdd68bb111f8993f3603f0179341571b35b73a07d5acee9b28fbfb714698e1b3',
  );
  expect(result).toStrictEqual(3185294758);
});
