import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    let request={headers: { authorization: "" } };
    if(context["contextType"] == "http"){
      request = context.switchToHttp().getRequest();
    }else{
      const { req } = context.getArgs()[2]; // Access the GraphQL context's req property
      request = req;
    }
    const user = request["user"];
    return requiredRoles.some((role) => user.role===role);
  }
}