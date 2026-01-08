import { Component } from '@angular/core';
import { FormHabitComponent } from '../form-habit/form-habit.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HabitCreation } from '../models/models';
import { BACKEND_URL } from '../utils/global_constants';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-create-habit',
  imports: [FormHabitComponent],
  templateUrl: './create-habit.component.html',
  styleUrl: './create-habit.component.scss',
})
export class CreateHabitComponent {
  habitFormData: HabitCreation = {
    habitName: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    frequency: {},
    cheatDays: 0,
    habitDuration: 60,
    daysOfWeek: [
      { id: 1, label: 'Su', name: 'Sunday', selected: false, duration: 60 },
      { id: 2, label: 'Mo', name: 'Monday', selected: false, duration: 60 },
      { id: 3, label: 'Tu', name: 'Tuesday', selected: false, duration: 60 },
      { id: 4, label: 'We', name: 'Wednesday', selected: false, duration: 60 },
      { id: 5, label: 'Th', name: 'Thursday', selected: false, duration: 60 },
      { id: 6, label: 'Fr', name: 'Friday', selected: false, duration: 60 },
      { id: 7, label: 'Sa', name: 'Saturday', selected: false, duration: 60 },
    ],
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private popupService: PopupService
  ) {}

  onFormSave(requestBody: HabitCreation) {
    console.log('Habit Creation:', requestBody);

    // TODO: Uncomment when API is ready
    // this.httpClient
    //   .post<Response>(BACKEND_URL + '/api/habit', requestBody, {
    //     withCredentials: true,
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //       this.router.navigateByUrl('/home');
    //       this.popupService.showPopup('Habit Created!', 'Success', 2000);
    //     },
    //     error: (error) => {
    //       console.log(error.error.message);
    //       this.popupService.showPopup('Habit Creation Failed!', 'Error', 2000);
    //     },
    //   });

    this.popupService.showPopup('Habit Created!', 'Success', 2000);
    this.router.navigateByUrl('/home');
  }
}
