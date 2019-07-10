import { CoinInventory } from './dto';

export interface IInventoryStorage {
  getInventory(): Promise<CoinInventory[]>;
  updateInventory(inventory: CoinInventory[]): Promise<any>;
}
