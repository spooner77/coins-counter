export class InsufficientFundsException extends Error {
  public readonly name: string;

  constructor(message?: string) {
    super(message || 'Funds are insufficient for the operation');
    this.name = 'InsufficientFundsException';
  }
}
