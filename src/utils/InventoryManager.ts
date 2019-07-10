import { CoinType } from '../coins';
import { CoinInventory } from '../db';

export class InventoryManager {
  private data: { [key: string]: CoinInventory } = {};

  constructor(coins?: CoinInventory[]) {
    if (coins && Array.isArray(coins)) {
      coins.map((coin) => {
        this.put(coin);
      });
    }
  }

  public put(coin: CoinInventory): void {
    this.data[coin.type] = coin;
  }

  public remove(type: CoinType | string): void {
    delete this.data[type];
  }

  public get(type: CoinType | string) {
    return this.data[type];
  }

  public getInventory(type: CoinType | string): number {
    if (this.data[type] && this.data[type].count) {
      return this.data[type].count;
    }

    return 0;
  }

  public toArray(): CoinInventory[] {
    return Object.values(this.data);
  }

  public toString(): string {
    return this.toArray()
      .filter((item: CoinInventory) => {
        return item.count > 0;
      })
      .map((item: CoinInventory) => {
        return `[${item.type}] - [${item.count}]`;
      }).join(', ');
  }
}
