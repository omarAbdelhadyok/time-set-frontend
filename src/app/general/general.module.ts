import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components';


const COMPONENTS = [HeaderComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
	CommonModule,
	SharedModule,

  ],
  exports: [...COMPONENTS]
})
export class GeneralModule { }
