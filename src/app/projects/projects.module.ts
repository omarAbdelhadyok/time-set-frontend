import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CardsService, ProjectsService, StacksService } from './shared/services';
import { MaterialModule } from '../material/material.module';
import { StackEditComponent } from './shared/components';


@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, ProjectPageComponent, StackEditComponent],
  imports: [
    CommonModule,
	ProjectsRoutingModule,
	SharedModule,
	MaterialModule
  ],
  providers: [ProjectsService, CardsService, StacksService]
})
export class ProjectsModule { }
