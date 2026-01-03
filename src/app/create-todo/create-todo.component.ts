import { Component } from '@angular/core';
import { FormTodoComponent } from '../form-todo/form-todo.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoCreation } from '../models/models';

@Component({
  selector: 'app-create-todo',
  imports: [FormTodoComponent],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent {
  todoFormData: TodoCreation = {
    description: '',
    deadlineDate: '',
    deadlineTime: '',
    estimatedCompletionTimeMinutes:59,
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    // private popupService: PopupService,
  ) {}

  onFormSave(requestBody: TodoCreation) {
    console.log('onSubmitted called');

    // this.httpClient
    //   .post<Response>(BACKEND_URL + '/api/member', requestBody, {
    //     withCredentials: true,
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //       this.router.navigate(['/home/my-committees']);
    //       this.popupService.showPopup('Member Created!', 'Success', 2000);
    //     },
    //     error: (error) => {
    //       console.log(error.error.message);
    //       this.popupService.showPopup('Member Creation Failed!', 'Error', 2000);
    //     },
    //   });
  }


}
