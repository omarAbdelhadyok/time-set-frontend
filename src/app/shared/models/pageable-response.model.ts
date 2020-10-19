class Sort {
	sorted: boolean;
	unsorted: boolean;
	empty: boolean;
}

class Pageable {
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	sort: Sort;
	unpaged: boolean;
}

export class PageableResponse<T> {
	content: T[];
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: Pageable;
	size: number;
	sort: Sort;
	totalElements: 1
	totalPages: 1
}