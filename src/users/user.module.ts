import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {JwtModule} from '@nestjs/jwt'
@Module({
  imports:[
    JwtModule.register({
      global:true,
      secret:'ADSJDNSDSANSANDOIKASINDOANDADASDASDASA',
      signOptions:{expiresIn:3600},
    })
  ],
  controllers:[UserController],
  providers:[UserService],
  exports:[UserService]
})
export class UserModule {}

