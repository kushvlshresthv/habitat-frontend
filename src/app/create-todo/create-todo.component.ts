import { Component } from '@angular/core';
import { FormTodoComponent } from '../form-todo/form-todo.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoCreation } from '../models/models';
import { BACKEND_URL } from '../utils/global_constants';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-create-todo',
  imports: [FormTodoComponent],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent {
  todoFormData: TodoCreation = {
    description: '',
    deadlineDate: new Date().toISOString().split('T')[0],
    estimatedCompletionTimeMinutes:60,
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private popupService: PopupService,
  ) {
    console.log(new Date().toISOString().split('T')[0]);
  }

  onFormSave(requestBody: TodoCreation) {

    this.httpClient
      .post<Response>(BACKEND_URL + '/api/create-todo', requestBody, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
	  console.log(response);
	  this.router.navigateByUrl('/home');
          this.popupService.showPopup('Todo Created!', 'Success', 2000);
        },
        error: (error) => {
          console.log(error.error.message);
          this.popupService.showPopup('Todo Creation Failed!', 'Error', 2000);
        },
      });
  }
}
