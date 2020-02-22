import { Module, DynamicModule } from '@nestjs/common'

import { DynamoDBClass } from './dynamodb.interfaces'
import { DynamoDB } from 'aws-sdk'
import { DynamoDBCoreModule } from './dynamodb.coremodule'
import { createDynamoDBProvider } from './dynamodb.providers'

@Module({})
export class DynamoDBModule {
  static forRoot(options: DynamoDB.ClientConfiguration): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRoot(options)]
    }
  }
  static forFeature(models: DynamoDBClass[]): DynamicModule {
    const providers = createDynamoDBProvider(models)
    return {
      module: DynamoDBModule,
      providers,
      exports: providers
    }
  }
}
