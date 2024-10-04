import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { logger } from './middleware/logger.middleware';
//express platform is used by default
async function bootstrap() {

  // the two below have the same functioning
  const app=await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    
  }));
  //If we want to add global middleware
  // app.use(LoggerMiddleware)
  const loggerInstance=app.get(logger);
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  await app.listen(3000);
}
bootstrap();
