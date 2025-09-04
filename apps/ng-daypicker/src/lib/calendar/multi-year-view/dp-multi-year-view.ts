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
  selector: 'dp-multi-year-view',
  imports: [],
  templateUrl: './dp-multi-year-view.html',
  styleUrl: './dp-multi-year-view.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpMultiYearView {
  private readonly dateAdapter = inject(DateAdapter);

  // Input properties
  readonly period = input<Date>(new Date());

  // Output events
  readonly yearSelected = output<DpCalendarChange>();

  // Computed properties
  readonly multiYearCells = computed(() => this.generateMultiYearCells());

  // Event handlers
  onCellClick(cell: CalendarCell): void {
    if (!cell.enabled) return;

    const selectedDate = this.dateAdapter.createDate(cell.value, 0, 1);
    this.yearSelected.emit({ value: selectedDate, view: 'year' });
  }

  // Private methods
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