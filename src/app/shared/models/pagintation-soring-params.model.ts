export class PaginationSortingParams {

	public constructor(init?: Partial<PaginationSortingParams>) {
        Object.assign(this, init);
	}

	pageNumber: number;
	pageSize: number;
	sortColumn: string;
	sorDirection: 'ASC' | 'DESC';
}