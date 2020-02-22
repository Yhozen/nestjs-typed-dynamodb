import * as DynamoDB from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'
import { DataMapper } from '@aws/dynamodb-data-mapper'
const AWSaccessKeyId = 'not-important'
const AWSsecretAccessKey = 'not-important'
const AWSregion = 'local'
const AWSendpoint = 'http://localhost:8000' // This is required

AWS.config.update({
  accessKeyId: AWSaccessKeyId,
  secretAccessKey: AWSsecretAccessKey,
  region: AWSregion
})

export const createDynamodbClient = (options: DynamoDB.ClientConfiguration): DynamoDB => new DynamoDB(options)

export const createMapper = (dynamoDBClient: DynamoDB): DataMapper =>
  new DataMapper({
    client: dynamoDBClient // the SDK client used to execute operations
  })
