import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoCreation } from '../models/models';
import { SafeCloseDialog } from '../directive/safe-close-dialog.directive';

@Component({
  selector: 'app-form-todo',
  imports: [SafeCloseDialog, ReactiveFormsModule],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.scss',
})
export class FormTodoComponent {
  //outputs
  formSaveEvent = output<TodoCreation>();

  //inputs
  isEditPage = input.required<boolean>();
  todoFormData = input.required<TodoCreation>();

  FORM_NAME = 'create_todo_form';
  diag = viewChild<ElementRef<HTMLDialogElement>>('create_todo_dialog');

  //setting aliases for this.memberFormGroup().controls
  description!: FormControl<string>;
  deadlineDate!: FormControl<string>;
  deadlineTime!: FormControl<string>;
  estimatedCompletionTimeMinutes!: FormControl<number>;

  todoFormGroup!: FormGroup<{
    description: FormControl<string>;
    deadlineDate: FormControl<string>;
    deadlineTime: FormControl<string>;
    estimatedCompletionTimeMinutes: FormControl<number>;
  }>;

  ngOnInit(): void {
    this.description = new FormControl(this.todoFormData().description,{ nonNullable: true, validators:  [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200),
    ]});

    this.deadlineDate = new FormControl(this.todoFormData().deadlineDate,{nonNullable: true, validators:  [
      Validators.required,
    ]},);

    this.deadlineTime = new FormControl(this.todoFormData().deadlineTime,{nonNullable: true, validators:  [
      Validators.required,
    ]} );
    this.estimatedCompletionTimeMinutes = new FormControl(this.todoFormData().estimatedCompletionTimeMinutes, {nonNullable: true, validators: [
      Validators.required,
    ]});

    this.todoFormGroup = new FormGroup({
      description: this.description,
      deadlineDate: this.deadlineDate,
      deadlineTime: this.deadlineTime,
      estimatedCompletionTimeMinutes: this.estimatedCompletionTimeMinutes,
    });
  }

  ngAfterViewInit(): void {
    // Show the dialog
    if (this.diag() && !this.diag()!.nativeElement.open) {
      this.diag()!.nativeElement.showModal();
    }
  }

  showAllErrors = false;

  onFormSave($event: Event) {
    if(this.todoFormGroup.invalid) {
      this.showAllErrors = true;
      return;
    }
    $event.preventDefault();
    const todoCreation: TodoCreation = {
      description: this.description.value,
      deadlineDate : this.deadlineDate.value,
      deadlineTime : this.deadlineTime.value,
      estimatedCompletionTimeMinutes : this.estimatedCompletionTimeMinutes.value,
    };
    localStorage.removeItem(this.FORM_NAME);
    this.formSaveEvent.emit(todoCreation);
    this.diag()!.nativeElement.close();
  }

  saveFormData = () => {
    if (this.isEditPage()) return;

    const formValue = this.todoFormGroup.getRawValue();

    // Check if at least one field has some value
    const hasData = Object.values(formValue).some(
      (value) => value !== null && value !== undefined && value !== '',
    );

    if (!hasData) {
      return;
    }

    localStorage.setItem(this.FORM_NAME, JSON.stringify(formValue));
  };

  restoreFormData = () => {
    if (this.isEditPage()) return;

    //restore form normally ie restores the FormGroup
    const savedData = localStorage.getItem(this.FORM_NAME);
    if (savedData) {
      console.log('Found the saved Data');
      console.log(savedData);
      try {
        const parsedData = JSON.parse(savedData);
        this.todoFormGroup.patchValue(parsedData); // prefill the form
      } catch (err) {
        console.error('Failed to parse saved form data', err);
      }
    }
  };
}
