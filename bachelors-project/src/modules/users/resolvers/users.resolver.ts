import { UsersService } from '../services/users.service';
import { EditUserProfile, EnumValidationPipe, GraphQLPagination, OrderByValue, PaginationParams, PaginationRequest, RegisterCenterAdmin, Role, Roles } from 'src/modules/utils';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import User from '../entities/user.entity';
import { DefaultValuePipe } from '@nestjs/common';
import { EditUserProfileDto } from '../dto/edit-user-profile.dto';

@Resolver(of=>User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(returns=>User)
  @Roles(Role.REGISTERED_USER)
  async editUserProfile(@Args({name:'editUserProfileDto', type:()=>EditUserProfileDto}) editUserProfileDto: EditUserProfileDto) {
    return await this.usersService.editProfile(editUserProfileDto);
  }

  @Query(()=>[User])
  @Roles(Role.STAFF,Role.SYSTEM_ADMINISTRATOR,Role.TRANSFUSION_CENTER_ADMINISTRATOR)
  async getPaginatedUsers(@Args({name:'firstName', defaultValue:""}) firstName: string, 
                          @Args({name:'lastName', defaultValue:""}) lastName: string, 
                          @Args() paginationParams: GraphQLPagination,
                          @Args({name:'orderBy', type:()=>OrderByValue},
                            new DefaultValuePipe(OrderByValue.DESC),
                            new EnumValidationPipe(OrderByValue)
                          ) orderBy: OrderByValue,
                          @Args({name:'sortBy'}) sortBy : string ='firstName'){
    return (await this.usersService.getPaginatedUsers({firstName,lastName},paginationParams,orderBy,sortBy)).records;
  }

  @Query(()=>User)
  @Roles(Role.STAFF, Role.SYSTEM_ADMINISTRATOR, Role.REGISTERED_USER, Role.TRANSFUSION_CENTER_ADMINISTRATOR)
  async getUserProfile(@Args({name:'userId'}) userId: string){
    return await this.usersService.getUserProfile(userId);
  }
}