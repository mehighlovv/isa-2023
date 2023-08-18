import { Body, Controller, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Login } from 'src/modules/utils/interfaces/Login';
import { Public } from 'src/modules/utils/decorators/public.decorator';
import { Register } from 'src/modules/utils/interfaces/Register';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: Login) {
    return this.authService.signIn(credentials.email, credentials.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() userInfo: Register) {
    return this.authService.register(userInfo);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('activate')
  activateAccount(@Query('token') token : string){
    return this.authService.activateAccount(token);
  }
}