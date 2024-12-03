import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks:any = [];
  
  constructor(private service:EmployeeService,
    private snackBar: MatSnackBar
  ) { 
    this.getTasks();
  }


  getTasks(){
    this.service.getEmployeeTasksById().subscribe(
      (data:any)=>{
        console.log(data);
        this.listOfTasks = data;
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

  updateStatus(id:number, status:string){
    this.service.updateStatus(id, status).subscribe((data:any)=>{
        if(data.id!=null){
          this.snackBar.open("Task status updated successfully", "Close", {duration: 2000,});
          this.getTasks();
        } else {
          this.snackBar.open("Error while updating task status", "Close", {duration: 2000,});
        }
    });
  }
  
}
