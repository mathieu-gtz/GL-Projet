import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterailModule } from '../../DemoAngularMaterialModule';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewTaskDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DemoAngularMaterailModule
  ]
})
export class EmployeeModule { }
