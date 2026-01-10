import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-rating-todo',
  imports: [],
  templateUrl: './rating-todo.component.html',
  styleUrl: './rating-todo.component.scss',
})
export class RatingTodoComponent {
  // Input for todoId
  // todoId = input.required<string>();
  todoId = signal(1);

  // View child for dialog
  diag = viewChild<ElementRef<HTMLDialogElement>>('rating_dialog');

  // Rating values with labels
  ratingOptions = [
    { value: 0, label: 'NOT TOUCHED' },
    { value: 1, label: 'BARELY STARTED' },
    { value: 2, label: 'SLIGHTLY ENGAGED' },
    { value: 3, label: 'LOW ENGAGEMENT' },
    { value: 4, label: 'PARTIALLY ENGAGED' },
    { value: 5, label: 'MODERATELY ENGAGED' },
    { value: 6, label: 'FOCUSED' },
    { value: 7, label: 'HIGHLY FOCUSED' },
    { value: 8, label: 'DEEPLY ENGAGED' },
    { value: 9, label: 'FULLY ENGAGED' },
    { value: 10, label: 'COMPLETELY IMMERSED' },
  ];

  ngAfterViewInit(): void {
    // Show the dialog
    if (this.diag() && !this.diag()!.nativeElement.open) {
      this.diag()!.nativeElement.showModal();
    }
  }

  onRatingSelect(rating: number): void {
    console.log(`TodoID: ${this.todoId()}, Rating: ${rating}`);
    this.diag()!.nativeElement.close();
  }

  onCancel(): void {
    this.diag()!.nativeElement.close();
  }
}
