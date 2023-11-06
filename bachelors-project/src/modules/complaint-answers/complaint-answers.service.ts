import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ComplaintAnswer from "./complaint-answer.entity";
import { CreateComplaintAnswer } from "../utils";
import { ComplaintsService } from "../complaints/complaints.service";
import { UsersService } from "../users/services/users.service";
import { MailService } from "../mail/mail.service";


@Injectable()
export class ComplaintAnswersService{
   

    
    constructor(
        @InjectRepository(ComplaintAnswer) private readonly complaintAnswersRepository: Repository<ComplaintAnswer>,
        private readonly complaintsService: ComplaintsService,
        private readonly usersService: UsersService,
        private readonly mailService: MailService
    ){}

    async getOneOrFail(id: string){
        return await this.complaintAnswersRepository.findOneOrFail({where:{id:id}});
    }

    async createComplaintAnswer(createComplaintAnswerInfo: CreateComplaintAnswer, userId: string) {
        const complaint = await this.complaintsService.getOneOrFail(createComplaintAnswerInfo.complaintId);
        const administrator = await this.usersService.getById(userId);
        const complaintAnswer = new ComplaintAnswer(createComplaintAnswerInfo.answer, complaint, administrator);
        await this.mailService.sendComplaintAnswerToComplainee(complaintAnswer,complaint.complainee);
        return await this.complaintAnswersRepository.save(complaintAnswer);
    }

    async getOneByComplaintId(complaintId: string) {
        return await this.complaintAnswersRepository.findOne({
            where:{
                complaint:{
                    id:complaintId
                }
            }
        });
    }
}