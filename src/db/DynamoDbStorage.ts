import { DynamoDB } from 'aws-sdk';
import { IInventoryStorage } from './definitions';
import { CoinInventory } from './dto';

export class DynamoDbStorage implements IInventoryStorage {
  private client: DynamoDB.DocumentClient;
  constructor() {
    let options = {};

// connect to local DB if running offline
//     if (process.env.IS_OFFLINE) {
      options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
    // }

    this.client = new DynamoDB.DocumentClient(options);
  }

  public async getInventory(): Promise<CoinInventory[]> {
    const params = {
      TableName: 'test_table', // process.env.DYNAMODB_TABLE,
    };

    return new Promise( (resolve, reject) => {
      this.client.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
          console.error(error);
          reject(error);
          return;
        }

        if (!result.Count) {
          resolve([]);
          return;
        }

        resolve(result.Items.map((item: { type: string, count: number }) => {
          return new CoinInventory(item.type, item.count);
        }));
      });
    });
  }

  public async updateInventory(dtos: CoinInventory[]): Promise<any> {
    const result = dtos.map((dto: CoinInventory) => {
      const params = {
        TableName: 'test_table', // process.env.DYNAMODB_TABLE,
        Item: {
          type: dto.type,
          count: dto.count,
        },
      };

      return new Promise( (resolve, reject) => {
        this.client.put(params, (error) => {
          // handle potential errors
          if (error) {
            console.error(error);
            reject(error);
            return;
          }

          resolve();
        });
      });
    });

    return Promise.all(result);
  }
}
