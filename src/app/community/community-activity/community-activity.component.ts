import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiResponse } from '../../utils/api_response';
import { BACKEND_URL } from '../../utils/global_constants';

interface RecentCompletion {
  username: string;
  estimatedCompletionTimeMinutes: number;
  rating: number;
  completionTime: string;
  xp: number;
}

@Component({
  selector: 'app-community-activity',
  imports: [],
  templateUrl: './community-activity.component.html',
  styleUrl: './community-activity.component.scss',
})
export class CommunityActivityComponent {
  recentCompletions: RecentCompletion[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const params = new HttpParams().set('pageNumber', 0);
    this.httpClient
      .get<ApiResponse<RecentCompletion[]>>(BACKEND_URL + '/api/recent-completions', {
        withCredentials: true,
        params: params,
      })
      .subscribe({
        next: (response) => {
          this.recentCompletions = response.mainBody;
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }

  formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${hours}h ${remainingMinutes}m`;
  }
}
