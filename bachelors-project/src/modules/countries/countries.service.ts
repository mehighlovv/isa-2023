import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Country from "./country.entity";
import { Repository } from "typeorm";


@Injectable()
export class CountriesService{
    constructor(@InjectRepository(Country) private readonly countriesRepository: Repository<Country>){}

    async getOneOrFail(countryCode: string){
        return await this.countriesRepository.findOneOrFail({where:{code:countryCode}});
    }
}