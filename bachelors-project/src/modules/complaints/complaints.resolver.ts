import { ComplaintsService } from "./complaints.service";
import { ComplaintType, CreateComplaint, CurrentUser, GraphQLPagination, IAuthenticatedUser, PaginationParams, PaginationRequest, Role, Roles } from "../utils";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import Complaint from "./complaint.entity";
import { CreateComplaintDto } from "./dto/create-complaint.dto";
import { Logger } from "@nestjs/common";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import User from "../users/entities/user.entity";
import ComplaintAnswer from "../complaint-answers/complaint-answer.entity";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { UsersService } from "../users/services/users.service";
import { ComplaintAnswersService } from "../complaint-answers/complaint-answers.service";


@Resolver(of=>Complaint)
export class ComplaintsResolver{
    private readonly logger = new Logger(ComplaintsResolver.name);
    constructor(
        private readonly complaintsService: ComplaintsService,
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly usersService: UsersService,
        private readonly complaintAnswersService: ComplaintAnswersService 
    ){}

    @Mutation(returns=>Complaint)
    @Roles(Role.REGISTERED_USER)
    async createComplaint(@Args({name:'createComplaintInfo', type:()=>CreateComplaintDto}) createComplaintInfo : CreateComplaintDto ,@Args({name:'complaintType',type:()=>ComplaintType}) complaintType : ComplaintType, @CurrentUser() user: IAuthenticatedUser){
        return await this.complaintsService.createComplaint(createComplaintInfo, complaintType, user.userId);
    }

    @Query(()=>[Complaint])
    @Roles(Role.REGISTERED_USER)
    async getComplaintHistoryForRegisteredUser(@Args() paginationParams: GraphQLPagination,@CurrentUser() user: IAuthenticatedUser){
        const paginate = await this.complaintsService.getUsersComplaintHistory(paginationParams, user.userId);
        return paginate.records;
    }

    @Query(()=>[Complaint])
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async getComplaintHistorySystemAdmin(@Args() paginationParams: GraphQLPagination,@CurrentUser() user: IAuthenticatedUser){
        const paginate = await this.complaintsService.getAdministratorsComplaintHistory(paginationParams, user.userId);
        return paginate.records;
    }

    @Query(()=>[Complaint])
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async getComplaintsWhichCanBeAnswered(@Args() paginationParams: GraphQLPagination){
        const paginate = await this.complaintsService.getAllWhichCanBeAnswered(paginationParams);
        return paginate.records;
    }

    @ResolveField(()=>TransfusionCenter)
    async transfusionCenter(@Parent() complaint: Complaint){
        return await this.transfusionCentersService.getOneByComplaintId(complaint.id);
    }

    @ResolveField(()=>User)
    async complainee(@Parent() complaint: Complaint){
        return await this.usersService.getOneByComplaintId(complaint.id);
    }

    @ResolveField(()=>User)
    async staff(@Parent() complaint: Complaint){
        return await this.usersService.getOneByComplaintId(complaint.id);
    }

    @ResolveField(()=>ComplaintAnswer)
    async answer(@Parent() complaint: Complaint){
        return await this.complaintAnswersService.getOneByComplaintId(complaint.id);
    }

}