export type SelectionMode = 'single' | 'multiple' | 'range';

export type CalendarView = 'month' | 'year' | 'multi-year';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type DatepickerValue<T extends SelectionMode = SelectionMode> = 
  T extends 'single' ? Date | null :
  T extends 'multiple' ? Date[] :
  T extends 'range' ? DateRange :
  never;

export interface CalendarCell {
  value: number;
  displayValue: string;
  ariaLabel: string;
  enabled: boolean;
  selected: boolean;
  inRange: boolean;
  isToday: boolean;
  isCurrentPeriod: boolean;
}

export interface DpCalendarChange {
  value: Date;
  view: CalendarView;
}

export interface DpSelectionChange<T extends SelectionMode = SelectionMode> {
  value: DatepickerValue<T>;
  mode: T;
}

export interface DpNavigationEvent {
  period: Date;
  view: CalendarView;
}