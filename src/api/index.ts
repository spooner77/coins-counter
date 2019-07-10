import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { CoinType } from '../coins';
import { CoinInventory, DynamoDbStorage, MemoryStorage } from '../db';
import { InsufficientFundsException } from '../errors';
import { MoneyService } from '../services';
import { InventoryManager } from '../utils/InventoryManager';
import { EuroAmountEvent } from './request';
import { Response } from './responce';

const storage = new DynamoDbStorage();
const service = new MoneyService(storage);


export const getOptimalChangeFor = async ({body}: any, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    await service.initialize();

    const euroAmount = new EuroAmountEvent(body);
    euroAmount.validate();

    const result = service.getOptimalChangeFor(euroAmount.getData());

    return new Response(OK, result);
  } catch (err) {
    console.log(err);
    if (err instanceof InsufficientFundsException) {
      return new Response(BAD_REQUEST, {code: err.name, message: err.message});
    }

    return new Response(INTERNAL_SERVER_ERROR, err.message);
  }
};

export const getChangeFor = async (
  {body}: any,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    await service.initialize();

    const euroAmount = new EuroAmountEvent(body);
    euroAmount.validate();

    const result = service.getChangeFor(euroAmount.getData());
    service.updateInventory();

    return new Response(OK, result);
  } catch (err) {
    if (err instanceof InsufficientFundsException) {
      return new Response(BAD_REQUEST, {code: err.name, message: err.message});
    }

    return new Response(INTERNAL_SERVER_ERROR, err.message);
  }
};

export const getInventory = async () => {
  const inventory = await storage.getInventory();
  console.log(inventory);
  return new Response(OK, new InventoryManager(inventory).toArray());
};

export const resetInventory = async () => {
  await storage.updateInventory([
    new CoinInventory(CoinType.OneEuro, 11),
    new CoinInventory(CoinType.FiftyCents, 24),
    new CoinInventory(CoinType.TwentyCents, 0),
    new CoinInventory(CoinType.TenCents, 99),
    new CoinInventory(CoinType.FiftyCents, 200),
    new CoinInventory(CoinType.TwoCents, 11),
    new CoinInventory(CoinType.OneCent, 11),
  ]);
  return new Response(OK, {message: 'Inventory updated'});
};
