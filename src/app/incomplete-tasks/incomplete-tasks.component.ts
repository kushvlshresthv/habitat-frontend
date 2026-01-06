import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '../utils/api_response';
import { BACKEND_URL } from '../utils/global_constants';
import { TaskSummary } from '../models/models';
import { IncompleteTaskComponent } from './incomplete-task/incomplete-task.component';
import { OngoingTaskComponent } from '../ongoing-task/ongoing-task.component';

@Component({
  selector: 'app-incomplete-tasks',
  imports: [IncompleteTaskComponent, OngoingTaskComponent],
  templateUrl: './incomplete-tasks.component.html',
  styleUrl: './incomplete-tasks.component.scss',
})
export class IncompleteTasksComponent {
  incompleteTasks!: TaskSummary [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.httpClient.get<ApiResponse<TaskSummary[]>>(BACKEND_URL + "/api/incomplete-tasks", {
      withCredentials: true,
    }).subscribe( {
      next: (response)=> {
	this.incompleteTasks = response.mainBody;
	console.log(this.incompleteTasks);
	const ongoingTask = this.incompleteTasks.find(task => task.status == "IN_PROGRESS" || task.status == "PAUSED");
	if(ongoingTask != undefined)
	  this.ongoingTask = ongoingTask;
      },
      error: (error)=> {
	console.log("error", error);
      }
    });
  }

  ongoingTask: TaskSummary | null = null;

  startTask(task: TaskSummary) {
    const params = new HttpParams().set("id", task.id);
    this.httpClient.put<ApiResponse<TaskSummary>>(BACKEND_URL + "/api/start-task", {}, {
      withCredentials: true,
      params: params,
    }).subscribe({
      next: (response) => {
	this.ongoingTask = response.mainBody;
	console.log(this.ongoingTask)
      }
    })
  }
}
