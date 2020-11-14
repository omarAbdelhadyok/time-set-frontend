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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';


const MODULES = [
	MatDividerModule,
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
	MatProgressBarModule,
	MatExpansionModule,
	MatTooltipModule
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
