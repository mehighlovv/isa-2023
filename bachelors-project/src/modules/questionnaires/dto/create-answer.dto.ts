import { Field, InputType } from "@nestjs/graphql";
import { CreateAnswer, CreateComplaint } from "src/modules/utils";

@InputType()
export class CreateAnswerDto implements CreateAnswer{
    
    @Field()
    questionId: string;

    @Field()
    response: boolean;

}