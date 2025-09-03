import {
  Directive,
  ElementRef,
  inject,
  output,
  HostListener,
  input,
} from '@angular/core';

@Directive({
  selector: '[dpTrigger]',
})
export class DpTrigger {
  private readonly elementRef = inject(ElementRef);

  // Input properties
  readonly disabled = input<boolean>(false);

  // Output events
  readonly triggerClick = output<MouseEvent>();
  readonly triggerFocus = output<FocusEvent>();
  readonly triggerBlur = output<FocusEvent>();
  readonly triggerKeydown = output<KeyboardEvent>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    this.triggerClick.emit(event);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    if (this.disabled()) {
      return;
    }
    
    this.triggerFocus.emit(event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    if (this.disabled()) {
      return;
    }
    
    this.triggerBlur.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    // Handle common datepicker keyboard interactions
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.triggerKeydown.emit(event);
        break;
      case 'Escape':
        this.triggerKeydown.emit(event);
        break;
    }
  }

  // Public methods
  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  blur(): void {
    this.elementRef.nativeElement.blur();
  }

  getElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}