import { Body, Controller, Logger, Post } from "@nestjs/common";
import { CreateComplaintAnswer, CurrentUser, IAuthenticatedUser, Role, Roles } from "../utils";
import { ComplaintAnswersService } from "./complaint-answers.service";
import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import ComplaintAnswer from "./complaint-answer.entity";
import { CreateComplaintAnswerDto } from "./dto/create-complaint-answer.dto";
import Complaint from "../complaints/complaint.entity";
import { ComplaintsService } from "../complaints/complaints.service";
import User from "../users/entities/user.entity";
import { UsersService } from "../users/services/users.service";


@Resolver(of=>ComplaintAnswer)
export class ComplaintAnswersResolver{
    private readonly logger = new Logger(ComplaintAnswersResolver.name);
    constructor(
        private readonly complaintAnswersService: ComplaintAnswersService,
        private readonly complaintsService: ComplaintsService,
        private readonly usersService: UsersService
    ){}

    @Mutation(returns=>ComplaintAnswer)
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async createComplaintAnswer(@Args({name:'createComplaintAnswerInfo', type:()=>CreateComplaintAnswerDto}) createComplaintAnswerInfo : CreateComplaintAnswerDto , @CurrentUser() user: IAuthenticatedUser){
        return await this.complaintAnswersService.createComplaintAnswer(createComplaintAnswerInfo, user.userId);
    }

    @ResolveField(()=>Complaint)
    async complaint(@Parent() complaintAnswer: ComplaintAnswer){
        return await this.complaintsService.getOneByComplaintAnswerId(complaintAnswer.id);
    }

    @ResolveField(()=>User)
    async administrator(@Parent() complaintAnswer: ComplaintAnswer){
        return await this.usersService.getOneByComplaintAnswerId(complaintAnswer.id);
    }


}