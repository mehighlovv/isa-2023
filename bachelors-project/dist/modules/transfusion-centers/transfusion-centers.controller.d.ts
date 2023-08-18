import { TransfusionCentersService } from "./transfusion-centers.service";
import { PaginationRequest } from "../utils/interfaces/Pagination";
export declare class TransfusionCentersController {
    private readonly transfusionCentersService;
    private readonly logger;
    constructor(transfusionCentersService: TransfusionCentersService);
    getPaginated(paginationParams: PaginationRequest, name?: string, address?: string): Promise<import("../utils/interfaces/Pagination").Paginate<import("./entities/transfusion-center.entity").default, import("../utils/interfaces/Pagination").Pagination>>;
}
