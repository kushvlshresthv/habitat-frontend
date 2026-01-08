import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/models';

@Component({
  selector: 'app-incomplete-todo',
  imports: [],
  templateUrl: './incomplete-todo.component.html',
  styleUrl: './incomplete-todo.component.scss',
})
export class IncompleteTodoComponent {
  incompleteTodo = input.required<Todo>();
  ongoingTodoExists = input.required<Boolean>();
  startTodo = output<Todo>();
  onStart() {
    console.log('started');
    this.startTodo.emit(this.incompleteTodo());
  }
}
