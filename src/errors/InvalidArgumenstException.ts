export class InvalidArgumenstException extends Error {
  public readonly name: string;

  constructor(message?: string) {
    super(message || 'Invalid arguments was provided');
    this.name = 'InvalidArgumenstException';
  }
}