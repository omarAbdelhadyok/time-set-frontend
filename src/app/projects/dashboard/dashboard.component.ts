import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeleteConfirmComponent } from '../shared/components';
import { Project } from '../models';
import { ProjectsService } from '../shared/services';
import { PaginationSortingParams } from '../../shared/models';
import { ProjectAddEditDialogComponent } from './project-add-edit-dialog/project-add-edit-dialog.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	projects: Project[] = [];
	noData: boolean = false;
	displayedMsg: string;

	//pagination properties
	totalPages: number = 1;
	pageNumber: number = 0;
	pageSize: number = 5;
	sortColumn: string = 'id';
	sortDirection: string = 'ASC';
	

	constructor(private projectsService: ProjectsService,
		private router: Router,
		private dialog: MatDialog) { }

	ngOnInit(): void {
		this.getProjects();
	}

	getProjects() {
		let params = PaginationSortingParams.setParams(
			this.pageNumber,
			this.pageSize,
			this.sortColumn,
			this.sortDirection
		);

		this.projectsService.getAll(params).subscribe(pageable => {
			this.projects = pageable.content;
			this.totalPages = pageable.totalPages;
			if (this.projects?.length > 0) {
				this.noData = false;
			} else {
				this.noData = true;
				this.displayedMsg = 'No Projects yet ...';
			}
		},
		err => {
			this.noData = true;
			this.displayedMsg = 'Something went wrong';
		})
	}

	getPages(): number[] {
		return Array.from(Array(this.totalPages).keys())
	}

	addProject(): void {
		this.openProjectModal().subscribe(project => {
			if(project) {
				if(this.totalPages > 1 && this.projects.length === this.pageSize) {
					this.pageNumber += 1;
					this.getProjects();
				} else {
					this.projects.push(project);
				}
			}
		});
	}

	editProject(projectId: number, i: number): void {
		this.openProjectModal({projectId}).subscribe(project => {
			if(project) {
				this.projects[i] = project;
			}
		});
	}

	private openProjectModal(data?: {projectId: number}): Observable<Project> {
		const dialog = this.dialog.open(ProjectAddEditDialogComponent, {
			width: '40%',
			data
		});

		return dialog.afterClosed();
	}

	viewProject(projectId: number) {
		this.router.navigate([`/projects/view/${projectId}`]);
	}

	deleteProject(project: Project, index: number) {
		const dialg = this.dialog.open(DeleteConfirmComponent, {
			data: `Are you sure you want to delete: ${project.title}`,
			width: '40%'
		});

		dialg.afterClosed().subscribe((confirmed: boolean) => {
			if(confirmed) {
				this.projectsService.delete(project.id).subscribe(deleted => {
					if(deleted) this.projects.splice(index, 1);
				});
			}
		})
	}
}
