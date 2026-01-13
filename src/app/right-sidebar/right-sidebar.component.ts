import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeeklyLeaderboardsComponent } from '../weekly-leaderboards/weekly-leaderboards.component';

@Component({
  selector: 'app-right-sidebar',
  imports: [ FormsModule, WeeklyLeaderboardsComponent ],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss',
})
export class RightSidebarComponent {
  selectedOption = 'leaderboard'; 
}
