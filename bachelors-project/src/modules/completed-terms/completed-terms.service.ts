import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import CompletedTermEntity from "./completed-term.entity";


@Injectable()
export class CompletedTermsService{

    constructor(@InjectRepository(CompletedTermEntity) private readonly completedTermsRepository : Repository<CompletedTermEntity>){}

    async createCompletedTerm(completedTerm :CompletedTermEntity){
        return await this.completedTermsRepository.save(completedTerm);
    }
}