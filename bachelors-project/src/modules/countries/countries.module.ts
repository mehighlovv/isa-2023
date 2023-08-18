import { Module } from '@nestjs/common';
import Country from './country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesService } from './countries.service';

@Module({
    imports:[TypeOrmModule.forFeature([Country])],
    providers: [CountriesService],
    exports: [CountriesService]
})
export class CountriesModule {}
