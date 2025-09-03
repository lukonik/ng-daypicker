import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
  signal,
  computed,
  inject,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  SelectionMode,
  CalendarView,
  DatepickerValue,
  DpSelectionChange,
  DpCalendarChange,
  DateRange,
} from '../models/datepicker-types';
import { DateAdapter } from '../adapters/date-adapter';
import { DpCalendar } from '../calendar/dp-calendar';

@Component({
  selector: 'dp-ng-daypicker',
  imports: [DpCalendar],
  templateUrl: './ng-daypicker.html',
  styleUrl: './ng-daypicker.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgDaypicker),
      multi: true,
    },
  ],
})
export class NgDaypicker<T extends SelectionMode = 'single'> implements ControlValueAccessor {
  private readonly dateAdapter = inject(DateAdapter);

  // Input properties
  readonly mode = input<T>('single' as T);
  readonly inline = input<boolean>(false);
  readonly startView = input<CalendarView>('month');
  readonly disabled = input<boolean>(false);

  // Output events
  readonly selectionChange = output<DpSelectionChange<T>>();
  readonly opened = output<void>();
  readonly closed = output<void>();

  // Internal state
  private readonly _value = signal<DatepickerValue<T> | null>(null);
  private readonly _currentView = signal<CalendarView>('month');
  private readonly _currentPeriod = signal<Date>(new Date());
  private readonly _isOpen = signal<boolean>(false);

  // Computed properties
  readonly value = computed(() => this._value());
  readonly currentView = computed(() => this._currentView());
  readonly currentPeriod = computed(() => this._currentPeriod());
  readonly isOpen = computed(() => this._isOpen());

  // ControlValueAccessor implementation
  private onChange = (_value: DatepickerValue<T> | null) => {
    // Callback will be set by registerOnChange
  };
  private onTouched = () => {
    // Callback will be set by registerOnTouched
  };

  writeValue(value: DatepickerValue<T> | null): void {
    this._value.set(value);
  }

  registerOnChange(fn: (value: DatepickerValue<T> | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Handled through disabled input signal
  }

  // Public methods
  open(): void {
    if (!this.disabled() && !this._isOpen()) {
      this._isOpen.set(true);
      this.opened.emit();
    }
  }

  close(): void {
    if (this._isOpen()) {
      this._isOpen.set(false);
      this.onTouched();
      this.closed.emit();
    }
  }

  toggle(): void {
    if (this._isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  // Internal methods
  protected onSelectionChange(value: DatepickerValue<T>): void {
    this._value.set(value);
    this.onChange(value);
    
    this.selectionChange.emit({
      value,
      mode: this.mode(),
    });

    // Auto-close logic based on mode
    if (this.mode() === 'single') {
      this.close();
    } else if (this.mode() === 'range' && value && typeof value === 'object' && 'start' in value && 'end' in value) {
      const range = value as DateRange;
      if (range.start && range.end) {
        this.close();
      }
    }
  }

  protected navigatePeriod(direction: 'previous' | 'next'): void {
    const current = this._currentPeriod();
    const view = this._currentView();
    let newPeriod: Date;

    switch (view) {
      case 'month':
        newPeriod = this.dateAdapter.addCalendarMonths(current, direction === 'next' ? 1 : -1);
        break;
      case 'year':
        newPeriod = this.dateAdapter.addCalendarYears(current, direction === 'next' ? 1 : -1);
        break;
      case 'multi-year':
        newPeriod = this.dateAdapter.addCalendarYears(current, direction === 'next' ? 12 : -12);
        break;
    }

    this._currentPeriod.set(newPeriod);
  }

  protected changeView(view: CalendarView): void {
    this._currentView.set(view);
  }

  protected onCalendarDateSelected(date: Date): void {
    const mode = this.mode();
    const currentValue = this._value();

    let newValue: DatepickerValue<T>;

    switch (mode) {
      case 'single': {
        newValue = date as DatepickerValue<T>;
        break;
      }
      
      case 'multiple': {
        const currentMultiple = Array.isArray(currentValue) ? currentValue : [];
        const dateIso = this.dateAdapter.toIso8601(date);
        const existingIndex = currentMultiple.findIndex(d => 
          this.dateAdapter.toIso8601(d) === dateIso
        );
        
        if (existingIndex >= 0) {
          // Remove if already selected
          newValue = currentMultiple.filter((_, i) => i !== existingIndex) as DatepickerValue<T>;
        } else {
          // Add to selection
          newValue = [...currentMultiple, date] as DatepickerValue<T>;
        }
        break;
      }
      
      case 'range': {
        const currentRange = (currentValue && typeof currentValue === 'object' && 'start' in currentValue && 'end' in currentValue) 
          ? currentValue as DateRange 
          : { start: null, end: null };
        
        if (!currentRange.start || (currentRange.start && currentRange.end)) {
          // Start new range
          newValue = { start: date, end: null } as DatepickerValue<T>;
        } else {
          // Complete the range
          const start = currentRange.start;
          const end = date;
          newValue = { 
            start: start.getTime() <= end.getTime() ? start : end,
            end: start.getTime() <= end.getTime() ? end : start
          } as DatepickerValue<T>;
        }
        break;
      }
      
      default:
        return;
    }

    this.onSelectionChange(newValue);
  }

  protected onCalendarViewChanged(change: DpCalendarChange): void {
    this._currentPeriod.set(change.value);
    this._currentView.set(change.view);
  }

  protected onCalendarPeriodChanged(period: Date): void {
    this._currentPeriod.set(period);
  }
}
