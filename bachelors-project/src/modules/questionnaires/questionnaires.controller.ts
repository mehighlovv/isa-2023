import { Body, Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { QuestionnairesService } from "./questionnaires.service";
import { CreateAnswer, CurrentUser, Gender, IAuthenticatedUser, Role, Roles } from "../utils";


@Controller('questionnaires')
export class QuestionnairesController{
    private readonly logger = new Logger(QuestionnairesController.name);
    constructor(private readonly questionnairesService: QuestionnairesService){}

    @Roles(Role.REGISTERED_USER)
    @Get()
    async getQuestionnaire(@Query('type') type: Gender){
        return await this.questionnairesService.getByType(type);
    }

    @Roles(Role.REGISTERED_USER)
    @Post(':id/respond')
    async respondToQuestionnaire(@Param('id') id: string, @Body() answers: CreateAnswer[], @CurrentUser() user: IAuthenticatedUser){
        return await this.questionnairesService.respondToQuestionnaire(id,answers,user.userId);
    }

    

}