import { Body, Controller, Get, Logger, Param, Post, Query, UsePipes } from "@nestjs/common";
import { ComplaintsService } from "./complaints.service";
import { ComplaintType, CreateComplaint, CurrentUser, IAuthenticatedUser, PaginationParams, PaginationRequest, Role, Roles } from "../utils";


@Controller('complaints')
export class ComplaintsController{
    private readonly logger = new Logger(ComplaintsController.name);
    constructor(private readonly complaintsService: ComplaintsService){}

    @Roles(Role.REGISTERED_USER)
    @Post()
    async createComplaint(@Body() createComplaintInfo : CreateComplaint ,@Query('complaintType') complaintType : ComplaintType, @CurrentUser() user: IAuthenticatedUser){
        return await this.complaintsService.createComplaint(createComplaintInfo, complaintType, user.userId);
    }

    @Roles(Role.REGISTERED_USER)
    @Get('history')
    async getComplaintHistoryForRegisteredUser(@PaginationParams() paginationParams: PaginationRequest,@CurrentUser() user: IAuthenticatedUser){
        return await this.complaintsService.getUsersComplaintHistory(paginationParams, user.userId);
    }

    @Roles(Role.SYSTEM_ADMINISTRATOR)
    @Get('admin/history')
    async getComplaintHistorySystemAdmin(@PaginationParams() paginationParams: PaginationRequest,@CurrentUser() user: IAuthenticatedUser){
        return await this.complaintsService.getAdministratorsComplaintHistory(paginationParams, user.userId);
    }

    @Roles(Role.SYSTEM_ADMINISTRATOR)
    @Get('answerable')
    async getComplaintsWhichCanBeAnswered(@PaginationParams() paginationParams: PaginationRequest){
        return await this.complaintsService.getAllWhichCanBeAnswered(paginationParams);
    }

}