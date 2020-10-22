import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stack } from '../models';

@Injectable()
export class StacksService {

	private baseUrl = environment.baseUrl + '/stacks';

	constructor(private http: HttpClient) { }

	create(projectId: number, stack: Stack): Observable<Stack> {
		return this.http.post<Stack>(`${this.baseUrl}/${projectId}`, stack);
	}

	update(projectId: number, stackId: number, stack: Stack): Observable<Stack> {
		return this.http.put<Stack>(`${this.baseUrl}/${projectId}/${stackId}`, stack);
	}
}
