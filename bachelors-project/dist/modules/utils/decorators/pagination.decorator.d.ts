export interface PaginationConfigParams {
    pageName?: string;
    perPageName?: string;
    defaultPage?: number;
    defaultPerPage?: number;
}
export declare const PaginationParams: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | PaginationConfigParams)[]) => ParameterDecorator;
