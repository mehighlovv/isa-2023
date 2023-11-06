import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/services/users.service";
import Rating from "./rating.entity";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { CreateRating } from "../utils";


@Injectable()
export class RatingsService{
    constructor(
        @InjectRepository(Rating) private readonly ratingsRepository: Repository<Rating>,
        private readonly usersService: UsersService,
        private readonly transfusionCentersService: TransfusionCentersService
    ){}

    async getOneOrFail(id: string){
        return await this.ratingsRepository.findOneOrFail({where:{id:id}});
    }

    async createRating(createRatingInfo: CreateRating, userId: string) {
        const user = await this.usersService.getById(userId);
        const transfusionCenter = await this.transfusionCentersService.getOne(createRatingInfo.transfusionCenterId);
        if((await this.userAlreadyRatedCenter(userId,transfusionCenter.id))){
            throw new BadRequestException('You cannot rate a transfusion center more than once!');
        }
        const rating = new Rating(createRatingInfo.rating, transfusionCenter, user);
        return await this.ratingsRepository.save(rating);
    }

    async updateRating(ratingId: string, rating: number , userId: string) {
        const ratingToBeUpdated = await this.ratingsRepository.findOneOrFail({
            where:{
                id:ratingId,
                user:{
                    id:userId
                }
            }
        });
        ratingToBeUpdated.rating=rating;
        return await this.ratingsRepository.save(ratingToBeUpdated);
    }

    async userAlreadyRatedCenter(userId: string, transfusionCenterId: string) {
        const rating = await this.ratingsRepository.findOne({
            where:{
                transfusionCenter:{
                    id:transfusionCenterId
                },
                user:{
                    id:userId
                }
            }
        });
        return rating !== null; 
    }
}