import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BACKEND_URL } from '../utils/global_constants';
import { LeaderboardRow } from '../models/models';
import { ApiResponse } from '../utils/api_response';
import { LeaderboardRowComponent } from './leaderboard-row/leaderboard-row.component';

@Component({
  selector: 'app-weekly-leaderboards',
  imports: [LeaderboardRowComponent],
  templateUrl: './weekly-leaderboards.component.html',
  styleUrl: './weekly-leaderboards.component.scss',
})
export class WeeklyLeaderboardsComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  leaderboardRows!: LeaderboardRow[];

  ngOnInit() {
    this.httpClient
      .get<
        ApiResponse<LeaderboardRow[]>
      >(BACKEND_URL + '/api/weekly-leaderboards', { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.leaderboardRows = response.mainBody;
        },
        error: (error) => {
          console.log('error fetching leaderboards', error);
        },
      });
  }
}
