import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserModule } from 'src/users/user.module';

// if we need to use a service of some other module we put that service in the exports
// section of the module we are taking the service from and import that entire module 
// into the module we want to use the service from
@Module({
  imports:[UserModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
