import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CardsService, ProjectsService, StacksService } from './shared/services';
import { MaterialModule } from '../material/material.module';
import { CardModalComponent, DeleteConfirmComponent } from './shared/components';
import { ProjectAddEditDialogComponent } from './dashboard/project-add-edit-dialog/project-add-edit-dialog.component';

@NgModule({
	declarations: [
		DashboardComponent,
		ProjectsComponent,
		ProjectAddEditDialogComponent,
		ProjectPageComponent,
		DeleteConfirmComponent,
		CardModalComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		ProjectsRoutingModule
	],
	providers: [ProjectsService, CardsService, StacksService]
})
export class ProjectsModule { }
