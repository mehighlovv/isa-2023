import { Body, Controller, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/modules/utils/interfaces/login.dto';
import { Public } from 'src/modules/utils/decorators/public.decorator';
import { RegisterDto } from 'src/modules/utils/interfaces/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.signIn(credentials.email, credentials.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() userInfo: RegisterDto) {
    return this.authService.register(userInfo);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('activate')
  activateAccount(@Query('token') token : string){
    return this.authService.activateAccount(token);
  }
}