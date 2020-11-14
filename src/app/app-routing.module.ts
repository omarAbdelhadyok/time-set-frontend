import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoggedInGuard } from './core/guards';
import { HomeComponent } from './home/components';
import { BaseLayoutComponent, SiteLayoutComponent } from './layouts';


const routes: Routes = [{
		path: '',
		component: SiteLayoutComponent,
		children: [
			{ path: '', redirectTo: '/home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{
				path: 'projects',
				loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
			}
		]
	},
	{
		path: '',
		component: BaseLayoutComponent,
		children: [
			{
				path: 'auth',
				loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
				canActivate: [LoggedInGuard]
			}
		]
	},
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
