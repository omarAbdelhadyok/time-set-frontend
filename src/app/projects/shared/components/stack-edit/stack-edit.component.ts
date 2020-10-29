import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stack } from '../../models';

@Component({
	selector: 'app-stack-edit',
	templateUrl: './stack-edit.component.html',
	styleUrls: ['./stack-edit.component.scss']
})
export class StackEditComponent implements OnInit {

	editStackForm: FormGroup;

	constructor(public dialogRef: MatDialogRef<StackEditComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: Stack) { }

	ngOnInit(): void {
		this.createEditStackForm();
	}

	createEditStackForm(): void {
		this.editStackForm =  this.fb.group({
			title: ['', [Validators.required]]
		})
	}

	editStack() {
		
	}
}
