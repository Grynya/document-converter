import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DocumentController } from '../controllers/document.controller';
import { DocumentService } from '../generation/document.service';
import { DocumentSchema } from '../schema/document.schema';

const dynamoDBClientConfig: DynamoDBClientConfig = {};
dynamoDBClientConfig.endpoint = 'http://dynamodb.eu-central-1.amazonaws.com';
const dynamooseModuleOptions: DynamooseModuleOptions = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  ddb: new DynamoDB(dynamoDBClientConfig),
};
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamooseModule.forRoot(dynamooseModuleOptions),
    DynamooseModule.forFeature([{ name: 'Documents', schema: DocumentSchema }]),
  ],
  providers: [Logger, DocumentService],
  controllers: [DocumentController],
})
export class AppModule {}
