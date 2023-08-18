import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/modules/utils/interfaces/register.dto';
import { DEFAULT_FRONT_URL } from 'src/modules/utils/constants';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== password || !user?.isAccepted) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userInfo: RegisterDto){
    if(userInfo.password!==userInfo.verifyPassword){
        throw new BadRequestException('The passwords must match!');
    }
    const newUser = await this.usersService.create(userInfo);
    const payload = { userId: newUser.id, username: newUser.email, role: newUser.role };
    await this.mailService.sendUserConfirmation(newUser,newUser.id)
    return {
        access_token: await this.jwtService.signAsync(payload),
    }; 
  }

  async activateAccount(userId: string){
    const result = await this.usersService.activateAccount(userId);
    if(result){
      return 'Go to the login page located  <a href="' + DEFAULT_FRONT_URL + 'login' + '">here</a>';
    }
    else{
      return 'Something went wrong!';
    }
  }
}