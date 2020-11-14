import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../shared/models';
import { ProjectsService } from '../../shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-project-add-edit',
    templateUrl: './project-add-edit-dialog.component.html',
    styleUrls: ['./project-add-edit-dialog.component.scss']
})
export class ProjectAddEditDialogComponent implements OnInit {

    project: Project;
    projectForm:FormGroup;
    projectId: number=null;
    isEdit: boolean;
    busySaving: boolean;
	isLoading: boolean = false;


    constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ProjectAddEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {projectId: number},
        private projectsService: ProjectsService,
        private router: Router) { }

    ngOnInit(): void {
        this.project = new Project();
        if(this.data?.projectId) {
            this.isEdit = true;
            this.projectId = this.data.projectId;
        } else {
            this.isEdit = false;
        }
        this.createForm()
    }
    createForm(): void {
		this.projectForm = this.fb.group({
			title: ['', [Validators.required, Validators.maxLength(15)]],
			description: ['', [Validators.required, Validators.maxLength(100)]]
		})
	}

    save(): void {
        if(this.isEdit) {
            // this.update(this.projectId, this.project);
        } else {
            this.create(this.project);
        }
    }

    create(project: Project): void {
        this.busySaving = true;
        this.projectsService.create(project).subscribe(projectRes => {
            this.busySaving = false;
            this.dialogRef.close(projectRes);
        }, error => {
            this.busySaving = false;
        });
    }

    // update(projectId: number, project: Project): void {
    //     this.busySaving = true;
    //     this.projectsService.update(projectId,project).subscribe(projectRes => {
    //         this.busySaving = false;
    //         this.dialogRef.close(projectRes);
    //     }, error => {
    //         this.busySaving = false;
    //     });
    // }
}
