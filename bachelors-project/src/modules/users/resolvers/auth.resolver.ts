import { AuthService } from '../services/auth.service';
import { Public } from 'src/modules/utils/decorators/public.decorator';
import { RegisterCenterAdmin, RegisterUser } from 'src/modules/utils/interfaces/Register';
import { ChangePassword, Role, Roles } from 'src/modules/utils';
import { UsersService } from '../services/users.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import User from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { RegisterCenterAdminDto } from '../dto/register-center-admin.dto';

@Resolver(of=>User)
export class AuthResolver {
  constructor(private authService: AuthService, private usersService : UsersService) {}

  @Mutation(returns=>String)
  @Public()
  async login(@Args({name:'credentials',type:()=>LoginDto}) credentials: LoginDto) {
    return await this.authService.signIn(credentials.email, credentials.password);
  }

  @Mutation(returns=>String)
  @Public()
  async register(@Args({name:'userInfo',type:()=>RegisterUserDto}) userInfo: RegisterUserDto) {
    return await this.authService.registerUser(userInfo);
  }

  @Mutation(returns=>String)
  @Public()
  async activateAccount(@Args('token') token : string){
    return await this.authService.activateAccount(token);
  }

  @Mutation(returns=>String)
  @Roles(Role.REGISTERED_USER,Role.STAFF,Role.SYSTEM_ADMINISTRATOR,Role.TRANSFUSION_CENTER_ADMINISTRATOR)
  async changePassword(@Args({name:'changePasswordInfo',type:()=>ChangePasswordDto}) changePasswordInfo: ChangePasswordDto){
    return await this.usersService.changePassword(changePasswordInfo);
  }

  @Mutation(returns=>String)
  @Roles(Role.SYSTEM_ADMINISTRATOR)
  async registerCenterAdministrator(@Args({name:'registerCenterAdminInfo',type:()=>RegisterCenterAdminDto}) registerCenterAdminInfo : RegisterCenterAdminDto){
    return await this.authService.registerCenterAdmin(registerCenterAdminInfo);
  }
}