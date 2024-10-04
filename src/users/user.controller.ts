import { Controller, Get, ParseIntPipe, Post, Query, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { ToNumberPipe } from 'src/pipes/pipe1';
import { userDto } from './dto/user.dto';
import { AuthentificationGuard } from 'src/guards/authentication_guards';
import { AuthorizationGuard } from 'src/guards/authorizataion_guard';
import { Roles } from 'src/decorators/roles.decarators';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';


// cache interceptor does caching for us 
@Roles(['admin'])
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthentificationGuard,AuthorizationGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @CacheKey("allUsers")
  @CacheTTL(60*1000)
  @Get('')
  getAllUsers() {
    console.log('inside the request handler');
    return this.userService.getAllUsers();
  }

  // @Get('limit')
  // getLimitedUsers(@Query('limit', ToNumberPipe) limit) {
  //   return this.userService.getLimitedUsers(limit);
  // }

  @Get('limit')
  getLimitedUsers(@Query('limit', new ParseIntPipe({errorHttpStatusCode:401})) limit) {
    return this.userService.getLimitedUsers(limit);
  }

  @Post()
  addUser(@Body() body: userDto) {
    return this.userService.addUser(body);
  }
}
