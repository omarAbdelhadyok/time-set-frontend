import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-delete-confirm',
	templateUrl: './delete-confirm.component.html',
	styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
		@Inject(MAT_DIALOG_DATA) public message: string) { }

	ngOnInit(): void {
	}

	cancelDelete(): void {
		this.dialogRef.close(false);
	}

	confirmDelete(): void {
		this.dialogRef.close(true);
	}

}
