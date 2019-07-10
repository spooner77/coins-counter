export enum CoinType {
  OneEuro = 'One Euro',
  FiftyCents = 'Fifty Cents',
  TwentyCents = 'Twenty Cents',
  TenCents = 'Ten Cents',
  FiveCents = 'Five Cents',
  TwoCents = 'Two Cents',
  OneCent = 'One Cent',
}

export class Coin {
  public static getAvailableCoinsList() {
    return [
      new Coin(CoinType.OneEuro, 100),
      new Coin(CoinType.FiftyCents, 50),
      new Coin(CoinType.TwentyCents, 20),
      new Coin(CoinType.TenCents, 10),
      new Coin(CoinType.FiveCents, 5),
      new Coin(CoinType.TwoCents, 2),
      new Coin(CoinType.OneCent, 1),
    ];
  }

  private readonly type: CoinType;
  private readonly value: number;

  constructor(type: CoinType, value: number) {
    this.type = type;
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  public getType() {
    return this.type;
  }

  public isEqual(coin: Coin) {
    return coin && this.type === coin.type;
  }
}
