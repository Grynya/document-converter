export class Tax {
  name: string;
  letter: string;
  prc: string;
  sign: boolean;
  turnOver: string;
  sourceSum: string;
  sum: string;

  constructor(
    name: string,
    letter: string,
    prc: string,
    sign: boolean,
    turnOver: string,
    sourceSum: string,
    sum: string,
  ) {
    this.name = name;
    this.letter = letter;
    this.prc = prc;
    this.sign = sign;
    this.turnOver = turnOver;
    this.sourceSum = sourceSum;
    this.sum = sum;
  }
}
