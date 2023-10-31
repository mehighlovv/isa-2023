import TransfusionCenterEntity from "./entities/transfusion-center.entity";
import { Repository } from "typeorm";
import { Paginate, PaginationRequest } from "../utils/interfaces/Pagination";
import { CreateTransfusionCenter, EditTransfusionCenter, TermTimeFrame, TransfusionCenter } from "../utils";
import { BloodStocksService } from "../blood-stocks/blood-stocks.service";
import { TermsService } from "../terms/terms.service";
export declare class TransfusionCentersService {
    private readonly transfusionCentersRepository;
    private readonly bloodStocksService;
    private readonly termsService;
    constructor(transfusionCentersRepository: Repository<TransfusionCenterEntity>, bloodStocksService: BloodStocksService, termsService: TermsService);
    getPaginated(paginationParams: PaginationRequest, name: string, address: string): Promise<Paginate<TransfusionCenter, import("../utils").Pagination>>;
    getOne(id: string): Promise<TransfusionCenterEntity>;
    updateTransfusionCenter(editTransfusionCenterInfo: EditTransfusionCenter): Promise<void>;
    createTransfusionCenter(transfusionCenterRequest: CreateTransfusionCenter): Promise<TransfusionCenterEntity>;
    getBloodStocks(id: string): Promise<import("../blood-stocks/blood-stock.entity").default[]>;
    initializeBloodStocks(transfusionCenter: TransfusionCenterEntity): Promise<void>;
    getCentersWithFreeTerm(paginationParams: PaginationRequest, date: Date, time: string): Promise<Paginate<TransfusionCenter, import("../utils").Pagination>>;
    getWorkingCalendar(transfusionCenterId: string, timeFrame: TermTimeFrame, referenceDate: Date): Promise<import("../terms/term.entity").default[]>;
    getYearlyCalendar(transfusionCenterId: string, referenceDate: Date): Promise<import("../terms/term.entity").default[]>;
    getMonthlyCalendar(transfusionCenterId: string, referenceDate: Date): Promise<import("../terms/term.entity").default[]>;
    getWeeklyCalendar(transfusionCenterId: string, referenceDate: Date): Promise<import("../terms/term.entity").default[]>;
    dtoToEntity(center: CreateTransfusionCenter): TransfusionCenterEntity;
    entityToDto(center: TransfusionCenterEntity): TransfusionCenter;
}
