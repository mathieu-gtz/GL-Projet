import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfProjects: any = [];
  searchForm!: FormGroup;

  constructor(private service:AdminService,
    private snackBar: MatSnackBar,
    private formbuilder: FormBuilder,
    private router: Router,
  ) { 
    this.getProjects();
    this.searchForm = this.formbuilder.group({
      title: [null]
    });
  }


  getProjects(): void {
    this.service.getAllProjects().subscribe((data) => {
      this.listOfProjects = data.filter(project => project.type !== 'task');
      console.log(this.listOfProjects);
    });
  }

  viewProject(id: number): void {
    this.router.navigate([`/admin/project/${id}`]);
  }


}
