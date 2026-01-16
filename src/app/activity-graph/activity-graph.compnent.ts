import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiResponse } from '../utils/api_response';
import { BACKEND_URL } from '../utils/global_constants';
import { ActivityComponent } from './activity/activity.component';
import { Activity } from '../models/models';

export interface Week {
  days: (Activity | null)[];
}

export interface MonthLabel {
  name: string;
  colSpan: number;
}

@Component({
  selector: 'app-activity-graph',
  imports: [ActivityComponent],
  templateUrl: './activity-graph.compnent.html',
  styleUrl: './activity-graph.compnent.scss',
})
export class ActivityGraphCompnent {
  activities: Activity[] = [];
  weeks: Week[] = [];
  monthLabels: MonthLabel[] = [];
  maxXp: number = 0;
  dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<ApiResponse<Activity[]>>(BACKEND_URL + '/api/activities', {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.activities = response.mainBody;
	  //for coloring purposes identify the max xp in the activiies array
          this.maxXp = Math.max(...this.activities.map((a) => a.xp), 1);
          this.organizeByWeeks();
          this.calculateMonthLabels();
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }

  
  /*

    loop from the startDate to the endDate

    for each week create a Week object with 7 days

    for each day in the week check if there is an activity for that date

    if yes add the activity to the week, else add a null activity,

  */  
  private organizeByWeeks() {
    if (this.activities.length === 0) return;

    const activityMap = new Map<string, Activity>();
    this.activities.forEach((a) => activityMap.set(a.date, a));

    const firstDate = new Date(this.activities[0].date);
    const lastDate = new Date(this.activities[this.activities.length - 1].date);

    // Start from the Sunday of the first week
    const startDate = new Date(firstDate);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: Week[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= lastDate) {
      const week: Week = { days: [] };
      for (let i = 0; i < 7; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (currentDate >= firstDate && currentDate <= lastDate) {
          week.days.push(activityMap.get(dateStr) || { date: dateStr, xp: 0 });
        } else {
          week.days.push(null);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }

    this.weeks = weeks;
  }

  //figure out the column spans for each month label
  private calculateMonthLabels() {
    if (this.weeks.length === 0) return;

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const labels: MonthLabel[] = [];
    let currentMonth = -1;
    let colSpan = 0;

    this.weeks.forEach((week) => {
      const firstDay = week.days.find((d) => d !== null);
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== currentMonth) {
          if (currentMonth !== -1) {
            labels.push({ name: monthNames[currentMonth], colSpan });
          }
          currentMonth = month;
          colSpan = 1;
        } else {
          colSpan++;
        }
      } else {
        colSpan++;
      }
    });

    if (currentMonth !== -1) {
      labels.push({ name: monthNames[currentMonth], colSpan });
    }

    this.monthLabels = labels;
  }
}
