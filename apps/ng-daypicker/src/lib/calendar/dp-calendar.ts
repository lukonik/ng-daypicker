import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
  inject,
} from '@angular/core';
import { DateAdapter } from '../adapters/date-adapter';
import {
  CalendarView,
  CalendarCell,
  DpCalendarChange,
  SelectionMode,
  DatepickerValue,
} from '../models/datepicker-types';
import { DpMonthView } from './month-view/dp-month-view';
import { DpYearView } from './year-view/dp-year-view';
import { DpMultiYearView } from './multi-year-view/dp-multi-year-view';
import { DpCalendarHeader } from './header/dp-calendar-header';

@Component({
  selector: 'dp-calendar',
  imports: [DpMonthView, DpYearView, DpMultiYearView, DpCalendarHeader],
  templateUrl: './dp-calendar.html',
  styleUrl: './dp-calendar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpCalendar<T extends SelectionMode = 'single'> {
  private readonly dateAdapter = inject(DateAdapter);

  // Input properties
  readonly view = input<CalendarView>('month');
  readonly period = input<Date>(new Date());
  readonly value = input<DatepickerValue<T> | null>(null);
  readonly mode = input<T>('single' as T);

  // Output events
  readonly dateSelected = output<Date>();
  readonly viewChanged = output<DpCalendarChange>();
  readonly periodChanged = output<Date>();

  // Computed calendar data


  // Event handlers
  onCellClick(cell: CalendarCell): void {
    if (!cell.enabled) return;

    const view = this.view();
    let selectedDate: Date;

    switch (view) {
      case 'multi-year': {
        selectedDate = this.dateAdapter.createDate(cell.value, 0, 1);
        this.viewChanged.emit({ value: selectedDate, view: 'year' });
        break;
      }
    }
  }

  // Event handler for month view
  onMonthDateSelected(date: Date): void {
    this.dateSelected.emit(date);
  }

  // Event handler for year view
  onYearMonthSelected(change: DpCalendarChange): void {
    this.viewChanged.emit(change);
  }

  // Event handler for multi-year view
  onMultiYearSelected(change: DpCalendarChange): void {
    this.viewChanged.emit(change);
  }

  // Event handler for calendar header
  onCalendarHeaderClick(): void {
    const view = this.view();
    
    if (view === 'month') {
      this.viewChanged.emit({ value: this.period(), view: 'year' });
    } else if (view === 'year') {
      this.viewChanged.emit({ value: this.period(), view: 'multi-year' });
    }
  }

  onCalendarNavigation(direction: 'previous' | 'next'): void {
    const period = this.period();
    const view = this.view();
    let newPeriod: Date;

    switch (view) {
      case 'month':
        newPeriod = this.dateAdapter.addCalendarMonths(period, direction === 'next' ? 1 : -1);
        break;
      case 'year':
        newPeriod = this.dateAdapter.addCalendarYears(period, direction === 'next' ? 1 : -1);
        break;
      case 'multi-year':
        newPeriod = this.dateAdapter.addCalendarYears(period, direction === 'next' ? 12 : -12);
        break;
    }

    this.periodChanged.emit(newPeriod);
  }


}