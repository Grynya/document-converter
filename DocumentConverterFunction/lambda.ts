import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Context, Handler } from 'aws-lambda';
import { AppModule } from './src/modules/app.module';
import cors from 'cors';

let cachedServer: Handler;
async function bootstrap() {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.use(cors({ origin: true, credentials: true }));
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer;
}
export const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
