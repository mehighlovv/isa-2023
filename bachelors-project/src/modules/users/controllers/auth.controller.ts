import { Body, Controller, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Login } from 'src/modules/utils/interfaces/Login';
import { Public } from 'src/modules/utils/decorators/public.decorator';
import { RegisterCenterAdmin, RegisterUser } from 'src/modules/utils/interfaces/Register';
import { ChangePassword, Role, Roles } from 'src/modules/utils';
import { UsersService } from '../services/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService : UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: Login) {
    return this.authService.signIn(credentials.email, credentials.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() userInfo: RegisterUser) {
    return this.authService.registerUser(userInfo);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('activate')
  activateAccount(@Query('token') token : string){
    return this.authService.activateAccount(token);
  }

  @Roles(Role.REGISTERED_USER,Role.STAFF,Role.SYSTEM_ADMINISTRATOR,Role.TRANSFUSION_CENTER_ADMINISTRATOR)
  @Post('change-password')
  async changePassword(@Body() changePasswordInfo: ChangePassword){
    await this.usersService.changePassword(changePasswordInfo);
  }

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Post('/register/admin')
  async registerCenterAdministrator(@Body() registerCenterAdminInfo : RegisterCenterAdmin){
    return await this.authService.registerCenterAdmin(registerCenterAdminInfo);
  }
}