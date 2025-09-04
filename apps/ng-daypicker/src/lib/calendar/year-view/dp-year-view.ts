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
  DpCalendarChange,
} from '../../models/datepicker-types';

@Component({
  selector: 'dp-year-view',
  imports: [],
  templateUrl: './dp-year-view.html',
  styleUrl: './dp-year-view.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpYearView {
  private readonly dateAdapter = inject(DateAdapter);

  // Input properties
  readonly period = input<Date>(new Date());

  // Output events
  readonly monthSelected = output<DpCalendarChange>();

  // Computed properties
  readonly yearCells = computed(() => this.generateYearCells());

  // Event handlers
  onCellClick(cell: CalendarCell): void {
    if (!cell.enabled) return;

    const period = this.period();
    const selectedDate = this.dateAdapter.createDate(
      this.dateAdapter.getYear(period),
      cell.value,
      1
    );
    
    this.monthSelected.emit({ value: selectedDate, view: 'month' });
  }

  // Private methods
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
}