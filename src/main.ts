import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
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
  await app.listen(3000);
}
bootstrap();
