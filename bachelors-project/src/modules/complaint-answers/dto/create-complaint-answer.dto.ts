import { Field, InputType } from "@nestjs/graphql";
import { CreateComplaintAnswer } from "src/modules/utils";

@InputType()
export class CreateComplaintAnswerDto implements CreateComplaintAnswer{

    @Field()
    answer: string;

    @Field()
    complaintId: string;
}