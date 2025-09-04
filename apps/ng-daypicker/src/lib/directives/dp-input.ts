import { Directive, input, inject, ElementRef, effect } from '@angular/core';
import { NgDaypicker } from '../ng-daypicker/ng-daypicker';
import {
  SelectionMode,
  DateRange,
  DatepickerValue,
} from '../models/datepicker-types';
import { DateAdapter } from '../adapters/date-adapter';

@Directive({
  selector: '[dpInput]',
  host: {
    '(click)': 'onClick()',
    '[attr.readonly]': 'true',
  },
})
export class DpInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly daypicker = input.required<NgDaypicker<any>>({ alias: 'dpInput' });

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly dateAdapter = inject(DateAdapter);

  constructor() {
    effect(() => {
      const picker = this.daypicker();
      if (picker) {
        picker.setInputHost(this.elementRef.nativeElement);
      }
    });

    // Watch for value changes and update input
    effect(() => {
      const picker = this.daypicker();
      if (picker) {
        const value = picker.value();
        const formattedValue = this.formatValue(value, picker.mode());
        this.setInputValue(formattedValue);
      }
    });
  }

  onClick(): void {
    const daypicker = this.daypicker();
    if (daypicker) {
      daypicker.open();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatValue(
    value: DatepickerValue<any> | null,
    mode: SelectionMode
  ): string {
    if (!value) return '';

    switch (mode) {
      case 'single':
        return this.formatSingleDate(value as Date);

      case 'range':
        return this.formatDateRange(value as DateRange);

      case 'multiple':
        return this.formatMultipleDates(value as Date[]);

      default:
        return '';
    }
  }

  private formatSingleDate(date: Date): string {
    return this.dateAdapter.format(date, 'MM/dd/yyyy');
  }

  private formatDateRange(range: DateRange): string {
    if (!range.start && !range.end) return '';
    if (!range.start)
      return range.end
        ? `- ${this.dateAdapter.format(range.end, 'MM/dd/yyyy')}`
        : '';
    if (!range.end)
      return `${this.dateAdapter.format(range.start, 'MM/dd/yyyy')} -`;

    return `${this.dateAdapter.format(
      range.start,
      'MM/dd/yyyy'
    )} - ${this.dateAdapter.format(range.end, 'MM/dd/yyyy')}`;
  }

  private formatMultipleDates(dates: Date[]): string {
    if (!dates || dates.length === 0) return '';

    return dates
      .map((date) => this.dateAdapter.format(date, 'MM/dd/yyyy'))
      .join(', ');
  }

  private setInputValue(value: string): void {
    const element = this.elementRef.nativeElement;
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      element.value = value;
      // Trigger input event for form controls
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
