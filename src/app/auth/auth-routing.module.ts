import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent, SignInComponent } from './components';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{path: '', redirectTo: 'sign-in', pathMatch: 'full'},
			{path: 'sign-in', component: SignInComponent},
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
