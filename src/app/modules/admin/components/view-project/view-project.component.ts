import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';

@Component({
  standalone: false,
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  project: any;
  listOfTasks: any;
  searchForm!: FormGroup;
  taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du projet à partir des paramètres de la route
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (!id) {
      this.snackBar.open("Project ID is missing", "ERROR", { duration: 2000 });
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.service.getProjectById(id).subscribe((data) => {
        this.project = data;
        this.getTasks(); // Appeler getTasks après que project soit défini
      });
    }

    this.searchForm = this.fb.group({
      title: [null, Validators.required]
    });

    this.taskForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      dueDate: [null, Validators.required]
    });
  }

  getTasks(): void {
    if (this.project && this.project.id) {
      this.service.getAllTasks(this.project.id).subscribe((data) => {
        this.listOfTasks = data;
        console.log(data);
      });
    }
  }

  createTask(): void {
    this.router.navigate([`/admin/project/${this.project.id}/tasks`]);
  }

  deleteTask(id: number): void {
    this.service.deleteTask(id).subscribe(() => {
      this.snackBar.open("Task deleted successfully", "Close", { duration: 2000 });
      this.getTasks();
    }, (error) => {
      this.snackBar.open("Failed to delete task", "Close", { duration: 2000 });
    });
  }

  searchTask(): void {
    this.listOfTasks = [];
    const title = this.searchForm.get('title')!.value;
    console.log(title);
    this.service.searchTask(title).subscribe((data) => {
      this.listOfTasks = data;
      console.log(data);
    });
  }
}