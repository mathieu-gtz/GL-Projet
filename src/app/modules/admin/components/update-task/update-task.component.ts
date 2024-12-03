import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  standalone: false,
  
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

  id:number;
  updateTaskForm!:FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfTaskStatus: any = ["PENDING", "IN PROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(private service:AdminService,
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { 
    this.id = this.route.snapshot.params["id"];
    this.getTaskById();
    this.getUsers();
    this.updateTaskForm = this.fb.group({
      employee:[null,[Validators.required]],
      title:[null,[Validators.required]],
      description:[null,[Validators.required]],
      dueDate:[null,[Validators.required]],
      priority:[null,[Validators.required]],
      taskStatus:[null,[Validators.required]],
   });
  }

  getTaskById(){
    this.service.getTaskById(this.id).subscribe((data)=>{
      this.updateTaskForm.patchValue(data);
      console.log(data);
    }); 
  }

  getUsers(){
    this.adminService.getUsers().subscribe((data)=>{
      this.listOfEmployees = data;
      console.log(data);
    });
  }

  updateTask(){
    console.log(this.updateTaskForm.value);
    this.adminService.updateTask(this.id,this.updateTaskForm.value).subscribe((res)=>{
      if (res.id != null) {
        this.snackBar.open("Task updated successfully", "Close", {duration: 2000}); 
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.snackBar.open("Error updating task", "ERROR", {duration: 2000});
      }
    });
  }

}
