import { Component, ElementRef, input, OnInit, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitCreation, HabitFrequency, DayOfWeek } from '../models/models';
import { SafeCloseDialog } from '../directive/safe-close-dialog.directive';
import { CommonModule } from '@angular/common';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-form-habit',
  imports: [SafeCloseDialog, ReactiveFormsModule, CommonModule],
  templateUrl: './form-habit.component.html',
  styleUrl: './form-habit.component.scss',
})
export class FormHabitComponent implements OnInit {
  // outputs
  formSaveEvent = output<HabitCreation>();

  // inputs
  isEditPage = input.required<boolean>();
  habitFormData = input.required<HabitCreation>();

  FORM_NAME = 'create_habit_form';
  diag = viewChild<ElementRef<HTMLDialogElement>>('create_habit_dialog');

  // Form controls
  habitName!: FormControl<string>;
  startDate!: FormControl<string>;
  endDate!: FormControl<string>;
  cheatDays!: FormControl<number>;
  habitDuration!: FormControl<number>;

  habitFormGroup!: FormGroup<{
    habitName: FormControl<string>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
    cheatDays: FormControl<number>;
    habitDuration: FormControl<number>;
  }>;

  // Days of the week configuration
  daysOfWeek: DayOfWeek[] = [];

  showAdvancedSettings = false;
  showAllErrors = false;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.habitName = new FormControl(this.habitFormData().habitName, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    });

    this.startDate = new FormControl(this.habitFormData().startDate, {
      nonNullable: true,
      validators: [Validators.required],
    });

    this.endDate = new FormControl(this.habitFormData().endDate, {
      nonNullable: true,
      validators: [Validators.required],
    });

    this.cheatDays = new FormControl(this.habitFormData().cheatDays, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    });

    this.habitDuration = new FormControl(this.habitFormData().habitDuration, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    });

    this.habitFormGroup = new FormGroup({
      habitName: this.habitName,
      startDate: this.startDate,
      endDate: this.endDate,
      cheatDays: this.cheatDays,
      habitDuration: this.habitDuration,
    });

    // Initialize daysOfWeek from habitFormData
    if (this.habitFormData().daysOfWeek) {
      this.daysOfWeek = [...this.habitFormData().daysOfWeek!];
    }
  }

  ngAfterViewInit(): void {
    if (this.diag() && !this.diag()!.nativeElement.open) {
      this.diag()!.nativeElement.showModal();
    }
  }

  toggleDay(dayId: number) {
    const day = this.daysOfWeek.find((d) => d.id === dayId);
    if (day) {
      day.selected = !day.selected;
    }
  }

  updateDayDuration(dayId: number, duration: number) {
    const day = this.daysOfWeek.find((d) => d.id === dayId);
    if (day) {
      day.duration = duration;
    }
  }

  toggleAdvancedSettings() {
    this.showAdvancedSettings = !this.showAdvancedSettings;
  }

  onFormSave(event: Event) {
    event.preventDefault();

    // Validate that at least one day is selected
    const selectedDays = this.daysOfWeek.filter((d) => d.selected);
    if (selectedDays.length === 0) {
      this.popupService.showPopup('Please select at least one day', 'Error', 2000);
      return;
    }

    if (this.habitFormGroup.invalid) {
      this.showAllErrors = true;
      return;
    }

    // Build frequency object
    const frequency: HabitFrequency = {};
    selectedDays.forEach((day) => {
      frequency[day.id] = {
        durationMinutes: this.showAdvancedSettings ? day.duration : this.habitDuration.value,
      };
    });

    const habitCreation: HabitCreation = {
      habitName: this.habitName.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      frequency: frequency,
      cheatDays: this.cheatDays.value,
      habitDuration: this.habitDuration.value,
    };

    localStorage.removeItem(this.FORM_NAME);
    this.formSaveEvent.emit(habitCreation);
    this.diag()!.nativeElement.close();
  }

  saveFormData = () => {
    if (this.isEditPage()) return;

    const formValue = this.habitFormGroup.getRawValue();
    const hasData = Object.values(formValue).some(
      (value) => value !== null && value !== undefined && value !== ''
    );

    if (!hasData) {
      return;
    }

    const dataToSave = {
      ...formValue,
      daysOfWeek: this.daysOfWeek,
      showAdvancedSettings: this.showAdvancedSettings,
    };

    localStorage.setItem(this.FORM_NAME, JSON.stringify(dataToSave));
  };

  restoreFormData = () => {
    if (this.isEditPage()) return;

    const savedData = localStorage.getItem(this.FORM_NAME);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.habitFormGroup.patchValue(parsedData);
        if (parsedData.daysOfWeek) {
          this.daysOfWeek = parsedData.daysOfWeek;
        }
        if (parsedData.showAdvancedSettings !== undefined) {
          this.showAdvancedSettings = parsedData.showAdvancedSettings;
        }
      } catch (err) {
        console.error('Failed to parse saved form data', err);
      }
    }
  };
}
