import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MODULES = [
	CommonModule,
	MatProgressSpinnerModule,
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatMenuModule,
	MatDialogModule,
	MatProgressBarModule
]

@NgModule({
	declarations: [],
	imports: [
		...MODULES
	],
	exports: [
		...MODULES
	]
})
export class MaterialModule { }
