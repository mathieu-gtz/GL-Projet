import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-project',
  standalone: false,
  
  templateUrl: './post-project.component.html',
  styleUrl: './post-project.component.scss'
})
export class PostProjectComponent {

  projectForm!: FormGroup;
  listOfEmployees: any[] = [];

  constructor(private adminService:AdminService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    //this.getUsers();
    this.projectForm = this.formBuilder.group({
      title: [''],
      description: [''],
      dueDate: [''],
      status: ['']
    });
   }

  /*getUsers(){
    this.adminService.getUsers().subscribe((data)=>{
      this.listOfEmployees = data;
      console.log(data);
    });
  }*/

  postProject(){
    console.log(this.projectForm.value);
    this.adminService.postProject(this.projectForm.value).subscribe((data)=>{
      if (data.id != null){
        this.snackBar.open("Project created successfully", "Close", {
          duration: 2000,
        });
        this.router.navigateByUrl("admin/dashboard");
        this.projectForm.reset();
      } else {
        this.snackBar.open("Error creating project", "Close", {
          duration: 2000,
        });
      }
    })
  }

}
