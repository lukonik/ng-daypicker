import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
  computed,
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

@Component({
  selector: 'dp-calendar',
  imports: [DpMonthView],
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
  readonly yearCells = computed(() => this.generateYearCells());
  readonly multiYearCells = computed(() => this.generateMultiYearCells());

  readonly periodLabel = computed(() => {
    const period = this.period();
    const view = this.view();

    switch (view) {
      case 'month':
        return this.dateAdapter.format(period, { year: 'numeric', month: 'long' });
      case 'year':
        return this.dateAdapter.getYearName(period);
      case 'multi-year': {
        const startYear = Math.floor(this.dateAdapter.getYear(period) / 12) * 12;
        return `${startYear} - ${startYear + 11}`;
      }
      default:
        return '';
    }
  });


  // Event handlers
  onCellClick(cell: CalendarCell): void {
    if (!cell.enabled) return;

    const view = this.view();
    const period = this.period();
    let selectedDate: Date;

    switch (view) {
      case 'year': {
        selectedDate = this.dateAdapter.createDate(
          this.dateAdapter.getYear(period),
          cell.value,
          1
        );
        this.viewChanged.emit({ value: selectedDate, view: 'month' });
        break;
      }
      
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

  onHeaderClick(): void {
    const view = this.view();
    
    if (view === 'month') {
      this.viewChanged.emit({ value: this.period(), view: 'year' });
    } else if (view === 'year') {
      this.viewChanged.emit({ value: this.period(), view: 'multi-year' });
    }
  }

  navigatePeriod(direction: 'previous' | 'next'): void {
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

  // Private methods for generating calendar data

  private generateYearCells(): CalendarCell[] {
    const period = this.period();
    const currentYear = this.dateAdapter.getYear(period);
    const currentMonth = this.dateAdapter.getMonth(new Date());
    const monthNames = this.dateAdapter.getMonthNames('short');

    return monthNames.map((name, index) => ({
      value: index,
      displayValue: name,
      ariaLabel: name,
      enabled: true,
      selected: false,
      inRange: false,
      isToday: false,
      isCurrentPeriod: index === currentMonth && currentYear === this.dateAdapter.getYear(new Date()),
    }));
  }

  private generateMultiYearCells(): CalendarCell[] {
    const period = this.period();
    const currentYear = this.dateAdapter.getYear(period);
    const startYear = Math.floor(currentYear / 12) * 12;
    const todayYear = this.dateAdapter.getYear(new Date());

    const cells: CalendarCell[] = [];

    for (let year = startYear; year < startYear + 12; year++) {
      cells.push({
        value: year,
        displayValue: String(year),
        ariaLabel: String(year),
        enabled: true,
        selected: false,
        inRange: false,
        isToday: false,
        isCurrentPeriod: year === todayYear,
      });
    }

    return cells;
  }

}