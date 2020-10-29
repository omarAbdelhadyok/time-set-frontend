import { NgModule } from '@angular/core';
import { HomeComponent } from './components';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

const COMPONENTS = [HomeComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
	CommonModule,
	MaterialModule
  ],
  exports: [...COMPONENTS]
})
export class HomeModule { }
