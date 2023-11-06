import { BadRequestException, Injectable, InternalServerErrorException, Logger, forwardRef, Inject } from "@nestjs/common";
import User from "../entities/user.entity";
import { ILike, MoreThan, Repository, TreeRepositoryUtils } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { RegisterCenterAdmin, RegisterUser } from "src/modules/utils/interfaces/Register";
import { CountriesService } from "src/modules/countries/countries.service";
import Country from "src/modules/countries/country.entity";
import { Role } from "src/modules/utils/enums/role.enum";
import { EditUserProfile } from "src/modules/utils/interfaces/EditUserProfile";
import { ChangePassword } from "src/modules/utils/interfaces/ChangePassword";
import { DEFAULT_LOCKOUT_PERIOD, DEFAULT_PASSWORD_ATTEMPTS, OrderByValue, Paginate, PaginationRequest, UserSearchParams, UserSortParams } from "src/modules/utils";
import { randomUUID } from "crypto";
import { TransfusionCentersService } from "src/modules/transfusion-centers/transfusion-centers.service";
import { TermsService } from "src/modules/terms/terms.service";
import TransfusionCenter from "src/modules/transfusion-centers/entities/transfusion-center.entity";
import { LoyaltiesService } from "src/modules/loyalty/loyalties.service";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class UsersService{
    
    
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly countriesService: CountriesService,
        private readonly transfusionCentersService: TransfusionCentersService,
        @Inject(forwardRef(() => TermsService))
        private readonly termsService: TermsService,
        private readonly loyaltiesService: LoyaltiesService
    ){}

    async getOne(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({where:{email:email}});
    }

    async getById(id: string) {
        return await this.usersRepository.findOneOrFail({
            where:{id:id},
            relations:{
                transfusionCenter:true,
            }
        });
    }

    async getUserProfile(userId: string){
        const user = await this.getById(userId);
        const loyaltyLevel = await this.loyaltiesService.getLoyaltyTierByPointsCollected(user.points);
        return {...user, loyaltyLevel};
    }

    @Cron('0 0 1 * *')
    async resetPenalties(){
        await this.usersRepository.update({penalties:MoreThan(0)},{penalties:0});
    }

    async createRegisteredUser(userInfo: RegisterUser) : Promise<User>{
        try{
            const country = await this.countriesService.getOneOrFail(userInfo.countryCode);
            return await this.usersRepository.save(this.mapRegisterUserDtoToUser(userInfo,country));
        }
        catch(e){
            throw new InternalServerErrorException('A user with that email already exists!');
        }
    }

    async getPaginatedUsers(searchParams: UserSearchParams, paginationParams: PaginationRequest,orderBy: OrderByValue, sortBy: string){
        const {
            page,
            perPage
        } = paginationParams;
        const {
            firstName,
            lastName
        } = searchParams;
        const query = {
            where:{
                firstName: firstName? ILike(`%${firstName}%`) : undefined,
                lastName: lastName? ILike(`%${lastName}%`) : undefined,
                role: Role.REGISTERED_USER
            },
            order:undefined,
            skip:(page-1)*perPage,
            take:perPage
        }
        if(this.isSortValid(sortBy)){
            query.order={...query.order,...{[sortBy]:orderBy}};
        }
        const [users, totalCount] = await this.usersRepository.findAndCount(query);
        const paginate: Paginate<User> = {
            records: users,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: users.length,
            },
        };
        return paginate;
    }

    async activateAccount(userId: string) {
        const result = await this.usersRepository.update({id:userId},{isAccepted:true});
        if(result.affected){
            return true;
        }
        return false;
    }
    
    async editProfile(userInfo : EditUserProfile){
        const country = await this.countriesService.getOneOrFail(userInfo.countryCode);
        await this.usersRepository.update({id:userInfo.id},
            {
                firstName:userInfo.firstName,
                lastName:userInfo.lastName,
                country:country,
                phoneNumber:userInfo.phoneNumber,
                occupation:userInfo.occupation,
                companyInfo:userInfo.companyInfo,
                address:userInfo.address,
                city:userInfo.city
            }
        );
    }

    async changePassword(changePasswordInfo: ChangePassword){
        const user = await this.usersRepository.findOneOrFail({where:{id:changePasswordInfo.id}});
        if(user.password!==changePasswordInfo.oldPassword){
            if(user.passwordAttempts>0){
                user.passwordAttempts--;
                await this.usersRepository.save(user);
                throw new BadRequestException('Incorrect password!');
            }
            setTimeout(async () => {
                user.passwordAttempts = DEFAULT_PASSWORD_ATTEMPTS;
                await this.usersRepository.save(user);
              }, DEFAULT_LOCKOUT_PERIOD);
            throw new BadRequestException('Too many attempts at changing your password!');
        }
        if(user.password===changePasswordInfo.newPassword){
            throw new BadRequestException('New password cannot be the same as the old password');
        }
        if(user.passwordAttempts==0){
            throw new BadRequestException('Too many attempts at changing your password!');
        }
        user.password=changePasswordInfo.newPassword;
        await this.usersRepository.save(user);
        return 'You have successfuly changed your password';
        
    }

    async createCenterAdmin(userInfo: RegisterCenterAdmin) : Promise<User>{
        try{
            const country = await this.countriesService.getOneOrFail(userInfo.countryCode);
            const transfusionCenter = await this.transfusionCentersService.getOne(userInfo.transfusionCenterId);
            return await this.usersRepository.save(this.mapRegisterCenterAdminDtoToUser(userInfo,country,transfusionCenter));
        }
        catch(e){
            throw new InternalServerErrorException('A user with that email already exists!');
        }
    }

    async updateUser(updatedUser: User) {
        await this.usersRepository.save(updatedUser);
    }

    async getOneByCompletedTermId(completedTermId: string) {
        return await this.usersRepository.findOne({
            where:{
                termHistory:{
                    id:completedTermId
                }
            }
        });
    }

    async getByRatingId(ratingId: string) {
        return await this.usersRepository.findOne({
            where:{
                ratings:{
                    id:ratingId
                }
            }
        });
    }

    async getOneByComplaintAnswerId(complaintAnswerId: string) {
        return await this.usersRepository.findOne({
            where:{
                complaintAnswers:{
                    id:complaintAnswerId
                }
            }
        });
    }

    async getOneByAnswerId(answerId: string) {
        return await this.usersRepository.findOne({
            where:{
                answers:{
                    id:answerId
                }
            }
        });
    }

    async getOneByComplaintId(complaintId: string) {
        return await this.usersRepository.findOne({
            where:{
                complaints:{
                    id:complaintId
                }
            }
        });
    }

    mapRegisterUserDtoToUser(userInfo: RegisterUser, country: Country){
        return {
            email:userInfo.email,
            password:userInfo.password,
            firstName:userInfo.firstName,
            lastName:userInfo.lastName,
            phoneNumber:userInfo.phoneNumber,
            gender: userInfo.gender,
            socialSecurityNumber:userInfo.socialSecurityNumber,
            city:userInfo.city,
            address:userInfo.address,
            occupation:userInfo.occupation,
            companyInfo:userInfo.companyInfo,
            country:country,
            isAccepted: false,
            role: Role.REGISTERED_USER,
            points:0,
            penalties:0
        }
    }

    mapRegisterCenterAdminDtoToUser(userInfo: RegisterCenterAdmin, country: Country, transfusionCenter: TransfusionCenter){
        return {
            email:userInfo.email,
            password: randomUUID(),
            transfusionCenter:transfusionCenter,
            firstName:userInfo.firstName,
            lastName:userInfo.lastName,
            phoneNumber:userInfo.phoneNumber,
            gender: userInfo.gender,
            socialSecurityNumber:userInfo.socialSecurityNumber,
            city:userInfo.city,
            address:userInfo.address,
            occupation:userInfo.occupation,
            companyInfo:userInfo.companyInfo,
            country:country,
            isAccepted: false,
            role: Role.TRANSFUSION_CENTER_ADMINISTRATOR
        }
    }

    private isSortValid(sortBy: string) {
        if (sortBy in new UserSortParams()) return true;
        else return false;
    }

    
}