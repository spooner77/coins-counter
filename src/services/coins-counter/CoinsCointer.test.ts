import { Coin, CoinType } from '../../coins';
import { CoinInventory } from '../../db/dto';
import { InsufficientFundsException, InvalidArgumenstException } from '../../errors';
import { CoinsCounter } from './CoinsCointer';

describe('CoinsCounter test', () => {

  it('should throw exceptions when no available coins provided', () => {
    expect(() => new CoinsCounter(
      [],
      [new CoinInventory(CoinType.FiftyCents, 2),
      ])).toThrow(InvalidArgumenstException);
  });

  it('should throw exceptions when negative inventory count provided', () => {
    expect(() => new CoinsCounter(
      Coin.getAvailableCoinsList(),
      [new CoinInventory(CoinType.FiftyCents, -2),
      ])).toThrow(InvalidArgumenstException);
  });

  it('should throw exceptions when requested amount grater than available amount', () => {
    const coinsCounter = new CoinsCounter(
      Coin.getAvailableCoinsList(),
      [new CoinInventory(CoinType.FiftyCents, 2),
      ])
    expect(() => coinsCounter.getChangeFor(1.3)).toThrow(InsufficientFundsException);
    expect(() => coinsCounter.getChangeFor(0.7)).toThrow(InsufficientFundsException);
  })

  it('should throw exceptions when negative amount of euro was provided', () => {
    const coinsCounter = new CoinsCounter(
      Coin.getAvailableCoinsList(),
      [new CoinInventory(CoinType.FiftyCents, 2),
      ])
    expect(() => coinsCounter.getChangeFor(-0.5)).toThrow(InvalidArgumenstException);
  });

  describe('optimal change test', () => {
    it('check optimal change for 1.3', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(1.3, false)).toEqual([
        new CoinInventory(CoinType.OneEuro, 1),
        new CoinInventory(CoinType.TwentyCents, 1),
        new CoinInventory(CoinType.TenCents, 1),
      ]);
    });
    it('check optimal change for 0.71234', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(0.71234, false)).toEqual([
        new CoinInventory(CoinType.FiftyCents, 1),
        new CoinInventory(CoinType.TwentyCents, 1),
        new CoinInventory(CoinType.OneCent, 1),
      ]);
    });
    it('check optimal change for 0.63', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(0.63, false)).toEqual([
        new CoinInventory(CoinType.FiftyCents, 1),
        new CoinInventory(CoinType.TenCents, 1),
        new CoinInventory(CoinType.TwoCents, 1),
        new CoinInventory(CoinType.OneCent, 1),
      ]);
    });
    it('check optimal change for 0', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(0, false)).toEqual([]);
    });
  });

  describe('optimal change using inventory', () => {
    it('check optimal change for 1.3', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(1.3, false)).toEqual([
        new CoinInventory(CoinType.OneEuro, 1),
        new CoinInventory(CoinType.TwentyCents, 1),
        new CoinInventory(CoinType.TenCents, 1),
      ]);
    });
    it('check optimal change for 0.71234', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(0.71234, false)).toEqual([
        new CoinInventory(CoinType.FiftyCents, 1),
        new CoinInventory(CoinType.TwentyCents, 1),
        new CoinInventory(CoinType.OneCent, 1),
      ]);
    });
    it('check optimal change for 0.63', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(0.63, false)).toEqual([
        new CoinInventory(CoinType.FiftyCents, 1),
        new CoinInventory(CoinType.TenCents, 1),
        new CoinInventory(CoinType.TwoCents, 1),
        new CoinInventory(CoinType.OneCent, 1),
      ]);
    });
    it('check optimal change for 0', () => {
      const coinsCounter = new CoinsCounter(Coin.getAvailableCoinsList(), []);

      expect(coinsCounter.getChangeFor(0, false)).toEqual([]);
    });
  });
})
