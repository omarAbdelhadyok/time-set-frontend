import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent, RegisterComponent } from './components';
import { AuthComponent } from './pages';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{path: '', redirectTo: 'sign-in', pathMatch: 'full'},
			{path: 'sign-in', component: SignInComponent},
			{path: 'register', component: RegisterComponent},
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
