import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { 
    }

    canActivate(context: ExecutionContext): boolean {
        const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        let result = this.matchRoles(roles, user.rol.nombre);

        return result;
    }

    matchRoles(roles: string[], userRol: string): boolean {
        return roles.some(r => r === userRol);
    }
}
