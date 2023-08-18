import { Body, Controller, Post, HttpCode, HttpStatus, Query, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Role } from 'src/modules/utils/enums/role.enum';
import { Roles } from 'src/modules/utils/decorators/roles.decorator';
import { EditUserProfile } from 'src/modules/utils/interfaces/EditUserProfile';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.REGISTERED_USER)
  @Post(':id/profile')
  login(@Param('id') id: string,@Body() editUserProfileDto: EditUserProfile) {
    return this.usersService.editProfile(id, editUserProfileDto);
  }

}