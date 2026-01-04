import { Component } from '@angular/core';
import { IncompleteTasksComponent } from '../incomplete-tasks/incomplete-tasks.component';

@Component({
  selector: 'app-home',
  imports: [IncompleteTasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {
    console.log("home component has been loaded");
  }
}
