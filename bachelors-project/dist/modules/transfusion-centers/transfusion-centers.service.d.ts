import TransfusionCenterEntity from "./entities/transfusion-center.entity";
import { Repository } from "typeorm";
import { Paginate, PaginationRequest } from "../utils/interfaces/Pagination";
export declare class TransfusionCentersService {
    private readonly transfusionCentersRepository;
    constructor(transfusionCentersRepository: Repository<TransfusionCenterEntity>);
    getPaginated(paginationParams: PaginationRequest, name: string, address: string): Promise<Paginate<TransfusionCenterEntity, import("../utils/interfaces/Pagination").Pagination>>;
}
