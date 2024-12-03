import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { V } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-task-details',
  standalone: false,
  
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {

  taskId: number;
  taskData: any;
  comments:any;
  commentForm: FormGroup;

  constructor(private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.taskId = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.getTaskById();
    this.getComments();
    this.commentForm = this.fb.group({
      content: [null, Validators.required]
    });
  }

  getTaskById() {
    this.service.getTaskById(this.taskId).subscribe((data) => {
      console.log(data);
      this.taskData = data;
    });
  }

  getComments() {
    this.service.getCommentByTaskId(this.taskId).subscribe((data) => {
      console.log(data);
      this.comments = data;
    });
  }

  publishComment() {
    this.service.createComment(this.taskId, this.commentForm.get("content")?.value).subscribe((data) => {
      if (data.id != null) {
        this.snackBar.open("Comment posted successfully", "Close", {
          duration: 2000,
        });
        this.getComments();
      } else {
        this.snackBar.open("Failed to post comment", "Close", {
          duration: 2000,
        });
      }
    });
  }

}
