import { InvalidPayloadException } from '../../errors';
import { IRequestEvent } from './definitions';

export class EuroAmountEvent implements IRequestEvent<number> {
  private body: any;
  private data: number;

  constructor(body: any) {
    this.body = body;
  }

  public getData(): number {
    if (this.data === undefined) {
      this.parse();
    }

    return this.data;
  }

  public validate(): void {
    if (this.data === undefined) {
      this.parse();
    }

    if (Number.isNaN(this.data)) {
      throw new InvalidPayloadException(`Field [amount] must be a number ["${this.data}"]`);
    }
  }

  private parse(): void {
    console.log('body', this.body)
    this.data = parseFloat(this.body);
  }
}
