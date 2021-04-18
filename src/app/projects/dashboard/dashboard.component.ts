import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DeleteConfirmComponent } from '../shared/components';
import { Project } from '../shared/models';
import { ProjectsService } from '../shared/services';
import { ProjectAddEditDialogComponent } from './project-add-edit-dialog/project-add-edit-dialog.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	projects: Project[] = [];
	noData: boolean = false;
	displayedMsgKey: string;

	constructor(private projectsService: ProjectsService,
		private router: Router,
		private dialog: MatDialog,
		private translate: TranslateService) { }

	ngOnInit(): void {
		this.getProjects();
	}

	getProjects() {
		this.projectsService.getAll().subscribe(pageable => {
			this.projects = pageable.content;
			if (this.projects?.length > 0) {
				this.noData = false;
			} else {
				this.noData = true;
				this.displayedMsgKey = 'labels.noProjects';
			}
		},
		err => {
			this.noData = true;
			this.displayedMsgKey = 'errors.app';
		})
	}

	addProject(): void {
		this.openProjectModal().subscribe(project => {
			if(project) {
				this.projects.push(project);
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
		let message = this.translate.instant('warnings.delete');
		const dialg = this.dialog.open(DeleteConfirmComponent, {
			data: `${message} ${project.title}`,
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
