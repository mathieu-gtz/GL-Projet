import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(BASIC_URL+"api/admin/users", {
      headers: this.createAuthorizationHeader()
    });
  }

  postTask(projectId: number, taskDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}api/admin/project/${projectId}/tasks`, taskDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllTasks(projectId: number):Observable<any>{
    return this.http.get(`${BASIC_URL}api/admin/project/${projectId}/tasks`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteTask(id:number):Observable<any>{
    return this.http.delete(`${BASIC_URL}api/admin/task/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }


  updateTask(id:number, taskDTO:any):Observable<any>{
    return this.http.put(BASIC_URL+`api/admin/task/${id}`, taskDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchTask(title:string):Observable<any>{
    return this.http.get(BASIC_URL+`api/admin/tasks/search/${title}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTaskById(id:number):Observable<any>{
    return this.http.get(BASIC_URL+"api/admin/task/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(id:number, content:string):Observable<any>{
    const params = {
      content: content
    }
    return this.http.post(BASIC_URL+"api/admin/task/comment/"+id, null, {
      params: params,
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentByTaskId(id:number):Observable<any>{
    return this.http.get(BASIC_URL+"api/admin/comments/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }

  postProject(projectDTO:any):Observable<any>{
    return this.http.post(BASIC_URL+"api/admin/project", projectDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + StorageService.getToken());
  }

  getAllProjects():Observable<any>{
    return this.http.get(BASIC_URL+"api/admin/projects", {
      headers: this.createAuthorizationHeader()
    });
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/admin/project/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

}
