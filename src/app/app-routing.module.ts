import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormManagementComponent } from './components/form-management/form-management.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'form-builder', component: FormBuilderComponent,},
  { path: 'form-management', component: FormManagementComponent,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule] 
})
export class AppRoutingModule { }
