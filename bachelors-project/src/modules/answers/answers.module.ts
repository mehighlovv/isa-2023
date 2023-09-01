import { TypeOrmModule } from "@nestjs/typeorm";
import Answer from "./answer.entity";
import { Module } from "@nestjs/common";
import { AnswersService } from "./answers.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Answer]),
    ],
    providers:[AnswersService],
    exports:[AnswersService]
})
export class AnswersModule {}