import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import Loyalty from "./loyalty.entity";
import { GreaterThanOrEqual } from "../utils";


@Injectable()
export class LoyaltiesService{
    constructor(@InjectRepository(Loyalty) private readonly loyaltiesRepository: Repository<Loyalty>){}

    async getAllLoyalties(): Promise<Loyalty[]> {
        return this.loyaltiesRepository.find();
    }

    async createLoyalty(level: string, lowerThreshold: number, higherThreshold: number): Promise<Loyalty> {
        const loyalty = new Loyalty(level, lowerThreshold, higherThreshold);
        return this.loyaltiesRepository.save(loyalty);
    }

    async updateLoyalty(loyaltyId: string, level: string, lowerThreshold: number, higherThreshold: number): Promise<Loyalty> {
        const loyalty = await this.loyaltiesRepository.findOne({where:{id:loyaltyId}});

        if (!loyalty) {
            throw new NotFoundException('Loyalty tier not found');
        }

        loyalty.level = level;
        loyalty.lowerThreshold = lowerThreshold;
        loyalty.higherThreshold = higherThreshold;

        return this.loyaltiesRepository.save(loyalty);
    }

    async getLoyaltyTierByPointsCollected(points: number) : Promise<string> {
        const {level} = await this.loyaltiesRepository.findOne({
            where:{
                lowerThreshold:LessThanOrEqual(points),
                higherThreshold:MoreThanOrEqual(points)
            }
        });
        return level;
    }
}