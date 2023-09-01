export interface PaginationConfigParams {
    pageName?: string;
    perPageName?: string;
    defaultPage?: number;
    defaultPerPage?: number;
}
export declare const PaginationParams: (...dataOrPipes: (PaginationConfigParams | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
