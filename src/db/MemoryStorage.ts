import { CoinType } from '../coins';
import { IInventoryStorage } from './definitions';
import { CoinInventory } from './dto';

export class MemoryStorage implements IInventoryStorage {
  private storege: {
    [key: string]: number;
  };
  constructor() {
    this.storege = {};

    this.updateInventory([
      new CoinInventory(CoinType.OneEuro, 11),
      new CoinInventory(CoinType.FiftyCents, 24),
      new CoinInventory(CoinType.TwentyCents, 0),
      new CoinInventory(CoinType.TenCents, 99),
      new CoinInventory(CoinType.FiftyCents, 200),
      new CoinInventory(CoinType.TwoCents, 11),
    ]);
  }

  public async getInventory(): Promise<CoinInventory[]> {
    return Promise.resolve(Object.keys(this.storege).map((type) => new CoinInventory(type, this.storege[type])));
  }

  public async updateInventory(dtos: CoinInventory[]): Promise<any> {
    if (!Array.isArray(dtos)) {
      return Promise.resolve();
    }

    dtos.map((inventory) => {
      this.storege[inventory.type] = inventory.count;
    });

    return Promise.resolve();
  }
}
