import { Module, Global, Inject, DynamicModule } from '@nestjs/common'
import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DYNAMO_DB_CLIENT, DYNAMO_DB_DATA_MAPPER } from './dynamodb.constants'
import { createMapper, createDynamodbClient } from './dynamodb.config'

@Global()
@Module({})
export class DynamoDBCoreModule {
  static forRoot(options: DynamoDB.ClientConfiguration): DynamicModule {
    const dynamodbClient = createDynamodbClient(options)

    const mapper = createMapper(dynamodbClient)
    const clientProvider = {
      provide: DYNAMO_DB_CLIENT,
      useValue: dynamodbClient
    }

    const dataMapperProvider = {
      provide: DYNAMO_DB_DATA_MAPPER,
      useValue: mapper
    }

    return {
      module: DynamoDBCoreModule,
      providers: [dataMapperProvider, clientProvider],
      exports: [dataMapperProvider, clientProvider]
    }
  }
}
