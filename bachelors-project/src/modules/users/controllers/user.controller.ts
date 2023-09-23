import { Body, Controller, Post, HttpCode, HttpStatus, Query, Param, Put, Get, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { EditUserProfile, EnumValidationPipe, OrderByValue, PaginationParams, PaginationRequest, RegisterCenterAdmin, Role, Roles } from 'src/modules/utils';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.REGISTERED_USER)
  @Put('profile')
  login(@Body() editUserProfileDto: EditUserProfile) {
    return this.usersService.editProfile(editUserProfileDto);
  }

  @Roles(Role.STAFF,Role.SYSTEM_ADMINISTRATOR,Role.TRANSFUSION_CENTER_ADMINISTRATOR)
  @Get()
  async getPaginatedUsers(@Query('firstName') firstName: string, 
                          @Query('lastName') lastName: string, 
                          @PaginationParams()paginationParams: PaginationRequest,
                          @Query('orderBy',
                            new DefaultValuePipe(OrderByValue.DESC),
                            new EnumValidationPipe(OrderByValue)
                          ) orderBy: OrderByValue,
                          @Query('sortBy') sortBy = 'firstName'){
    return await this.usersService.getPaginatedUsers({firstName,lastName},paginationParams,orderBy,sortBy);
  }

  

}