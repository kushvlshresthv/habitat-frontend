import { Component, computed, input } from '@angular/core';
import { Activity } from '../../models/models';

@Component({
  selector: 'app-activity',
  imports: [],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  activity = input.required<Activity>();
  maxXp = input.required<number>();

  level = computed(() => {
    const xp = this.activity().xp;
    const max = this.maxXp();
    if (xp === 0) return 0;
    if (xp <= max * 0.25) return 1;
    if (xp <= max * 0.5) return 2;
    if (xp <= max * 0.75) return 3;
    return 4;
  });
}
