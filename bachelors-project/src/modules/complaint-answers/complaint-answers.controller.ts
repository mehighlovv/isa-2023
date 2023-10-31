import { Body, Controller, Logger, Post } from "@nestjs/common";
import { CreateComplaintAnswer, CurrentUser, IAuthenticatedUser, Role, Roles } from "../utils";
import { ComplaintAnswersService } from "./complaint-answers.service";


@Controller('complaint-answers')
export class ComplaintAnswersController{
    private readonly logger = new Logger(ComplaintAnswersController.name);
    constructor(private readonly complaintAnswersService: ComplaintAnswersService){}

    @Roles(Role.SYSTEM_ADMINISTRATOR)
    @Post()
    async createComplaintAnswer(@Body() createComplaintAnswerInfo : CreateComplaintAnswer , @CurrentUser() user: IAuthenticatedUser){
        return await this.complaintAnswersService.createComplaintAnswer(createComplaintAnswerInfo, user.userId);
    }

}