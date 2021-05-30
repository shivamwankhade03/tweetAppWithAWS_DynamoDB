import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupModuleRoutingModule } from './signup-module-routing.module';
import { SignupModuleComponent } from './signup-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignupModuleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignupModuleRoutingModule
  ]
})
export class SignupModuleModule { }
