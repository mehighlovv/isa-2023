import Country from "./country.entity";
import { Repository } from "typeorm";
export declare class CountriesService {
    private readonly countriesRepository;
    constructor(countriesRepository: Repository<Country>);
    getOneOrFail(countryCode: string): Promise<Country>;
}
