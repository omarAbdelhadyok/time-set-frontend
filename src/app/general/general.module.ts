import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components';


const COMPONENTS = [HeaderComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
	CommonModule,
	SharedModule,
	MaterialModule
  ],
  exports: [...COMPONENTS]
})
export class GeneralModule { }
