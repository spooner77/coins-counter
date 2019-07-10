import {Coin, CoinType} from '../../coins';
import { CoinInventory } from '../../db/dto';
import {InsufficientFundsException, InvalidArgumenstException} from '../../errors';
import { CoinsManager } from '../../utils/CoinsManager';
import { InventoryManager } from '../../utils/InventoryManager';

export class CoinsCounter {
  private inventory: InventoryManager;
  private coins: CoinsManager;

  constructor(coins: Coin[], inventory: CoinInventory[]) {
    if (!coins || !Array.isArray(coins) || coins.length === 0) {
      throw new InvalidArgumenstException(`Available coin types not provided`);
    }

    if (inventory) {
      inventory.forEach((item: CoinInventory) => {
        if ( item.count < 0 ) {
          throw new InvalidArgumenstException(`Negative coins count was provided for coin ${item.type}`);
        }
      });
    }

    this.coins = new CoinsManager(coins);
    this.inventory = new InventoryManager(inventory);
  }

  public getChangeFor(euro: number, checkInventory: boolean = true) {
    if (euro < 0) {
      throw new InvalidArgumenstException(`Negative amount of euro was provided`);
    }

    const amount = parseFloat(Number(euro).toFixed(2)) * 100;

    if (checkInventory && this.getTotalAmount() < amount) {
      throw new InsufficientFundsException();
    }

    let balance = amount;
    const result: CoinInventory[] = [];

    this.coins.toSortedArray().some((coin: Coin) => {
      const count =  this.getAmountOfCoin(balance, coin, checkInventory);
      balance = balance - coin.getValue() * count;

      if (count > 0) {
        result.push(new CoinInventory(coin.getType(), count));

        if (checkInventory)  {
          this.updateInventory(coin.getType(), this.inventory.getInventory(coin.getType()) - count);
        }
      }

      if ( balance === 0) {
        return true;
      }
    });

    console.log('balance', balance);
    if (balance) {
      throw new InsufficientFundsException();
    }

    return result;
  }

  public getInventory() {
    return this.inventory.toArray();
  }

  public getTotalAmount() {
    return this.inventory.toArray().reduce((result: number, coinInventory: CoinInventory) => {
      return coinInventory.count * this.coins.get(coinInventory.type).getValue() + result;
    }, 0);
  }

  private updateInventory(coinType: CoinType, count: number) {
    if (!this.inventory.get(coinType)) {
      return;
    }

    this.inventory.put(new CoinInventory(coinType, count));
  }

  private getAmountOfCoin(amount: number, coin: Coin, useInventory: boolean) {
    const coinsCount = Math.floor(amount / coin.getValue());

    if (useInventory) {
      return Math.min(coinsCount,  this.inventory.getInventory(coin.getType()));
    }

    return coinsCount;
  }
}
