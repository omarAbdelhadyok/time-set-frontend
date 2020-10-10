import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent, SignInComponent } from './components';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [AuthComponent, SignInComponent, RegisterComponent],
  imports: [
	CommonModule,
	SharedModule,
	AuthRoutingModule
  ]
})
export class AuthModule { }
