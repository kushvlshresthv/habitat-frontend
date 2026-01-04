import { Component, input, output } from '@angular/core';
import { TaskSummary } from '../../models/models';

@Component({
  selector: 'app-incomplete-task',
  imports: [],
  templateUrl: './incomplete-task.component.html',
  styleUrl: './incomplete-task.component.scss',
})
export class IncompleteTaskComponent {
  incompleteTask = input.required<TaskSummary>();
  startTask = output<TaskSummary>();
  onStart() {
    console.log('started');
    this.startTask.emit(this.incompleteTask());
  }
}
