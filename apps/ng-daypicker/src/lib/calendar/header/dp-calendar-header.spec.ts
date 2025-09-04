import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DpCalendarHeader } from './dp-calendar-header';
import { DateAdapter } from '../../adapters/date-adapter';
import { NativeDateAdapter } from '../../adapters/native-date-adapter';
import { DP_DATE_FORMATS } from '../../adapters/date-formats';
import { DP_NATIVE_DATE_FORMATS } from '../../adapters/native-date-formats';
import { CalendarView } from '../../models/datepicker-types';

describe('DpCalendarHeader', () => {
  let component: DpCalendarHeader;
  let fixture: ComponentFixture<DpCalendarHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpCalendarHeader],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: DP_DATE_FORMATS, useValue: DP_NATIVE_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DpCalendarHeader);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('periodLabel computation', () => {
    it('should format month view label correctly', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('view', 'month' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('June 2024');
    });

    it('should format year view label correctly', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('view', 'year' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('2024');
    });

    it('should format multi-year view label correctly', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('view', 'multi-year' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      // 2024 falls in the range 2016-2027 (Math.floor(2024 / 12) * 12 = 2016)
      expect(component.periodLabel()).toBe('2016 - 2027');
    });

    it('should handle different years in multi-year view', () => {
      const testDate = new Date(2010, 0, 1); // January 1, 2010
      fixture.componentRef.setInput('view', 'multi-year' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      // 2010 falls in the range 2004-2015 (Math.floor(2010 / 12) * 12 = 2004)
      expect(component.periodLabel()).toBe('2004 - 2015');
    });

    it('should return empty string for unknown view', () => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('view', 'unknown' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('');
    });
  });

  describe('event handling', () => {
    it('should emit headerClick when header is clicked', () => {
      vi.spyOn(component.headerClick, 'emit');

      component.onHeaderClick();

      expect(component.headerClick.emit).toHaveBeenCalledWith();
    });

    it('should emit navigationClick with previous direction', () => {
      vi.spyOn(component.navigationClick, 'emit');

      component.onNavigationClick('previous');

      expect(component.navigationClick.emit).toHaveBeenCalledWith('previous');
    });

    it('should emit navigationClick with next direction', () => {
      vi.spyOn(component.navigationClick, 'emit');

      component.onNavigationClick('next');

      expect(component.navigationClick.emit).toHaveBeenCalledWith('next');
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('view', 'month' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should render navigation buttons', () => {
      const previousButton = fixture.nativeElement.querySelector('.dp-calendar__nav-button--previous');
      const nextButton = fixture.nativeElement.querySelector('.dp-calendar__nav-button--next');

      expect(previousButton).toBeTruthy();
      expect(nextButton).toBeTruthy();
    });

    it('should render period button with correct label', () => {
      const periodButton = fixture.nativeElement.querySelector('.dp-calendar__period-button');

      expect(periodButton).toBeTruthy();
      expect(periodButton.textContent.trim()).toBe('June 2024');
    });

    it('should have correct aria-label on period button', () => {
      const periodButton = fixture.nativeElement.querySelector('.dp-calendar__period-button');

      expect(periodButton.getAttribute('aria-label')).toBe('Current period: June 2024');
    });

    it('should trigger headerClick when period button is clicked', () => {
      vi.spyOn(component.headerClick, 'emit');
      const periodButton = fixture.nativeElement.querySelector('.dp-calendar__period-button');

      periodButton.click();

      expect(component.headerClick.emit).toHaveBeenCalledWith();
    });

    it('should trigger navigationClick when previous button is clicked', () => {
      vi.spyOn(component.navigationClick, 'emit');
      const previousButton = fixture.nativeElement.querySelector('.dp-calendar__nav-button--previous');

      previousButton.click();

      expect(component.navigationClick.emit).toHaveBeenCalledWith('previous');
    });

    it('should trigger navigationClick when next button is clicked', () => {
      vi.spyOn(component.navigationClick, 'emit');
      const nextButton = fixture.nativeElement.querySelector('.dp-calendar__nav-button--next');

      nextButton.click();

      expect(component.navigationClick.emit).toHaveBeenCalledWith('next');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('view', 'month' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should have correct aria-labels on navigation buttons', () => {
      const previousButton = fixture.nativeElement.querySelector('.dp-calendar__nav-button--previous');
      const nextButton = fixture.nativeElement.querySelector('.dp-calendar__nav-button--next');

      expect(previousButton.getAttribute('aria-label')).toBe('Previous period');
      expect(nextButton.getAttribute('aria-label')).toBe('Next period');
    });

    it('should update aria-label when period changes', () => {
      const newDate = new Date(2023, 11, 25); // December 25, 2023
      fixture.componentRef.setInput('period', newDate);
      fixture.detectChanges();

      const periodButton = fixture.nativeElement.querySelector('.dp-calendar__period-button');
      expect(periodButton.getAttribute('aria-label')).toBe('Current period: December 2023');
    });

    it('should update aria-label when view changes', () => {
      fixture.componentRef.setInput('view', 'year' as CalendarView);
      fixture.detectChanges();

      const periodButton = fixture.nativeElement.querySelector('.dp-calendar__period-button');
      expect(periodButton.getAttribute('aria-label')).toBe('Current period: 2024');
    });
  });

  describe('input property changes', () => {
    it('should update period label when view input changes', () => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('view', 'month' as CalendarView);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('June 2024');

      fixture.componentRef.setInput('view', 'year' as CalendarView);
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('2024');
    });

    it('should update period label when period input changes', () => {
      fixture.componentRef.setInput('view', 'month' as CalendarView);
      fixture.componentRef.setInput('period', new Date(2024, 5, 15));
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('June 2024');

      fixture.componentRef.setInput('period', new Date(2023, 2, 10));
      fixture.detectChanges();

      expect(component.periodLabel()).toBe('March 2023');
    });
  });
});