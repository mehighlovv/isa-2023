import { Body, Controller, Post, HttpCode, HttpStatus, Query, Param, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { EditUserProfile, RegisterCenterAdmin, Role, Roles } from 'src/modules/utils';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.REGISTERED_USER)
  @Put('profile')
  login(@Body() editUserProfileDto: EditUserProfile) {
    return this.usersService.editProfile(editUserProfileDto);
  }

  

}