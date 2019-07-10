import { Coin, CoinType } from '../coins';

export class CoinsManager {
  private data: { [key: string]: Coin } = {};

  constructor(coins?: Coin[]) {
    if (coins && Array.isArray(coins)) {
      coins.map((coin) => {
        this.put(coin);
      });
    }
  }

  public put(coin: Coin): void {
    this.data[coin.getType()] = coin;
  }

  public remove(type: CoinType | string): void {
    delete this.data[type];
  }

  public get(type: CoinType | string) {
    return this.data[type];
  }

  public toArray(): Coin[] {
    return Object.values(this.data);
  }

  public toSortedArray(): Coin[] {
    return Object.values(this.data).sort((a: Coin, b: Coin) => {
      if (a.getValue() === b.getValue()) {
        return 0;
      }

      return a.getValue() > b.getValue() ? -1 : 1;
    });
  }
}
