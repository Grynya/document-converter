export class Purchase {
  code: string;
  name: string;
  amount: string;
  price: string;
  letters: string;
  cost: string;
  discountSum: string;

  constructor(
    code: string,
    name: string,
    amount: string,
    price: string,
    letters: string,
    cost: string,
    discountSum: string,
  ) {
    this.code = code;
    this.name = name;
    this.amount = amount;
    this.price = price;
    this.letters = letters;
    this.cost = cost;
    this.discountSum = discountSum;
  }
}
