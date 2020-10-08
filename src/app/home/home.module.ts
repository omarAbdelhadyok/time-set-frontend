import { NgModule } from '@angular/core';
import { HomeComponent } from './components';
import { CommonModule } from '@angular/common';

const COMPONENTS = [HomeComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class HomeModule { }
