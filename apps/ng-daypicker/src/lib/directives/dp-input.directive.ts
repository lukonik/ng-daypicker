import {
  Directive,
  ElementRef,
  inject,
  input,
  signal,
  computed,
  effect,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DateAdapter } from '../adapters/date-adapter';
import { DP_DATE_FORMATS } from '../adapters/date-formats';
import {
  SelectionMode,
  DatepickerValue,
  DateRange,
} from '../models/datepicker-types';

@Directive({
  selector: 'input[dpInput]',
})
export class DpInput<T extends SelectionMode = 'single'> {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly renderer = inject(Renderer2);
  private readonly ngControl = inject(NgControl, { optional: true });
  private readonly dateAdapter = inject(DateAdapter);
  private readonly dateFormats = inject(DP_DATE_FORMATS, { optional: true });

  // Input properties
  readonly dpInput = input<T>('single' as T); // Selection mode
  readonly placeholder = input<string>('');
  readonly readonly = input<boolean>(false);

  // Internal state
  private readonly _value = signal<DatepickerValue<T> | null>(null);
  
  // Computed display value
  readonly displayValue = computed(() => {
    const value = this._value();
    const mode = this.dpInput();

    if (!value) {
      return '';
    }

    switch (mode) {
      case 'single':
        return value instanceof Date ? this.formatDate(value) : '';
      
      case 'multiple':
        if (Array.isArray(value)) {
          return value
            .filter(date => date instanceof Date)
            .map(date => this.formatDate(date))
            .join(', ');
        }
        return '';
      
      case 'range':
        if (value && typeof value === 'object' && 'start' in value && 'end' in value) {
          const range = value as DateRange;
          const startStr = range.start ? this.formatDate(range.start) : '';
          const endStr = range.end ? this.formatDate(range.end) : '';
          
          if (startStr && endStr) {
            return `${startStr} - ${endStr}`;
          } else if (startStr) {
            return startStr;
          }
        }
        return '';
      
      default:
        return '';
    }
  });

  constructor() {
    // Set initial attributes
    effect(() => {
      const input = this.elementRef.nativeElement;
      
      // Update display value
      this.renderer.setProperty(input, 'value', this.displayValue());
      
      // Set readonly state
      if (this.readonly()) {
        this.renderer.setAttribute(input, 'readonly', '');
      } else {
        this.renderer.removeAttribute(input, 'readonly');
      }
      
      // Set placeholder
      const placeholder = this.placeholder();
      if (placeholder) {
        this.renderer.setAttribute(input, 'placeholder', placeholder);
      }
    });

    // Listen for value changes from form control
    if (this.ngControl?.valueChanges) {
      this.ngControl.valueChanges.subscribe(value => {
        this._value.set(value);
      });
    }
  }

  // Public methods
  setValue(value: DatepickerValue<T> | null): void {
    this._value.set(value);
    
    // Update form control if present
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(value);
    }
  }

  getValue(): DatepickerValue<T> | null {
    return this._value();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  // Private methods
  private formatDate(date: Date): string {
    try {
      const format = this.dateFormats?.display?.dateInput || { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      };
      return this.dateAdapter.format(date, format);
    } catch {
      // Fallback to ISO format if formatting fails
      return this.dateAdapter.toIso8601(date);
    }
  }
}