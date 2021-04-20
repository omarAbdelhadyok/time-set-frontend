import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stack } from '../../models';

@Injectable()
export class StacksService {

	private baseUrl = environment.baseUrl + '/stacks';

	constructor(private http: HttpClient) { }

	create(stack: Stack, projectId: number): Observable<Stack> {
		return this.http.post<Stack>(`${this.baseUrl}/${projectId}`, stack);
	}

	update(stack: Stack): Observable<Stack> {
		return this.http.put<Stack>(this.baseUrl, stack);
	}

	delete(stackId: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.baseUrl}/${stackId}`);
	}
}
