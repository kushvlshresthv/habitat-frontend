import { Component, input } from '@angular/core';
import { Todo } from '../../models/models';

@Component({
  selector: 'app-expired-todo',
  imports: [],
  templateUrl: './expired-todo.component.html',
  styleUrl: './expired-todo.component.scss',
})
export class ExpiredTodoComponent {
  expiredTodo = input.required<Todo>();
}
