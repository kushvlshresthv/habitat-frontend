import { Component, input, OnInit, OnDestroy, signal } from '@angular/core';
import { TaskSummary } from '../models/models';

@Component({
  selector: 'app-ongoing-task',
  imports: [],
  templateUrl: './ongoing-task.component.html',
  styleUrl: './ongoing-task.component.scss',
})
export class OngoingTaskComponent implements OnInit, OnDestroy {
  ongoingTask = input.required<TaskSummary>();

  elapsedSeconds = signal(0);
  totalSeconds = signal(0);
  progressPercentage = signal(0);
  alreadyElapsedSeconds = signal(0);
  timerStarted = false;

  private timerInterval: any;

  constructor() {
    //register a callback to be executed when the tab becomes inactive in order to recalculate the elapsed time
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
	this.initializeTimerVariables();
      }
    });
  }


  initializeTimerVariables() {
    const elapsedTimeInMs = Date.now() - new Date(this.ongoingTask().lastResumedAt).getTime() + this.alreadyElapsedSeconds();
    this.elapsedSeconds.set(Math.floor(elapsedTimeInMs / 1000));

    // Calculate initial progress percentage immediately
    const initialProgress = (this.elapsedSeconds() / this.totalSeconds()) * 100;
    this.progressPercentage.set(Math.min(initialProgress, 100));
    
  }

  ngOnInit() {
    this.totalSeconds.set(this.ongoingTask().estimatedCompletionTimeMinutes * 60);
    this.alreadyElapsedSeconds.set(this.ongoingTask().totalElapsedSeconds);

    this.initializeTimerVariables();

    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.timerStarted = false;
    this.timerInterval = setInterval(() => {
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
}
