import { TransfusionCentersService } from "./transfusion-centers.service";
import { CreateTransfusionCenter, EditTransfusionCenter, PaginationRequest, TermTimeFrame } from "../utils";
export declare class TransfusionCentersController {
    private readonly transfusionCentersService;
    private readonly logger;
    constructor(transfusionCentersService: TransfusionCentersService);
    getPaginated(paginationParams: PaginationRequest, name?: string, address?: string): Promise<import("../utils").Paginate<import("../utils").TransfusionCenter, import("../utils").Pagination>>;
    getCenterDetails(id: string): Promise<import("./entities/transfusion-center.entity").default>;
    editTransfusionCenter(editTransfusionCenterInfo: EditTransfusionCenter): Promise<void>;
    createTransfusionCenter(transfusionCenterInfo: CreateTransfusionCenter): Promise<import("./entities/transfusion-center.entity").default>;
    getBloodStocks(id: string): Promise<import("../blood-stocks/blood-stock.entity").default[]>;
    getTransfusionCentersWhichHaveFreeTerm(paginationParams: PaginationRequest, date: Date, time: string): Promise<import("../utils").Paginate<import("../utils").TransfusionCenter, import("../utils").Pagination>>;
    getWorkingCalendar(id: string, timeFrame: TermTimeFrame, referenceDate: Date): Promise<import("../terms/term.entity").default[]>;
}
