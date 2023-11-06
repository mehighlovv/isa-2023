import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IAuthenticatedUser } from '../interfaces';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    let request={headers: { authorization: "" } };
    if(context["contextType"] == "http"){
      request = context.switchToHttp().getRequest();
    }else{
      const { req } = context.getArgs()[2]; // Access the GraphQL context's req property
      request = req;
    }
    
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      if (!payload.isAccepted) {
        throw new UnauthorizedException();
      }
      request['user'] = payload as IAuthenticatedUser;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromRequest(req: { headers: { authorization: string } }): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}