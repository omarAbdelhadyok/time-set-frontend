import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models';

@Injectable()
export class CardsService {

	private baseUrl = environment.baseUrl + '/cards';

	constructor(private http: HttpClient) { }

	create(projectId: number, stackId: number, card: Card): Observable<Card> {
		return this.http.post<Card>(`${this.baseUrl}/${projectId}/${stackId}`, card);
	}
}
