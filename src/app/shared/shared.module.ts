import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitBtnComponent } from './components';

const MODULES = [FormsModule, ReactiveFormsModule];
const COMPONENTS = [FormSubmitBtnComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule { }
