import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import{CacheModule} from '@nestjs/cache-manager'
import {redisStore} from 'cache-manager-redis-yet'
import { UserModule } from './users/user.module';
import { ProductsModule } from './products/products.module';
// import { LoggerMiddleware } from './middleware/logger.middleware';
import { logger } from './middleware/logger.middleware';
import { TestMiddleware } from './middleware/test.middleware';
import { UserController } from './users/user.controller';
import { ProductsController } from './products/products.controller';
@Module({
  imports: [UserModule, ProductsModule,CacheModule.register({
    isGlobal:true,
    max:200,
    ttl:30*1000,
    store:redisStore
  })],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(UserController)
      .apply(TestMiddleware)
      .forRoutes(ProductsController);
  }
}
