import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
	{
		path: '',
		component: ProjectsComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'view/:id', component: ProjectPageComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule { }
