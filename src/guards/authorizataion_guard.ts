import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decarators';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    1;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.get(ROLES_KEY, context.getClass());

    // if we want to make it dynamic we can use getAllAndOverride it will go through the list of roles
    // and find the first non empty one and use that
    // const requiredRoles=this.reflector.getAllAndOverride(ROLES_KEY,[context.getClass(),context.getHandler()]);

    // if your AuthorizationGuard is in front of a route handler
    // const requiredRoles=this.reflector.get(ROLES_KEY,context.getHandler());

    // if(request.user.role is not in the requiredRoles array then return false else true)
    console.log('inside authorization guard ');
    return true;
  }
}
