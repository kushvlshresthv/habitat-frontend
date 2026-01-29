import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '../utils/api_response';
import { BACKEND_URL } from '../utils/global_constants';
import { IncompleteTodoComponent } from './incomplete-todo/incomplete-todo.component';
import { OngoingTodoComponent } from '../ongoing-todo/ongoing-todo.component';
import { Todo } from '../models/models';

@Component({
  selector: 'app-incomplete-todos',
  imports: [IncompleteTodoComponent, OngoingTodoComponent],
  templateUrl: './incomplete-todos.component.html',
  styleUrl: './incomplete-todos.component.scss',
})
export class IncompleteTodosComponent {
  incompleteTodos!: Todo[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.httpClient
      .get<ApiResponse<Todo[]>>(BACKEND_URL + '/api/incomplete-todos', {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          // Sort todos: IN_PROGRESS/PAUSED first, then others
          this.incompleteTodos = response.mainBody.sort((a, b) => {
            const isAOngoing = a.status === 'IN_PROGRESS' || a.status === 'PAUSED';
            const isBOngoing = b.status === 'IN_PROGRESS' || b.status === 'PAUSED';
            if (isAOngoing && !isBOngoing) return -1;
            if (!isAOngoing && isBOngoing) return 1;
            return 0;
          });
          console.log(this.incompleteTodos);
          const ongoingTodo = this.incompleteTodos.find(
            (todo) => todo.status == 'IN_PROGRESS' || todo.status == 'PAUSED',
          );
          if (ongoingTodo != undefined) this.ongoingTodo = ongoingTodo;
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }

  ongoingTodo: Todo | null = null;

  startTodo(todo: Todo) {
    const params = new HttpParams().set('id', todo.id).set('type', todo.type);
    this.httpClient
      .put<ApiResponse<Todo>>(
        BACKEND_URL + '/api/start-todo',
        {},
        {
          withCredentials: true,
          params: params,
        },
      )
      .subscribe({
        next: (response) => {
          this.ongoingTodo = response.mainBody;
          console.log(this.ongoingTodo);
        },
      });
  }
}
