import { Component, input } from '@angular/core';
import { LeaderboardRow } from '../../models/models';

@Component({
  selector: 'app-leaderboard-row',
  imports: [],
  templateUrl: './leaderboard-row.component.html',
  styleUrl: './leaderboard-row.component.scss',
})
export class LeaderboardRowComponent {
  leaderboardRow = input.required<LeaderboardRow>();
}
