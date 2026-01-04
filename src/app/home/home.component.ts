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

  motivationalQuotes: string[] = [
    "Small steps, done daily, change everything",
    "You don't rise to goals, You fall to habits",
    "Done every day beats perfect someday",
    "Show up today, Tomorrow will thank you",
    "Become who you want to be, one habit at a time", 
 ] 


  getMotivationalQuote() {
    return this.motivationalQuotes[Math.floor(Math.random() * this.motivationalQuotes.length)];
  }

}
