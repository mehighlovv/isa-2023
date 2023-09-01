import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import User from "../entities/user.entity";
import { Repository, TreeRepositoryUtils } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { RegisterCenterAdmin, RegisterUser } from "src/modules/utils/interfaces/Register";
import { CountriesService } from "src/modules/countries/countries.service";
import Country from "src/modules/countries/country.entity";
import { Role } from "src/modules/utils/enums/role.enum";
import { EditUserProfile } from "src/modules/utils/interfaces/EditUserProfile";
import { ChangePassword } from "src/modules/utils/interfaces/ChangePassword";
import { DEFAULT_LOCKOUT_PERIOD, DEFAULT_PASSWORD_ATTEMPTS, TransfusionCenter } from "src/modules/utils";
import { randomUUID } from "crypto";
import { TransfusionCentersService } from "src/modules/transfusion-centers/transfusion-centers.service";

@Injectable()
export class UsersService{
   
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly countriesService: CountriesService,
        private readonly transfusionCentersService: TransfusionCentersService
    ){}

    async getOne(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({where:{email:email}});
    }

    async getById(id: string) {
        return await this.usersRepository.findOne({where:{id:id}});
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
            role: Role.REGISTERED_USER
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
    
}