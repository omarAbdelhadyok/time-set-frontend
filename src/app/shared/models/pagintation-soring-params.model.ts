export class PaginationSortingParams {

	page: number;
	size: number;
	sort: string;

	public static setParams(pageNumber: number,
		pageSize: number,
		sortColumn: string,
		sortDirection: string): PaginationSortingParams {
			let params = new PaginationSortingParams();
			params.page = pageNumber;
			params.size = pageSize;
			params.sort = `${sortColumn},${sortDirection}`;
			return params;
	}
}