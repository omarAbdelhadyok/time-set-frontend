import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
		private dialog: MatDialog) { }

	ngOnInit(): void {
		this.getProjects();
	}

	getProjects() {
		this.projectsService.getAll().subscribe(pageable => {
			this.projects = pageable.content;
			if(this.projects?.length > 0) {
				this.noData = false;
			} else {
				this.noData = true;
				this.displayedMsgKey = 'lables.noProjects';
			}
			console.log(this.projects);
		}, err => {
			this.noData = true;
			this.displayedMsgKey = 'errors.app';
		})
	}

	viewProject(projectId: number) {
		this.router.navigate([`/projects/view/${projectId}`]);
	}

	openAddProjectModal() {
		this.dialog.open(ProjectAddEditDialogComponent, {
			width: '40%'
		})
	}
}
