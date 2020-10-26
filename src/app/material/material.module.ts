import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MODULES = [
	CommonModule,
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatProgressSpinnerModule,
	MatFormFieldModule,
	MatInputModule
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
