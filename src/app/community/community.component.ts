import { Component } from '@angular/core';
import { CommunitySummaryComponent } from './community-summary/community-summary.component';
import { CommunityActivityComponent } from './community-activity/community-activity.component';

@Component({
  selector: 'app-community',
  imports: [CommunitySummaryComponent, CommunityActivityComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {}
