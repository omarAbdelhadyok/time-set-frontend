import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent, RegisterComponent } from './components';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages';

@NgModule({
  declarations: [AuthComponent, SignInComponent, RegisterComponent],
  imports: [
	CommonModule,
	SharedModule,
	AuthRoutingModule
  ]
})
export class AuthModule { }
