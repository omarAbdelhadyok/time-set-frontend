import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../models';
import { ProjectsService } from '../../shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils, NotifierService, ObjectUtils, ValidationUtilityService } from 'src/app/core/services';

@Component({
    selector: 'app-project-add-edit',
    templateUrl: 'project-add-edit-dialog.component.html',
    styleUrls: ['./project-add-edit-dialog.component.scss']
})
export class ProjectAddEditDialogComponent implements OnInit {

    project: Project;
	projectBackup: Project;
    projectForm: FormGroup;
    projectId: number = null;
    isEdit: boolean;
	busySaving: boolean = false;
	isLoading: boolean = false;


	constructor(private fb: FormBuilder,
		public dialogRef: MatDialogRef<ProjectAddEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {projectId: number},
        private projectsService: ProjectsService,
		private validationService: ValidationUtilityService,
		private notifier: NotifierService) {}

    ngOnInit(): void {
        this.project = new Project();
        this.setPageState();
		this.createForm();
		this.dialogRefBackdrop();
	}

	setPageState(): void {
		if(this.data?.projectId) {
            this.isEdit = true;
			this.projectId = this.data.projectId;
			this.get(this.projectId);
        } else {
            this.isEdit = false;
        }
	}
	
	get(projectId: number) {
		this.projectsService.get(projectId).subscribe(projectRes => {
			this.project = ObjectUtils.copy<Project>(projectRes);
			this.projectBackup = ObjectUtils.copy<Project>(projectRes);
			this.fillForm();
		});
	}

	fillForm() {
		this.projectForm.get('title').setValue(this.project.title);
		this.projectForm.get('description').setValue(this.project.description);
	}

	createForm(): void {
		this.projectForm = this.fb.group({
			title: ['', [Validators.required, Validators.maxLength(15)]],
			description: ['', [Validators.required, Validators.maxLength(100)]]
		});
	}

	dialogRefBackdrop() {
		//prevent user from closing the dialog if there's data in the form, then show confirmation message
		this.dialogRef.disableClose = true;

		this.dialogRef.backdropClick().subscribe(() => {
			this.project.title = this.projectForm.get('title').value;
			this.project.description = this.projectForm.get('description').value;
			if(FormUtils.isFormEmpty(this.projectForm) || ObjectUtils.isEqual<Project>(this.project, this.projectBackup)) {
				this.dialogRef.close();
			} else {
				let notifierRef = this.notifier.warn('warnings.discardChanges', 'labels.discard');
				notifierRef.onAction().subscribe(() => {
					this.dialogRef.close();
				});
			}
		});
	}

    save(): void {
		this.validationService.validateForm(this.projectForm);
		let project = new Project(this.projectForm.value);
        if(this.isEdit) {
            this.update(this.projectId, project);
        } else {
            this.create(project);
        }
	}


    create(project: Project): void {
        this.busySaving = true;

        this.projectsService.create(project).subscribe(projectRes => {
            this.busySaving = false;
            this.dialogRef.close(projectRes);
        },
		error => {
            this.busySaving = false;
        });
	}

    update(projectId: number, project: Project): void {
		this.project.title = project.title;
		this.project.description = project.description;
        this.busySaving = true;
        this.projectsService.update(projectId, this.project).subscribe(projectRes => {
            this.busySaving = false;
            this.dialogRef.close(projectRes);
        },
		error => {
            this.busySaving = false;
        });
    }
}
