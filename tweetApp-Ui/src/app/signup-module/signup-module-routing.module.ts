import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupModuleComponent } from './signup-module.component';

const routes: Routes = [{ path: '', component: SignupModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupModuleRoutingModule { }
