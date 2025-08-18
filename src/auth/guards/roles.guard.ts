import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { UserRole } from 'src/schemas/models';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(!requiredRoles || requiredRoles.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const role = req.role;
    //console.log(req.firebaseUID);
    console.log("roles.guard success");
    console.log(role);
    if(!role) throw new ForbiddenException('Role is missing');

    return requiredRoles.includes(role);
  }
}
