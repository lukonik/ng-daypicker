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
import { CalendarView } from '../../models/datepicker-types';

@Component({
  selector: 'dp-calendar-header',
  imports: [],
  templateUrl: './dp-calendar-header.html',
  styleUrl: './dp-calendar-header.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpCalendarHeader {
  private readonly dateAdapter = inject(DateAdapter);

  // Input properties
  readonly view = input<CalendarView>('month');
  readonly period = input<Date>(new Date());

  // Output events
  readonly headerClick = output<void>();
  readonly navigationClick = output<'previous' | 'next'>();

  // Computed properties
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
  onHeaderClick(): void {
    this.headerClick.emit();
  }

  onNavigationClick(direction: 'previous' | 'next'): void {
    this.navigationClick.emit(direction);
  }
}