import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { PostProjectComponent } from './components/post-project/post-project.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task/:id/edit', component: UpdateTaskComponent },
  { path: 'task-details/:id', component: ViewTaskDetailsComponent },
  { path: 'project/:id', component: ViewProjectComponent },
  { path: 'project/:projectId/tasks', component: PostTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }