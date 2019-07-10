export class InvalidPayloadException extends Error {
  public readonly name: string;

  constructor(message?: string) {
    super(message || 'Invalid payload structure was provided');
    this.name = 'InvalidPayloadException';
  }
}