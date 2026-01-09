import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../models/models';
import { ApiResponse } from '../utils/api_response';
import { BACKEND_URL } from '../utils/global_constants';
import { ExpiredTodoComponent } from './expired-todo/expired-todo.component';

@Component({
  selector: 'app-expired-todos',
  imports: [ExpiredTodoComponent],
  templateUrl: './expired-todos.component.html',
  styleUrl: './expired-todos.component.scss',
})
export class ExpiredTodosComponent implements OnInit{
  expiredTodos!: Todo[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.httpClient
      .get<ApiResponse<Todo[]>>(BACKEND_URL + '/api/expired-todos', {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.expiredTodos = response.mainBody;
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }
}
