import { Module, DynamicModule } from '@nestjs/common'

import { DynamoDBClass, DynamoDBModuleAsyncOptions, DynamoDBModuleOptions } from './dynamodb.interfaces'
import { DynamoDBCoreModule } from './dynamodb.coremodule'
import { createDynamoDBProvider } from './dynamodb.providers'

@Module({})
export class DynamoDBModule {
  static forRoot(options: DynamoDBModuleOptions): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRoot(options)]
    }
  }

  static forRootAsync(options: DynamoDBModuleAsyncOptions): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRootAsync(options)]
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
