
  import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Reflector } from '@nestjs/core/services/reflector.service';

  import {AuthGuard} from "@nestjs/passport/dist/auth.guard"
import { IS_PUBLIC_KEY } from 'src/common/decorators/is_public.meta';

  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
      super();
    }
     canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
    
      return super.canActivate(context);
    }
  }
  