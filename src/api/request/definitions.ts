export interface IRequestEvent<T> {
  validate(): void;
  getData(): T;
}
