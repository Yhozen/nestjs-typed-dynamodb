import { Module, DynamicModule } from '@nestjs/common'

import {
  DynamoDBModuleAsyncOptions,
  DynamoDBModuleOptions,
  DynamoDBInput,
} from './dynamodb.interfaces'
import { DynamoDBCoreModule } from './dynamodb.coremodule'
import { createDynamoDBProvider } from './dynamodb.providers'
import { convertToClassWithOptions } from '../util/convertToClassWithOptions'

@Module({})
export class DynamoDBModule {
  static forRoot(options: DynamoDBModuleOptions): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRoot(options)],
    }
  }

  static forRootAsync(options: DynamoDBModuleAsyncOptions): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRootAsync(options)],
    }
  }

  static forFeature(models: DynamoDBInput[]): DynamicModule {
    const convertedModels = models.map(model =>
      convertToClassWithOptions(model),
    )

    const providers = createDynamoDBProvider(convertedModels)

    return {
      module: DynamoDBModule,
      providers,
      exports: providers,
    }
  }
}
