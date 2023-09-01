import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import QuestionOrder from "./question-order.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([QuestionOrder]),
    ],
})
export class QuestionOrdersModule {}