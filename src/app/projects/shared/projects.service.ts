import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageableResponse } from 'src/app/shared/models';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {

	private baseUrl = environment.baseUrl + '/projects';

	
	constructor(private http: HttpClient) { }

	getAll(): Observable<PageableResponse<Project>> {
		return this.http.get<PageableResponse<any>>(this.baseUrl);
	}
}
