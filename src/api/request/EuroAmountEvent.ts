import { InvalidPayloadException } from '../../errors';
import { IRequestEvent } from './definitions';

export class EuroAmountEvent implements IRequestEvent<number> {
  private event: any;
  private data: number;

  constructor(event: any) {
    this.event = event;
  }

  public getData(): number {
    if (!this.data) {
      this.parse();
    }

    return this.data;
  }

  public validate(): void {
    if (!this.data) {
      this.parse();
    }

    if (Object.is(this.data, NaN)) {
      throw new InvalidPayloadException(`Field [amount] must be a number ["${this.data}"]`);
    }
  }

  private parse(): void {
    const data = JSON.parse(this.event);
    this.data = Number(data.amount);
  }
}
