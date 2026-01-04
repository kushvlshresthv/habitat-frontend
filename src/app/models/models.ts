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

export interface TaskSummary {
  description: string;
  deadlineDate: string;
  estimatedCompletionTimeMinutes: number;
}
