import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CardsService, ProjectsService, StacksService } from './shared/services';


@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, ProjectPageComponent],
  imports: [
    CommonModule,
	ProjectsRoutingModule,
	SharedModule
  ],
  providers: [ProjectsService, CardsService, StacksService]
})
export class ProjectsModule { }
