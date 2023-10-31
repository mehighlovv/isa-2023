import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CompletedTerm from './completed-term.entity';
import { CompletedTermsService } from './completed-terms.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([CompletedTerm]),
    ],
    providers:[CompletedTermsService],
    exports:[CompletedTermsService],
})
export class CompletedTermsModule {}
