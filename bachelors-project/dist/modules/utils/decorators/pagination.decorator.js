"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParams = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
exports.PaginationParams = (0, common_1.createParamDecorator)((configParams = {}, ctx) => {
    const { defaultPage = constants_1.DEFAULT_PAGE, pageName = 'page', defaultPerPage = constants_1.DEFAULT_PER_PAGE, perPageName = 'perPage', } = configParams;
    const { query } = ctx.switchToHttp().getRequest();
    const page = Math.round(Number(query[pageName])) || defaultPage;
    const perPage = Math.round(Number(query[perPageName])) || defaultPerPage;
    return {
        page: page >= 0 ? page : defaultPage,
        perPage: perPage >= 0 ? perPage : defaultPerPage,
    };
});
//# sourceMappingURL=pagination.decorator.js.map