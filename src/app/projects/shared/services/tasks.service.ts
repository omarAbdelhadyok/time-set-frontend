import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../../models';

@Injectable({
	providedIn: 'root'
})
export class TasksService {

	private url = environment.baseUrl + '/tasks';

	constructor(private http: HttpClient) { }

	create(cardId: number, task: Task): Observable<Task> {
		return this.http.post<Task>(`${this.url}/${cardId}`, task);
	}

	updateStatus(task: Task): Observable<Task> {
		return this.http.patch<Task>(this.url, task);
	}

	delete(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${this.url}/${id}`);
	}
}
