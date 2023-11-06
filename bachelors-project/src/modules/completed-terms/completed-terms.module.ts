import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CompletedTerm from './completed-term.entity';
import { CompletedTermsService } from './completed-terms.service';
import { CompletedTermsController } from './completed-terms.controller';
import { TermsModule } from '../terms/terms.module';
import { CompletedTermsResolver } from './completed-terms.resolver';
import { UsersModule } from '../users/users.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([CompletedTerm]),
        forwardRef(()=>UsersModule),
        forwardRef(()=>TermsModule)
    ],
    providers:[
        CompletedTermsService,
        CompletedTermsResolver
    ],
    exports:[CompletedTermsService],
    controllers:[CompletedTermsController]
})
export class CompletedTermsModule {}
