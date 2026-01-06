import id from "@angular/common/locales/id";

export interface TodoCreation {
  description: string;
  deadlineDate: string;
  estimatedCompletionTimeMinutes: number;
}
export interface Popup {
  message: string;
  type: "Error" | "Success";
  displayTime: number;
}

    // Integer id;
    // String description;
    // String status;
    // LocalDate deadlineDate;
    // Integer estimatedCompletionTimeMinutes;
    // Integer totalElapsedSeconds;
    // LocalTime lastResumedAt;

export interface TaskSummary {
  id: number;
  description: string;
  status: string;
  deadlineDate: string;
  estimatedCompletionTimeMinutes: number;
  totalElapsedSeconds: number;
  lastResumedAt: string;
}
