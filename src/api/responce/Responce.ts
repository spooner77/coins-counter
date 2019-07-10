export interface IResponse {
  statusCode: number;
  body?: any;
  headers: {
    [key: string]: string | boolean | number,
  };
}

export class Response implements IResponse {
  public body: string;
  public statusCode: number;
  public headers: {
    [key: string]: string | boolean | number,
  };

  constructor(statusCode: number, body?: any, headers?: any) {
    if (body) {
      this.body = JSON.stringify(body);
    }

    this.statusCode = statusCode;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      ...headers,
    };
  }
}
