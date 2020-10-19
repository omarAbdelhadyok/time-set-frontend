import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from './shared';
import { SharedModule } from '../shared/shared.module';
import { ProjectPageComponent } from './project-page/project-page.component';


@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, ProjectPageComponent],
  imports: [
    CommonModule,
	ProjectsRoutingModule,
	SharedModule
  ],
  providers: [ProjectsService]
})
export class ProjectsModule { }
