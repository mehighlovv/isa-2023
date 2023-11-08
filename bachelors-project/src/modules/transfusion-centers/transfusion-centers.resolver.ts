import { TransfusionCentersService } from "./transfusion-centers.service";
import { CreateTransfusionCenter, EditTransfusionCenter, EnumValidationPipe, GraphQLPagination, Public, Role, Roles, TermTimeFrame} from "../utils";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import TransfusionCenter from "./entities/transfusion-center.entity";
import { DefaultValuePipe } from "@nestjs/common";
import { CreateTransfusionCenterDto } from "./dto/create-transfusion-center.dto";
import { EditTransfusionCenterDto } from "./dto/edit-transfusion-center.dto";
import BloodStock from "../blood-stocks/blood-stock.entity";
import Term from "../terms/term.entity";
import Rating from "../ratings/rating.entity";
import { RatingsService } from "../ratings/ratings.service";


@Resolver(of=>TransfusionCenter)
export class TransfusionCentersResolver{
    constructor(
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly ratingsService: RatingsService
    ){}

    @Query(()=>[TransfusionCenter])
    @Public()
    async getTransfusionCenters(
        @Args() paginationParams: GraphQLPagination,
        @Args({name:'name', defaultValue:""}) name?: string,
        @Args({name:'address', defaultValue:""}) address? : string
    ){
        return (await this.transfusionCentersService.getPaginated(paginationParams,name,address)).records;
    }

    @Query(()=>TransfusionCenter)
    @Public()
    async getCenterDetails(@Args({name:'id'}) id: string){
        return await this.transfusionCentersService.getByIdWithAverageRating(id);
    }

    @Mutation(returns=>TransfusionCenter)
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR, Role.SYSTEM_ADMINISTRATOR)
    async editTransfusionCenter(@Args({name:'editTransfusionCenterInfo', type:()=>EditTransfusionCenterDto}) editTransfusionCenterInfo : EditTransfusionCenterDto){
        return await this.transfusionCentersService.updateTransfusionCenter(editTransfusionCenterInfo);
    }

    @Mutation(returns=>TransfusionCenter)
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async createTransfusionCenter(@Args({name:'transfusionCenterInfo', type:()=>CreateTransfusionCenterDto}) transfusionCenterInfo : CreateTransfusionCenterDto){
        return await this.transfusionCentersService.createTransfusionCenter(transfusionCenterInfo);
    }

    @Query(()=>[BloodStock])
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async getBloodStocks(@Args({name:'id'}) id: string){
        return await this.transfusionCentersService.getBloodStocks(id);
    }

    @Query(()=>[TransfusionCenter])
    @Roles(Role.REGISTERED_USER)
    async getTransfusionCentersWhichHaveFreeTerm(@Args() paginationParams: GraphQLPagination, @Args({name:'date'}) date: Date, @Args({name:'time'}) time: string){
        return (await this.transfusionCentersService.getCentersWithFreeTerm(paginationParams, date, time)).records;
    }

    @Query(()=>[Term])
    @Roles(Role.REGISTERED_USER)
    async getWorkingCalendar(@Args({name:'id'}) id : string,
                            @Args({name:'timeFrame'}, 
                            new DefaultValuePipe(TermTimeFrame.WEEKLY),
                            new EnumValidationPipe(TermTimeFrame)) 
                            timeFrame: TermTimeFrame, 
                            @Args({name:'referenceDate'})  referenceDate: Date){
        return await this.transfusionCentersService.getWorkingCalendar(id, timeFrame, referenceDate);
    }

    @ResolveField(()=>[Rating])
    async ratings(@Parent() transfusionCenter: TransfusionCenter){
        return await this.ratingsService.getByTransfusionCenterId(transfusionCenter.id);
    }
    

}