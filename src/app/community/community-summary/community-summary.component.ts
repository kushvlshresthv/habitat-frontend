import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiResponse } from '../../utils/api_response';
import { BACKEND_URL } from '../../utils/global_constants';

interface CommunitySummary {
  totalTodoCompletedToday: number;
  totalXpEarnedToday: number;
  totalOngoingTodos: number;
}

@Component({
  selector: 'app-community-summary',
  imports: [],
  templateUrl: './community-summary.component.html',
  styleUrl: './community-summary.component.scss',
})
export class CommunitySummaryComponent {
  summary: CommunitySummary | null = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<ApiResponse<CommunitySummary>>(BACKEND_URL + '/api/community-summary', {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.summary = response.mainBody;
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }
}
