
export interface TodoCreation {
  description: string;
  deadlineDate: string;
  estimatedCompletionTimeMinutes: number;
}

export interface HabitFrequency {
  [day: number]: {
    durationMinutes: number;
  };
}

export interface DayOfWeek {
  id: number;
  label: string;
  name: string;
  selected: boolean;
  duration: number;
}

export interface HabitCreation {
  habitName: string;
  startDate: string;
  endDate: string;
  frequency: HabitFrequency;
  cheatDays: number;
  habitDuration: number;
  daysOfWeek?: DayOfWeek[];
}

export interface Popup {
  message: string;
  type: 'Error' | 'Success';
  displayTime: number;
}


export interface Todo {
  id: number;
  description: string;
  status: string;
  deadlineDate: string;
  estimatedCompletionTimeMinutes: number;
  totalElapsedSeconds: number;
  lastResumedAt: string;
  type: 'Todo' | 'Habit';
}
