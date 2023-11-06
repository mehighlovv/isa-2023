import { Field, Float, InputType } from "@nestjs/graphql";
import { CreateRating } from "src/modules/utils";

@InputType()
export class CreateRatingDto implements CreateRating{
    @Field(()=>Float)
    rating: number;

    @Field()
    transfusionCenterId: string;
}