import { APIGatewayProxyHandler, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';

export const test = async (event: APIGatewayProxyHandler, context: Context): Promise<APIGatewayProxyResult> => {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(10),
  });
};
