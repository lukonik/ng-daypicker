import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DpYearView } from './dp-year-view';
import { DateAdapter } from '../../adapters/date-adapter';
import { NativeDateAdapter } from '../../adapters/native-date-adapter';
import { DP_DATE_FORMATS } from '../../adapters/date-formats';
import { DP_NATIVE_DATE_FORMATS } from '../../adapters/native-date-formats';
import { DpCalendarChange } from '../../models/datepicker-types';

describe('DpYearView', () => {
  let component: DpYearView;
  let fixture: ComponentFixture<DpYearView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpYearView],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: DP_DATE_FORMATS, useValue: DP_NATIVE_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DpYearView);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('period input', () => {
    it('should use default period when not provided', () => {
      fixture.detectChanges();
      
      const today = new Date();
      const periodYear = component.period().getFullYear();
      
      expect(periodYear).toBe(today.getFullYear());
    });

    it('should use provided period', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      expect(component.period()).toBe(testDate);
    });
  });

  describe('yearCells computation', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should generate 12 month cells', () => {
      const cells = component.yearCells();
      
      expect(cells).toHaveLength(12);
    });

    it('should have correct month values (0-11)', () => {
      const cells = component.yearCells();
      
      cells.forEach((cell, index) => {
        expect(cell.value).toBe(index);
      });
    });

    it('should have correct month display names', () => {
      const cells = component.yearCells();
      const expectedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      cells.forEach((cell, index) => {
        expect(cell.displayValue).toBe(expectedMonths[index]);
        expect(cell.ariaLabel).toBe(expectedMonths[index]);
      });
    });

    it('should mark all cells as enabled', () => {
      const cells = component.yearCells();
      
      cells.forEach((cell) => {
        expect(cell.enabled).toBe(true);
      });
    });

    it('should not mark any cells as selected by default', () => {
      const cells = component.yearCells();
      
      cells.forEach((cell) => {
        expect(cell.selected).toBe(false);
      });
    });

    it('should not mark any cells as in range by default', () => {
      const cells = component.yearCells();
      
      cells.forEach((cell) => {
        expect(cell.inRange).toBe(false);
      });
    });

    it('should not mark any cells as today by default', () => {
      const cells = component.yearCells();
      
      cells.forEach((cell) => {
        expect(cell.isToday).toBe(false);
      });
    });

    it('should mark current month as current period', () => {
      // Set system time to a specific date to test current period logic
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15)); // June 15, 2024

      // Set period to the same year
      fixture.componentRef.setInput('period', new Date(2024, 8, 20)); // September 20, 2024
      fixture.detectChanges();
      
      const cells = component.yearCells();
      const juneCell = cells[5]; // June is index 5
      
      expect(juneCell.isCurrentPeriod).toBe(true);
      
      // Other months should not be current period
      cells.forEach((cell, index) => {
        if (index !== 5) {
          expect(cell.isCurrentPeriod).toBe(false);
        }
      });
      
      vi.useRealTimers();
    });

    it('should not mark any month as current period when period is different year', () => {
      // Set system time to 2024
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15)); // June 15, 2024

      // Set period to different year
      fixture.componentRef.setInput('period', new Date(2023, 8, 20)); // September 20, 2023
      fixture.detectChanges();
      
      const cells = component.yearCells();
      
      cells.forEach((cell) => {
        expect(cell.isCurrentPeriod).toBe(false);
      });
      
      vi.useRealTimers();
    });
  });

  describe('event handling', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should emit monthSelected when enabled cell is clicked', () => {
      vi.spyOn(component.monthSelected, 'emit');
      const cells = component.yearCells();
      const juneCell = cells[5]; // June is index 5

      component.onCellClick(juneCell);

      expect(component.monthSelected.emit).toHaveBeenCalledWith({
        value: expect.objectContaining({
          getFullYear: expect.any(Function),
          getMonth: expect.any(Function),
          getDate: expect.any(Function),
        }),
        view: 'month'
      });
      
      const emittedChange = vi.mocked(component.monthSelected.emit).mock.calls[0][0] as DpCalendarChange;
      expect(emittedChange.value.getFullYear()).toBe(2024);
      expect(emittedChange.value.getMonth()).toBe(5); // June is month 5
      expect(emittedChange.value.getDate()).toBe(1); // First day of month
      expect(emittedChange.view).toBe('month');
    });

    it('should not emit monthSelected when disabled cell is clicked', () => {
      vi.spyOn(component.monthSelected, 'emit');
      const cells = component.yearCells();
      
      // Manually create a disabled cell for testing
      const disabledCell = { ...cells[0], enabled: false };

      component.onCellClick(disabledCell);

      expect(component.monthSelected.emit).not.toHaveBeenCalled();
    });

    it('should create date with correct year from period', () => {
      vi.spyOn(component.monthSelected, 'emit');
      
      // Test with different year
      const testDate = new Date(2023, 8, 20); // September 20, 2023
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
      
      const cells = component.yearCells();
      const marchCell = cells[2]; // March is index 2

      component.onCellClick(marchCell);

      const emittedChange = vi.mocked(component.monthSelected.emit).mock.calls[0][0] as DpCalendarChange;
      expect(emittedChange.value.getFullYear()).toBe(2023);
      expect(emittedChange.value.getMonth()).toBe(2); // March is month 2
      expect(emittedChange.value.getDate()).toBe(1);
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should render correct number of month cells', () => {
      const cellElements = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--month');
      
      expect(cellElements).toHaveLength(12);
    });

    it('should render month names correctly', () => {
      const cellElements = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--month');
      const expectedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      cellElements.forEach((cell, index) => {
        expect(cell.textContent.trim()).toBe(expectedMonths[index]);
      });
    });

    it('should apply enabled CSS class to all cells', () => {
      const enabledCells = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--enabled');
      
      expect(enabledCells).toHaveLength(12);
    });

    it('should not apply selected CSS class to any cells by default', () => {
      const selectedCells = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--selected');
      
      expect(selectedCells).toHaveLength(0);
    });

    it('should apply current-period CSS class to current month', () => {
      // Set system time to June 2024
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15)); // June 15, 2024

      // Set period to same year and re-detect changes
      fixture.componentRef.setInput('period', new Date(2024, 8, 20));
      fixture.detectChanges();
      
      const currentPeriodCells = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--current-period');
      
      expect(currentPeriodCells).toHaveLength(1);
      expect(currentPeriodCells[0].textContent.trim()).toBe('Jun');
      
      vi.useRealTimers();
    });

    it('should have correct aria-labels on month cells', () => {
      const cellElements = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--month');
      const expectedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      cellElements.forEach((cell, index) => {
        expect(cell.getAttribute('aria-label')).toBe(expectedMonths[index]);
      });
    });

    it('should trigger click events on month cells', () => {
      vi.spyOn(component.monthSelected, 'emit');
      const cellElements = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--month');
      const juneCell = cellElements[5]; // June is index 5

      juneCell.click();

      expect(component.monthSelected.emit).toHaveBeenCalledWith({
        value: expect.objectContaining({
          getFullYear: expect.any(Function),
          getMonth: expect.any(Function),
          getDate: expect.any(Function),
        }),
        view: 'month'
      });
    });

    it('should not have disabled attribute on enabled cells', () => {
      const cellElements = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--month');
      
      cellElements.forEach((cell) => {
        expect(cell.disabled).toBe(false);
      });
    });

    it('should have correct CSS classes structure', () => {
      const container = fixture.nativeElement.querySelector('.dp-year-view');
      const grid = fixture.nativeElement.querySelector('.dp-calendar__grid--year');
      const cells = fixture.nativeElement.querySelectorAll('.dp-calendar__cell--month');
      const cellContents = fixture.nativeElement.querySelectorAll('.dp-calendar__cell-content');
      
      expect(container).toBeTruthy();
      expect(grid).toBeTruthy();
      expect(cells).toHaveLength(12);
      expect(cellContents).toHaveLength(12);
    });
  });

  describe('input property changes', () => {
    it('should update cells when period year changes', () => {
      // Start with 2024
      const date2024 = new Date(2024, 5, 15);
      fixture.componentRef.setInput('period', date2024);
      fixture.detectChanges();

      vi.spyOn(component.monthSelected, 'emit');
      const cells = component.yearCells();
      component.onCellClick(cells[5]); // June

      let emittedChange = vi.mocked(component.monthSelected.emit).mock.calls[0][0] as DpCalendarChange;
      expect(emittedChange.value.getFullYear()).toBe(2024);

      // Change to 2023
      const date2023 = new Date(2023, 5, 15);
      fixture.componentRef.setInput('period', date2023);
      fixture.detectChanges();

      vi.mocked(component.monthSelected.emit).mockClear();
      const updatedCells = component.yearCells();
      component.onCellClick(updatedCells[5]); // June

      emittedChange = vi.mocked(component.monthSelected.emit).mock.calls[0][0] as DpCalendarChange;
      expect(emittedChange.value.getFullYear()).toBe(2023);
    });

    it('should update current period highlighting when period changes', () => {
      // Set system time to June 2024
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15)); // June 15, 2024

      // Set period to 2024 - should highlight June
      fixture.componentRef.setInput('period', new Date(2024, 8, 20));
      fixture.detectChanges();

      let cells = component.yearCells();
      expect(cells[5].isCurrentPeriod).toBe(true); // June

      // Change period to 2023 - should not highlight any month
      fixture.componentRef.setInput('period', new Date(2023, 8, 20));
      fixture.detectChanges();

      cells = component.yearCells();
      cells.forEach((cell) => {
        expect(cell.isCurrentPeriod).toBe(false);
      });

      vi.useRealTimers();
    });

    it('should maintain month names and values when period changes', () => {
      const expectedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Initial period
      fixture.componentRef.setInput('period', new Date(2024, 5, 15));
      fixture.detectChanges();

      let cells = component.yearCells();
      cells.forEach((cell, index) => {
        expect(cell.value).toBe(index);
        expect(cell.displayValue).toBe(expectedMonths[index]);
        expect(cell.ariaLabel).toBe(expectedMonths[index]);
      });

      // Changed period
      fixture.componentRef.setInput('period', new Date(2023, 2, 10));
      fixture.detectChanges();

      cells = component.yearCells();
      cells.forEach((cell, index) => {
        expect(cell.value).toBe(index);
        expect(cell.displayValue).toBe(expectedMonths[index]);
        expect(cell.ariaLabel).toBe(expectedMonths[index]);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle leap year periods correctly', () => {
      // 2024 is a leap year
      const leapYearDate = new Date(2024, 1, 29); // February 29, 2024
      fixture.componentRef.setInput('period', leapYearDate);
      fixture.detectChanges();

      const cells = component.yearCells();
      expect(cells).toHaveLength(12);
      expect(cells[1].displayValue).toBe('Feb'); // February should still be there
    });

    it('should handle year boundaries correctly', () => {
      // Test with year 1900
      const oldDate = new Date(1900, 0, 1);
      fixture.componentRef.setInput('period', oldDate);
      fixture.detectChanges();

      vi.spyOn(component.monthSelected, 'emit');
      const cells = component.yearCells();
      component.onCellClick(cells[0]); // January

      const emittedChange = vi.mocked(component.monthSelected.emit).mock.calls[0][0] as DpCalendarChange;
      expect(emittedChange.value.getFullYear()).toBe(1900);
      expect(emittedChange.value.getMonth()).toBe(0);

      // Test with year 2100
      const futureDate = new Date(2100, 11, 31);
      fixture.componentRef.setInput('period', futureDate);
      fixture.detectChanges();

      vi.mocked(component.monthSelected.emit).mockClear();
      const futureCells = component.yearCells();
      component.onCellClick(futureCells[11]); // December

      const futureEmittedChange = vi.mocked(component.monthSelected.emit).mock.calls[0][0] as DpCalendarChange;
      expect(futureEmittedChange.value.getFullYear()).toBe(2100);
      expect(futureEmittedChange.value.getMonth()).toBe(11);
    });

    it('should handle all months correctly', () => {
      const testDate = new Date(2024, 6, 15); // July 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      vi.spyOn(component.monthSelected, 'emit');
      const cells = component.yearCells();

      // Test clicking each month
      cells.forEach((cell, index) => {
        component.onCellClick(cell);
        
        const emittedChange = vi.mocked(component.monthSelected.emit).mock.calls[index][0] as DpCalendarChange;
        expect(emittedChange.value.getFullYear()).toBe(2024);
        expect(emittedChange.value.getMonth()).toBe(index);
        expect(emittedChange.value.getDate()).toBe(1);
        expect(emittedChange.view).toBe('month');
      });
      
      expect(component.monthSelected.emit).toHaveBeenCalledTimes(12);
    });
  });
});