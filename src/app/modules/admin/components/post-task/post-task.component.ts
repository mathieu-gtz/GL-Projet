import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  standalone: false,
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent implements OnInit {

  taskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  projectId!: number;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du projet à partir des paramètres de la route
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.projectId);
    if (!this.projectId) {
      this.snackBar.open("Project ID is missing", "ERROR", { duration: 2000 });
      this.router.navigate(['/admin/dashboard']);
    }
    this.getUsers();
    this.taskForm = this.fb.group({
      employee: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]]
    });
  }

  getUsers(): void {
    this.adminService.getUsers().subscribe((data) => {
      this.listOfEmployees = data;
      console.log(data);
    });
  }

  postTask(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      // Utiliser l'ID du projet dans la méthode postTask
      this.adminService.postTask(this.projectId, this.taskForm.value).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open("Task posted successfully", "Close", { duration: 2000 });
          this.router.navigate([`/admin/project/${this.projectId}/tasks`]);
        } else {
          this.snackBar.open("Error posting task", "ERROR", { duration: 2000 });
        }
      }, (error) => {
        this.snackBar.open("Error posting task", "ERROR", { duration: 2000 });
      });
    }
  }
}