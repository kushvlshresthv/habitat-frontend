import { Component, input, OnInit, OnDestroy, signal, output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BACKEND_URL } from '../utils/global_constants';
import { ApiResponse } from '../utils/api_response';
import { Todo } from '../models/models';
import { RatingTodoComponent } from '../rating-todo/rating-todo.component';

@Component({
  selector: 'app-ongoing-todo',
  imports: [RatingTodoComponent],
  templateUrl: './ongoing-todo.component.html',
  styleUrl: './ongoing-todo.component.scss',
})
export class OngoingTodoComponent implements OnInit, OnDestroy {
  ongoingTodo = input.required<Todo>();


  elapsedSeconds = signal(0);
  totalSeconds = signal(0);
  progressPercentage = signal(0);
  timerStarted = false;

  private timerInterval: any;

  constructor(private httpClient: HttpClient) {
    //register a callback to be executed when the tab becomes inactive in order to recalculate the elapsed time
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
	this.timerStarted = false;
        this.initializeElapsedSeconds();
	this.timerStarted = true;
      }
    });
  }

  ngOnInit() {
    console.log(this.ongoingTodo());
    this.totalSeconds.set(this.ongoingTodo().estimatedCompletionTimeMinutes * 60);
    this.initializeElapsedSeconds();

    if (this.ongoingTodo().status == 'IN_PROGRESS') this.startTimer();
  }

  initializeElapsedSeconds() {
    if (this.ongoingTodo().status == 'IN_PROGRESS') {
      const elapsedTimeInMs =
        Date.now() -
        new Date(this.ongoingTodo().lastResumedAt).getTime() +
        this.ongoingTodo().totalElapsedSeconds * 1000;
      this.elapsedSeconds.set(Math.floor(elapsedTimeInMs / 1000));
    } else if (this.ongoingTodo().status == 'PAUSED') {
      this.elapsedSeconds.set(this.ongoingTodo().totalElapsedSeconds);
    }

    // Calculate initial progress percentage immediately
    const initialProgress = (this.elapsedSeconds() / this.totalSeconds()) * 100;
    this.progressPercentage.set(Math.min(initialProgress, 100));
  }


  ongoingTodoCompleted = false;

  startTimer() {
    this.timerStarted = true;
    this.timerInterval = setInterval(() => {
      if (this.elapsedSeconds() >= this.totalSeconds()) {
        this.stopTimer();
	this.ongoingTodoCompleted = true;
	return;
      }
      const elapsed = this.elapsedSeconds() + 1;
      this.elapsedSeconds.set(elapsed);

      const progress = (elapsed / this.totalSeconds()) * 100;
      this.progressPercentage.set(Math.min(progress, 100));
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  stopTimer() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null; // invalidate immediately
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  togglePause() {
    if(this.ongoingTodo().status == "PAUSED") {
      this.resumeTodo();
    } else if(this.ongoingTodo().status == "IN_PROGRESS") {
      this.pauseTodo();
    }
  }

  pauseTodo() {
    const httpParams = new HttpParams().set('id', this.ongoingTodo().id);
    this.httpClient
      .put<ApiResponse<Todo>>(
        BACKEND_URL + '/api/pause-todo',
        {},
        {
          withCredentials: true,
          params: httpParams,
        },
      )
      .subscribe({
        next: (response) => {
          clearInterval(this.timerInterval);
          this.ongoingTodo().status = 'PAUSED';
        },
      });
  }

  resumeTodo() {
    const httpParams = new HttpParams().set('id', this.ongoingTodo().id);
    this.httpClient
      .put<ApiResponse<Todo>>(
        BACKEND_URL + '/api/start-todo',
        {},
        {
          withCredentials: true,
          params: httpParams,
        },
      )
      .subscribe({
        next: (response) => {
	  this.ongoingTodo().totalElapsedSeconds = response.mainBody.totalElapsedSeconds;
	  this.ongoingTodo().lastResumedAt = response.mainBody.lastResumedAt;
	  this.initializeElapsedSeconds();
	  this.startTimer();
          this.ongoingTodo().status = 'IN_PROGRESS';
        },
      });
  }
}
