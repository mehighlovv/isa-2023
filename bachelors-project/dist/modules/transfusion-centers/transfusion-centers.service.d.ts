import TransfusionCenterEntity from "./entities/transfusion-center.entity";
import { Repository } from "typeorm";
import { Paginate, PaginationRequest } from "../utils/interfaces/Pagination";
import { CreateTransfusionCenter, EditTransfusionCenter, TransfusionCenter } from "../utils";
import { BloodStocksService } from "../blood-stocks/blood-stocks.service";
export declare class TransfusionCentersService {
    private readonly transfusionCentersRepository;
    private readonly bloodStocksService;
    constructor(transfusionCentersRepository: Repository<TransfusionCenterEntity>, bloodStocksService: BloodStocksService);
    getPaginated(paginationParams: PaginationRequest, name: string, address: string): Promise<Paginate<TransfusionCenter, import("../utils").Pagination>>;
    getOne(id: string): Promise<TransfusionCenter>;
    updateTransfusionCenter(editTransfusionCenterInfo: EditTransfusionCenter): Promise<void>;
    createTransfusionCenter(transfusionCenterRequest: CreateTransfusionCenter): Promise<TransfusionCenterEntity>;
    getBloodStocks(id: string): Promise<import("../blood-stocks/blood-stock.entity").default[]>;
    initializeBloodStocks(transfusionCenter: TransfusionCenterEntity): Promise<void>;
    getCentersWithFreeTerm(paginationParams: PaginationRequest, date: Date, time: string): Promise<Paginate<TransfusionCenter, import("../utils").Pagination>>;
    dtoToEntity(center: CreateTransfusionCenter): TransfusionCenterEntity;
    entityToDto(center: TransfusionCenterEntity): TransfusionCenter;
}
