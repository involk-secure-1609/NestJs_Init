import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() body: any) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.productsService.create();
  }

  @Get()
  async findAll()
  {
    try {
      return this.productsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          // this is what gets sent to the user as the response
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.productsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
