import { FactoryProvider } from '@nestjs/common/interfaces'
import { DynamoDB } from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'

import { getModelToken, getModelForClass } from '../util'
import { DynamoDBClass } from './dynamodb.interfaces'
import { DYNAMO_DB_CLIENT, DYNAMO_DB_DATA_MAPPER } from './dynamodb.constants'

type ModelFactory = (dynamoDBClient: DynamoDB, mapper: DataMapper) => any

export function createDynamoDBProvider(models: DynamoDBClass[]): FactoryProvider[] {
  const buildProvider = ({ name }: DynamoDBClass, modelFactory: ModelFactory) => ({
    provide: getModelToken(name),
    useFactory: modelFactory,
    inject: [DYNAMO_DB_CLIENT, DYNAMO_DB_DATA_MAPPER]
  })

  return models.reduce((providers, dynamoDBClass) => {
    const modelFactory = (dynamoDBClient: DynamoDB, mapper: DataMapper) => getModelForClass<InstanceType<DynamoDBClass>>(dynamoDBClass, dynamoDBClient, mapper)

    const modelProvider = buildProvider(dynamoDBClass, modelFactory)

    return [...providers, modelProvider]
  }, [])
}
