import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent, SignInComponent, RegisterComponent } from './auth';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent, SignInComponent, RegisterComponent],
  imports: [
	CommonModule,
	SharedModule,
	AuthRoutingModule
  ]
})
export class AuthModule { }
