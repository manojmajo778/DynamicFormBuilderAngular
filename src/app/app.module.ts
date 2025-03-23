import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router'; // Import this
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';

import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FormManagementComponent } from './components/form-management/form-management.component';

import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    FormBuilderComponent,
    FormManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    ButtonModule,
    InputTextModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    DragDropModule  ,
    DialogModule,
    CardModule,
    ReactiveFormsModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
