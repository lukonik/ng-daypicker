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
  DateRange,
  DatepickerValue,
} from '../models/datepicker-types';

@Component({
  selector: 'dp-calendar',
  imports: [],
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

  // Internal state
  private readonly _selectedDates = computed(() => {
    const value = this.value();
    if (!value) return new Set<string>();

    const dateStrings = new Set<string>();
    const mode = this.mode();

    if (mode === 'single' && value instanceof Date) {
      dateStrings.add(this.dateAdapter.toIso8601(value));
    } else if (mode === 'multiple' && Array.isArray(value)) {
      value.forEach(date => {
        if (date instanceof Date) {
          dateStrings.add(this.dateAdapter.toIso8601(date));
        }
      });
    } else if (mode === 'range' && value && typeof value === 'object' && 'start' in value && 'end' in value) {
      const range = value as DateRange;
      if (range.start) {
        dateStrings.add(this.dateAdapter.toIso8601(range.start));
      }
      if (range.end) {
        dateStrings.add(this.dateAdapter.toIso8601(range.end));
      }
    }

    return dateStrings;
  });

  // Computed calendar data
  readonly monthCells = computed(() => this.generateMonthCells());
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

  readonly weekdays = computed(() => {
    return this.dateAdapter.getDayOfWeekNames('short');
  });

  // Event handlers
  onCellClick(cell: CalendarCell): void {
    if (!cell.enabled) return;

    const view = this.view();
    const period = this.period();
    let selectedDate: Date;

    switch (view) {
      case 'month': {
        selectedDate = this.dateAdapter.createDate(
          this.dateAdapter.getYear(period),
          this.dateAdapter.getMonth(period),
          cell.value
        );
        this.dateSelected.emit(selectedDate);
        break;
      }
      
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
  private generateMonthCells(): CalendarCell[] {
    const period = this.period();
    const year = this.dateAdapter.getYear(period);
    const month = this.dateAdapter.getMonth(period);
    const firstOfMonth = this.dateAdapter.createDate(year, month, 1);
    const firstDayOfWeek = this.dateAdapter.getDayOfWeek(firstOfMonth);
    const daysInMonth = this.dateAdapter.getNumDaysInMonth(period);
    const today = this.dateAdapter.today();
    const todayIso = this.dateAdapter.toIso8601(today);
    const selectedDates = this._selectedDates();

    const cells: CalendarCell[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({
        value: 0,
        displayValue: '',
        ariaLabel: '',
        enabled: false,
        selected: false,
        inRange: false,
        isToday: false,
        isCurrentPeriod: false,
      });
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = this.dateAdapter.createDate(year, month, day);
      const dateIso = this.dateAdapter.toIso8601(date);
      const isSelected = selectedDates.has(dateIso);
      const isInRange = this.isDateInRange(date);

      cells.push({
        value: day,
        displayValue: String(day),
        ariaLabel: this.dateAdapter.format(date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        enabled: true,
        selected: isSelected,
        inRange: isInRange,
        isToday: dateIso === todayIso,
        isCurrentPeriod: false,
      });
    }

    return cells;
  }

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

  private isDateInRange(date: Date): boolean {
    const value = this.value();
    const mode = this.mode();

    if (mode !== 'range' || !value || typeof value !== 'object' || !('start' in value && 'end' in value)) {
      return false;
    }

    const range = value as DateRange;
    if (!range.start || !range.end) {
      return false;
    }

    const dateTime = date.getTime();
    const startTime = range.start.getTime();
    const endTime = range.end.getTime();

    return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime);
  }
}