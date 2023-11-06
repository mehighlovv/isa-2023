import { DefaultValuePipe, Logger} from "@nestjs/common";
import { EnumValidationPipe, Role, Roles, TimeFrame} from "../utils";
import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import CompletedTerm from "./completed-term.entity";
import { CompletedTermsService } from "./completed-terms.service";
import { TermsService } from "../terms/terms.service";
import Term from "../terms/term.entity";
import User from "../users/entities/user.entity";
import { UsersService } from "../users/services/users.service";


@Resolver(of=>CompletedTerm)
export class CompletedTermsResolver{
    private readonly logger = new Logger(CompletedTermsResolver.name);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    constructor(
        private readonly completedTermsService: CompletedTermsService,
        private readonly termsService: TermsService,
        private readonly usersService: UsersService
    ){}

   
    @Query(() => [CompletedTerm])
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async getTermAnalytics(@Args({name:'transfusionCenterId'}) transfusionCenterId : string,
                            @Args({name:'timeFrame'}, 
                            new DefaultValuePipe(TimeFrame.MONTHLY),
                            new EnumValidationPipe(TimeFrame)) 
                            timeFrame: TimeFrame,
                            @Args({name:'referenceDate'})  referenceDate: Date){
        return await this.completedTermsService.getTermsAnalytics(transfusionCenterId, timeFrame, referenceDate);
    }

    @ResolveField(()=>Term)
    async term(@Parent() completedTerm: CompletedTerm){
        return await this.termsService.getOneByCompletedTermId(completedTerm.id);
    }

    @ResolveField(()=>User)
    async patient(@Parent() completedTerm: CompletedTerm){
        return await this.usersService.getOneByCompletedTermId(completedTerm.id)
    }
    

}