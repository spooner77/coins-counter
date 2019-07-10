import { CoinType } from '../../coins';

export class CoinInventory {
  public type: CoinType | string;
  public count: number;

  constructor(coinType: CoinType | string, count: number) {
    this.type = coinType;
    this.count = count;
  }
}
