import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import User from "../entities/user.entity";
import { Repository, TreeRepositoryUtils } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Register } from "src/modules/utils/interfaces/Register";
import { CountriesService } from "src/modules/countries/countries.service";
import Country from "src/modules/countries/country.entity";
import { Role } from "src/modules/utils/enums/role.enum";
import { EditUserProfile } from "src/modules/utils/interfaces/EditUserProfile";

@Injectable()
export class UsersService{
   
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly countriesService: CountriesService
    ){}

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({where:{email:email}});
    }

    async create(userInfo: Register) : Promise<User>{
        try{
            const country = await this.countriesService.findOneOrFail(userInfo.countryCode);
            return await this.usersRepository.save(this.mapRegisterDtoToUser(userInfo,country));
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
    async editProfile(userId: string,userInfo : EditUserProfile){
        const country = await this.countriesService.findOneOrFail(userInfo.countryCode);
        await this.usersRepository.update({id:userId},
            {
                firstName:userInfo.firstName,
                lastName:userInfo.lastName,
                country:country,
                phoneNumber:userInfo.phoneNumber,
                password:userInfo.password,
                occupation:userInfo.occupation,
                companyInfo:userInfo.companyInfo,
                address:userInfo.address,
                city:userInfo.city
            }
        );
    }

    mapRegisterDtoToUser(userInfo: Register, country: Country){
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
    
}