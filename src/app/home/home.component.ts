import { Component } from '@angular/core';
import { IncompleteTodosComponent } from '../incomplete-todos/incomplete-todos.component';
import { ExpiredTodosComponent } from '../expired-todos/expired-todos.component';
import { ActivityGraphCompnent } from '../activity-graph/activity-graph.compnent';

@Component({
  selector: 'app-home',
  imports: [IncompleteTodosComponent, ExpiredTodosComponent, ActivityGraphCompnent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  motivationalQuote!: string;

  motivationalQuotes: string[] = [
    'Small steps, done daily, change everything',
    "You don't rise to goals, You fall to habits",
    'Done every day beats perfect someday',
    'Show up today, Tomorrow will thank you',
    'Become who you want to be, one habit at a time',
  ];

  constructor() {
    this.motivationalQuote =
      this.motivationalQuotes[Math.floor(Math.random() * this.motivationalQuotes.length)];
  }
}
