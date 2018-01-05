export interface IQueryObject {
    sortBy: string;
    isSortAscending: boolean;
    page: number;
    pageSize: number;
    active: boolean;
    searchTerm: string;
}

export class QueryObject implements IQueryObject {
    sortBy: string;
    isSortAscending: boolean;
    page: number;
    pageSize: number;
    active: boolean;
    searchTerm: string;
}
