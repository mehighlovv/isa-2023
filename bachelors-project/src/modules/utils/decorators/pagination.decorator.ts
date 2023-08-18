import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../constants';
import { PaginationRequest } from '../interfaces/Pagination';

export interface PaginationConfigParams {
    pageName?: string;
    perPageName?: string;
    defaultPage?: number;
    defaultPerPage?: number;
}

export const PaginationParams = createParamDecorator(
    (
        configParams: PaginationConfigParams = {},
        ctx: ExecutionContext
    ): PaginationRequest => {
        const {
            defaultPage = DEFAULT_PAGE,
            pageName = 'page',
            defaultPerPage = DEFAULT_PER_PAGE,
            perPageName = 'perPage',
        } = configParams;

        const { query } = ctx.switchToHttp().getRequest<Request>();
        const page = Math.round(Number(query[pageName])) || defaultPage;
        const perPage =
            Math.round(Number(query[perPageName])) || defaultPerPage;

        return {
            page: page >= 0 ? page : defaultPage,
            perPage: perPage >= 0 ? perPage : defaultPerPage,
        };
    }
);
