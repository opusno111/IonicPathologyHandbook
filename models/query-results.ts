export interface IQueryResults {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    items: any[];
}

export class QueryResults implements IQueryResults {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    items: any[];
}
