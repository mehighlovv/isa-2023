import { Body, Controller, Logger, Param, Post, UsePipes } from "@nestjs/common";
import { TermsService } from "./terms.service";
import { CreatePredefinedTerm, CurrentUser, DateTransformPipe, IAuthenticatedUser, Role, Roles } from "../utils";


@Controller('terms')
export class TermsController{
    private readonly logger = new Logger(TermsController.name);
    constructor(private readonly termsService: TermsService){}

    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    @UsePipes(new DateTransformPipe())
    @Post()
    async createPredefinedTerm(@Body() createPredefinedTermInfo: CreatePredefinedTerm){
        return await this.termsService.createPredefinedTerm(createPredefinedTermInfo);
    }

    @Roles(Role.REGISTERED_USER)
    @Post(':id/reserve')
    async reserveTerm(@Param('id') id: string, @CurrentUser() user: IAuthenticatedUser){
        return await this.termsService.reservePredefinedTerm(user.userId, id);
    }

    @Roles(Role.REGISTERED_USER)
    @Post(':id/cancel')
    async cancelTerm(@Param('id') id: string, @CurrentUser() user: IAuthenticatedUser){
        return await this.termsService.cancelTerm(user.userId, id);
    }
    

}