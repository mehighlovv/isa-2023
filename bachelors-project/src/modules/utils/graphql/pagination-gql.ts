import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { PaginationRequest } from "../interfaces";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../constants";

@ArgsType()
export class GraphQLPagination implements PaginationRequest{
    @Field(()=>Int, {defaultValue:DEFAULT_PAGE})
    page: number;

    @Field(()=>Int, {defaultValue:DEFAULT_PER_PAGE})
    perPage: number;
}