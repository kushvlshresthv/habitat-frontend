import { Component, ElementRef, input, OnInit, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoCreation } from '../models/models';
import { SafeCloseDialog } from '../directive/safe-close-dialog.directive';

@Component({
  selector: 'app-form-todo',
  imports: [SafeCloseDialog, ReactiveFormsModule],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.scss',
})
export class FormTodoComponent implements OnInit {
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
  estimatedCompletionTimeMinutes!: FormControl<number>;

  todoFormGroup!: FormGroup<{
    description: FormControl<string>;
    deadlineDate: FormControl<string>;
    estimatedCompletionTimeMinutes: FormControl<number>;
  }>;


  //to select time
  showDropdown = false;
  dropdownTop = 0;
  dropdownLeft = 0;
  width = 0; 

  showCustomDropdownForCompletionTimeSelection(
    event: FocusEvent,
  ) {
    const input = event.target as HTMLElement;
    const rect = input.getBoundingClientRect();
    this.dropdownTop = rect.bottom + 4;
    this.dropdownLeft = rect.left;
    this.showDropdown = true;
    this.width = rect.width;
  }

  onEstimatedTimeAssign(timeInMinute: number ) {
    this.showDropdown = false;
    this.estimatedCompletionTimeMinutes.setValue(timeInMinute);
  }



  ngOnInit() {
    this.description = new FormControl(this.todoFormData().description,{ nonNullable: true, validators:  [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200),
    ]});

    this.deadlineDate = new FormControl(this.todoFormData().deadlineDate,{nonNullable: true, validators:  [
      Validators.required,
    ]},);



    this.estimatedCompletionTimeMinutes = new FormControl(this.todoFormData().estimatedCompletionTimeMinutes, {nonNullable: true, validators: [
      Validators.required,
    ]});

    this.todoFormGroup = new FormGroup({
      description: this.description,
      deadlineDate: this.deadlineDate,
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
      estimatedCompletionTimeMinutes : this.estimatedCompletionTimeMinutes.value,
    };
    localStorage.removeItem(this.FORM_NAME);
    this.formSaveEvent.emit(todoCreation);
    this.diag()!.nativeElement.close();
  }

  saveFormData = () => {
    if (this.isEditPage()) return;

    const formValue = this.todoFormGroup.getRawValue();
    console.log("saving");
    console.log(formValue);

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
      try {
        const parsedData = JSON.parse(savedData);
        this.todoFormGroup.patchValue(parsedData); // prefill the form
      } catch (err) {
        console.error('Failed to parse saved form data', err);
      }
    }
  };
}
