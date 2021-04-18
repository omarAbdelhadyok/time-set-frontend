import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageableResponse } from 'src/app/shared/models';
import { Project } from '../models';

@Injectable()
export class ProjectsService {

	private baseUrl = environment.baseUrl + '/projects';
	
	constructor(private http: HttpClient) { }

	getAll(): Observable<PageableResponse<Project>> {
		return this.http.get<PageableResponse<Project>>(this.baseUrl);
	}

	get(projectId: number): Observable<Project> {
		return this.http.get<Project>(`${this.baseUrl}/${projectId}`);
	}
	
	create(project: Project): Observable<Project> {
        return this.http.post<Project>(this.baseUrl, project);
    }

    update(projectId: number, project: Project): Observable<Project> {
        return this.http.put<Project>(this.baseUrl + `/${projectId}`, project);
    }

    delete(id: number){
        return this.http.delete(this.baseUrl + `/${id}`);
    }
}
