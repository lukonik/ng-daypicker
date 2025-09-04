import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
  computed,
  inject,
} from '@angular/core';
import { DateAdapter } from '../../adapters/date-adapter';
import {
  CalendarCell,
  SelectionMode,
  DateRange,
  DatepickerValue,
} from '../../models/datepicker-types';

@Component({
  selector: 'dp-month-view',
  imports: [],
  templateUrl: './dp-month-view.html',
  styleUrl: './dp-month-view.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpMonthView<T extends SelectionMode = 'single'> {
  private readonly dateAdapter = inject(DateAdapter);

  // Input properties
  readonly period = input<Date>(new Date());
  readonly value = input<DatepickerValue<T> | null>(null);
  readonly mode = input<T>('single' as T);

  // Output events
  readonly dateSelected = output<Date>();

  // Computed properties
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

  readonly weekdays = computed(() => {
    return this.dateAdapter.getDayOfWeekNames('short');
  });

  readonly monthCells = computed(() => this.generateMonthCells());

  // Event handlers
  onCellClick(cell: CalendarCell): void {
    if (!cell.enabled) return;

    const period = this.period();
    const selectedDate = this.dateAdapter.createDate(
      this.dateAdapter.getYear(period),
      this.dateAdapter.getMonth(period),
      cell.value
    );
    
    this.dateSelected.emit(selectedDate);
  }

  // Private methods
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