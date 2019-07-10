import { Coin } from '../coins';
import { CoinInventory, IInventoryStorage } from '../db';
import { CoinsCounter } from './coins-counter/CoinsCointer';

export class MoneyService {
  private storage: IInventoryStorage;
  private coinsCounter: CoinsCounter;

  constructor(storage: IInventoryStorage) {
    this.storage = storage;
  }

  public getChangeFor(euro: number): CoinInventory[] {
    return this.coinsCounter.getChangeFor(euro);
  }

  public getOptimalChangeFor(euro: number): CoinInventory[] {
    return this.coinsCounter.getChangeFor(euro, false);
  }

  public updateInventory() {
    this.storage.updateInventory(this.coinsCounter.getInventory());
  }

  public async initialize() {
    this.coinsCounter = new CoinsCounter(
      Coin.getAvailableCoinsList(),
      await this.storage.getInventory(),
    );
  }
}
