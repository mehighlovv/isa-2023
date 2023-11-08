import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import Term from "./term.entity";
import { TermsService } from "./terms.service";
import { CurrentUser, DateTransformPipe, IAuthenticatedUser, Role, Roles } from "../utils";
import { UsePipes } from "@nestjs/common";
import { CreatePredefinedTermDto } from "./dto/create-predefined-term.dto";
import { CreateNewTermDto } from "./dto/create-new-term.dto";
import { TermReportDto } from "./dto/term-report.dto";
import { UsersService } from "../users/services/users.service";
import { CompletedTermsService } from "../completed-terms/completed-terms.service";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import User from "../users/entities/user.entity";
import CompletedTerm from "../completed-terms/completed-term.entity";


@Resolver(of=>Term)
export class TermsResolver{
    constructor(
        private readonly termsService: TermsService,
        private readonly usersService: UsersService,
        private readonly completedTermsService: CompletedTermsService,
        private readonly transfusionCentersService: TransfusionCentersService
    ){}

    @Mutation(returns=>Term)
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async createPredefinedTerm(@Args({name:'createPredefinedTermInfo', type:()=>CreatePredefinedTermDto}) createPredefinedTermInfo: CreatePredefinedTermDto){
        return await this.termsService.createPredefinedTerm(createPredefinedTermInfo);
    }

    @Mutation(returns=>Term)
    @Roles(Role.REGISTERED_USER)
    async reserveTerm(@Args({name:'id'}) id: string, @CurrentUser() user: IAuthenticatedUser){
        return await this.termsService.reservePredefinedTerm(user.userId, id);
    }

    @Mutation(returns=>Term)
    @Roles(Role.REGISTERED_USER)
    async cancelTerm(@Args({name:'id'}) id: string, @CurrentUser() user: IAuthenticatedUser){
        return await this.termsService.cancelTerm(user.userId, id);
    }

    @Mutation(returns=>Term)
    @Roles(Role.REGISTERED_USER)
    async reserveNewTerm(@Args({name:'createNewTermInfo', type:()=>CreateNewTermDto}) createNewTermInfo: CreateNewTermDto, @CurrentUser() user: IAuthenticatedUser){
        return await this.termsService.reserveNewTerm(createNewTermInfo, user.userId);
    }
    
    @Mutation(returns=>CompletedTerm)
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async completeTerm(@Args({name:'id'}) id: string, @Args({name:'termReport',type:()=>TermReportDto}) termReport: TermReportDto){
        return await this.termsService.completeTerm(id, termReport);
    }

    @ResolveField(()=>TransfusionCenter)
    async transfusionCenter(@Parent() term: Term){
        return await this.transfusionCentersService.getOneByTermId(term.id);
    }

    @ResolveField(()=>User)
    async reservationHolder(@Parent() term: Term){
        return await this.usersService.getOneByTermId(term.id);
    }

    @ResolveField(()=>CompletedTerm)
    async completedTerm(@Parent() term: Term){
        return await this.completedTermsService.getOneByTermId(term.id);
    }
}