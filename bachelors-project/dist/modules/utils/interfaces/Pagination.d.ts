export interface Paginate<T, P = Pagination> {
    pagination: P;
    records: T[];
}
export interface PaginationRequest {
    page: number;
    perPage: number;
}
export interface Pagination extends PaginationRequest {
    pageCount: number;
    totalCount: number;
}
