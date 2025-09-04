import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DpMonthView } from './dp-month-view';
import { DateAdapter } from '../../adapters/date-adapter';
import { NativeDateAdapter } from '../../adapters/native-date-adapter';
import { DP_DATE_FORMATS } from '../../adapters/date-formats';
import { DP_NATIVE_DATE_FORMATS } from '../../adapters/native-date-formats';
import { SelectionMode, DateRange } from '../../models/datepicker-types';

describe('DpMonthView', () => {
  let component: DpMonthView<SelectionMode>;
  let fixture: ComponentFixture<DpMonthView<SelectionMode>>;
  let dateAdapter: DateAdapter<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpMonthView],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: DP_DATE_FORMATS, useValue: DP_NATIVE_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DpMonthView);
    component = fixture.componentInstance;
    dateAdapter = TestBed.inject(DateAdapter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('period input', () => {
    it('should use default period when not provided', () => {
      fixture.detectChanges();

      const today = new Date();
      const periodYear = component.period().getFullYear();
      const periodMonth = component.period().getMonth();

      expect(periodYear).toBe(today.getFullYear());
      expect(periodMonth).toBe(today.getMonth());
    });

    it('should use provided period', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      expect(component.period()).toBe(testDate);
    });
  });

  describe('value input', () => {
    it('should handle null value', () => {
      fixture.componentRef.setInput('value', null);
      fixture.detectChanges();

      expect(component.value()).toBeNull();
    });

    it('should handle single date value', () => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('value', testDate);
      fixture.componentRef.setInput('mode', 'single' as SelectionMode);
      fixture.detectChanges();

      expect(component.value()).toBe(testDate);
    });

    it('should handle multiple dates value', () => {
      const testDates = [new Date(2024, 5, 15), new Date(2024, 5, 20)];
      fixture.componentRef.setInput('value', testDates);
      fixture.componentRef.setInput('mode', 'multiple' as SelectionMode);
      fixture.detectChanges();

      expect(component.value()).toEqual(testDates);
    });

    it('should handle date range value', () => {
      const testRange: DateRange = {
        start: new Date(2024, 5, 10),
        end: new Date(2024, 5, 20),
      };
      fixture.componentRef.setInput('value', testRange);
      fixture.componentRef.setInput('mode', 'range' as SelectionMode);
      fixture.detectChanges();

      expect(component.value()).toEqual(testRange);
    });
  });

  describe('mode input', () => {
    it('should use default mode when not provided', () => {
      fixture.detectChanges();

      expect(component.mode()).toBe('single');
    });

    it('should use provided mode', () => {
      fixture.componentRef.setInput('mode', 'multiple' as SelectionMode);
      fixture.detectChanges();

      expect(component.mode()).toBe('multiple');
    });
  });

  describe('weekdays computation', () => {
    it('should return array of weekday names', () => {
      fixture.detectChanges();

      const weekdays = component.weekdays();
      expect(weekdays).toHaveLength(7);
      expect(weekdays[0]).toBe('Sun');
      expect(weekdays[1]).toBe('Mon');
      expect(weekdays[6]).toBe('Sat');
    });
  });

  describe('monthCells computation', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should generate correct number of cells', () => {
      const cells = component.monthCells();
      // June 2024 starts on Saturday (index 6), so 6 empty cells + 30 days = 36 cells
      expect(cells).toHaveLength(36);
    });

    it('should have empty cells for days before month start', () => {
      const cells = component.monthCells();
      // June 2024 starts on Saturday, so first 6 cells should be empty
      for (let i = 0; i < 6; i++) {
        expect(cells[i].enabled).toBe(false);
        expect(cells[i].value).toBe(0);
        expect(cells[i].displayValue).toBe('');
      }
    });

    it('should have enabled cells for month days', () => {
      const cells = component.monthCells();
      // June 2024 has 30 days, starting at index 6
      for (let i = 6; i < 36; i++) {
        expect(cells[i].enabled).toBe(true);
        expect(cells[i].value).toBe(i - 5); // day number (1-30)
        expect(cells[i].displayValue).toBe(String(i - 5));
      }
    });

    it('should mark today correctly', () => {
      // Mock the dateAdapter.today() to return a known date
      const mockToday = new Date(2024, 5, 15); // June 15, 2024
      vi.spyOn(dateAdapter, 'today').mockReturnValue(mockToday);

      // Set period to June 2024
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();

      const cells = component.monthCells();
      const todayCell = cells.find((cell) => cell.value === 15 && cell.enabled);

      expect(todayCell?.isToday).toBe(true);
    });

    it('should have correct aria-labels', () => {
      const cells = component.monthCells();
      const firstDayCell = cells.find(
        (cell) => cell.value === 1 && cell.enabled
      );

      expect(firstDayCell?.ariaLabel).toContain('Saturday');
      expect(firstDayCell?.ariaLabel).toContain('June');
      expect(firstDayCell?.ariaLabel).toContain('2024');
      expect(firstDayCell?.ariaLabel).toContain('1');
    });
  });

  describe('selection state with single mode', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.componentRef.setInput('mode', 'single' as SelectionMode);
    });

    it('should mark selected date correctly', () => {
      const selectedDate = new Date(2024, 5, 10); // June 10, 2024
      fixture.componentRef.setInput('value', selectedDate);
      fixture.detectChanges();

      const cells = component.monthCells();
      const selectedCell = cells.find(
        (cell) => cell.value === 10 && cell.enabled
      );

      expect(selectedCell?.selected).toBe(true);
    });

    it('should not mark any cell as selected when value is null', () => {
      fixture.componentRef.setInput('value', null);
      fixture.detectChanges();

      const cells = component.monthCells();
      const selectedCells = cells.filter((cell) => cell.selected);

      expect(selectedCells).toHaveLength(0);
    });
  });

  describe('selection state with multiple mode', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.componentRef.setInput('mode', 'multiple' as SelectionMode);
    });

    it('should mark multiple selected dates correctly', () => {
      const selectedDates = [
        new Date(2024, 5, 10),
        new Date(2024, 5, 15),
        new Date(2024, 5, 20),
      ];
      fixture.componentRef.setInput('value', selectedDates);
      fixture.detectChanges();

      const cells = component.monthCells();
      const selectedCells = cells.filter((cell) => cell.selected);

      expect(selectedCells).toHaveLength(3);
      expect(selectedCells.map((cell) => cell.value)).toContain(10);
      expect(selectedCells.map((cell) => cell.value)).toContain(15);
      expect(selectedCells.map((cell) => cell.value)).toContain(20);
    });

    it('should handle empty array', () => {
      fixture.componentRef.setInput('value', []);
      fixture.detectChanges();

      const cells = component.monthCells();
      const selectedCells = cells.filter((cell) => cell.selected);

      expect(selectedCells).toHaveLength(0);
    });
  });

  describe('selection state with range mode', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.componentRef.setInput('mode', 'range' as SelectionMode);
    });

    it('should mark range start and end as selected', () => {
      const range: DateRange = {
        start: new Date(2024, 5, 10),
        end: new Date(2024, 5, 20),
      };
      fixture.componentRef.setInput('value', range);
      fixture.detectChanges();

      const cells = component.monthCells();
      const startCell = cells.find((cell) => cell.value === 10 && cell.enabled);
      const endCell = cells.find((cell) => cell.value === 20 && cell.enabled);

      expect(startCell?.selected).toBe(true);
      expect(endCell?.selected).toBe(true);
    });

    it('should mark dates in range correctly', () => {
      const range: DateRange = {
        start: new Date(2024, 5, 10),
        end: new Date(2024, 5, 15),
      };
      fixture.componentRef.setInput('value', range);
      fixture.detectChanges();

      const cells = component.monthCells();
      const inRangeCells = cells.filter((cell) => cell.inRange && cell.enabled);

      expect(inRangeCells).toHaveLength(6); // Days 10, 11, 12, 13, 14, 15
      expect(inRangeCells.map((cell) => cell.value)).toEqual([
        10, 11, 12, 13, 14, 15,
      ]);
    });

    it('should handle incomplete range (start only)', () => {
      const range: DateRange = {
        start: new Date(2024, 5, 10),
        end: null,
      };
      fixture.componentRef.setInput('value', range);
      fixture.detectChanges();

      const cells = component.monthCells();
      const startCell = cells.find((cell) => cell.value === 10 && cell.enabled);
      const inRangeCells = cells.filter((cell) => cell.inRange);

      expect(startCell?.selected).toBe(true);
      expect(inRangeCells).toHaveLength(0);
    });

    it('should handle incomplete range (end only)', () => {
      const range: DateRange = {
        start: null,
        end: new Date(2024, 5, 20),
      };
      fixture.componentRef.setInput('value', range);
      fixture.detectChanges();

      const cells = component.monthCells();
      const endCell = cells.find((cell) => cell.value === 20 && cell.enabled);
      const inRangeCells = cells.filter((cell) => cell.inRange);

      expect(endCell?.selected).toBe(true);
      expect(inRangeCells).toHaveLength(0);
    });

    it('should handle reversed range (end before start)', () => {
      const range: DateRange = {
        start: new Date(2024, 5, 20),
        end: new Date(2024, 5, 10),
      };
      fixture.componentRef.setInput('value', range);
      fixture.detectChanges();

      const cells = component.monthCells();
      const inRangeCells = cells.filter((cell) => cell.inRange && cell.enabled);

      expect(inRangeCells).toHaveLength(11); // Days 10-20
    });
  });

  describe('event handling', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should emit dateSelected when enabled cell is clicked', () => {
      vi.spyOn(component.dateSelected, 'emit');
      const cells = component.monthCells();
      const enabledCell = cells.find(
        (cell) => cell.enabled && cell.value === 15
      );

      expect(enabledCell).toBeDefined();
      if (enabledCell) {
        component.onCellClick(enabledCell);
      }

      expect(component.dateSelected.emit).toHaveBeenCalledWith(
        expect.objectContaining({
          getFullYear: expect.any(Function),
          getMonth: expect.any(Function),
          getDate: expect.any(Function),
        })
      );

      const emittedDate = vi.mocked(component.dateSelected.emit).mock
        .calls[0][0];
      expect(emittedDate.getFullYear()).toBe(2024);
      expect(emittedDate.getMonth()).toBe(5);
      expect(emittedDate.getDate()).toBe(15);
    });

    it('should not emit dateSelected when disabled cell is clicked', () => {
      vi.spyOn(component.dateSelected, 'emit');
      const cells = component.monthCells();
      const disabledCell = cells.find((cell) => !cell.enabled);

      expect(disabledCell).toBeDefined();
      if (disabledCell) {
        component.onCellClick(disabledCell);
      }

      expect(component.dateSelected.emit).not.toHaveBeenCalled();
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      fixture.componentRef.setInput('period', testDate);
      fixture.detectChanges();
    });

    it('should render weekday headers', () => {
      const weekdayElements = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__weekday'
      );

      expect(weekdayElements).toHaveLength(7);
      expect(weekdayElements[0].textContent.trim()).toBe('Sun');
      expect(weekdayElements[1].textContent.trim()).toBe('Mon');
      expect(weekdayElements[6].textContent.trim()).toBe('Sat');
    });

    it('should render correct number of date cells', () => {
      const cellElements = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--date'
      );

      expect(cellElements).toHaveLength(36); // 6 empty + 30 days
    });

    it('should render enabled cells with content', () => {
      const enabledCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--enabled'
      );

      expect(enabledCells).toHaveLength(30); // June has 30 days

      const firstEnabledCell = enabledCells[0];
      expect(firstEnabledCell.textContent.trim()).toBe('1');
    });

    it('should render disabled cells without content', () => {
      const disabledCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--date:not(.dp-calendar__cell--enabled)'
      ) as HTMLElement[];

      expect(disabledCells).toHaveLength(6); // 6 empty cells before June 1st

      disabledCells.forEach((cell) => {
        expect(cell.textContent.trim()).toBe('');
      });
    });

    it('should apply correct CSS classes for selected cells', () => {
      const selectedDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('value', selectedDate);
      fixture.componentRef.setInput('mode', 'single' as SelectionMode);
      fixture.detectChanges();

      const selectedCell = fixture.nativeElement.querySelector(
        '.dp-calendar__cell--selected'
      );

      expect(selectedCell).toBeTruthy();
      expect(selectedCell.textContent.trim()).toBe('15');
    });

    it('should apply correct CSS classes for in-range cells', () => {
      const range: DateRange = {
        start: new Date(2024, 5, 10),
        end: new Date(2024, 5, 12),
      };
      fixture.componentRef.setInput('value', range);
      fixture.componentRef.setInput('mode', 'range' as SelectionMode);
      fixture.detectChanges();

      const inRangeCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--in-range'
      );

      expect(inRangeCells).toHaveLength(3); // Days 10, 11, 12
    });

    it('should apply correct CSS classes for today cell', () => {
      const today = new Date();
      fixture.componentRef.setInput('period', today);
      fixture.detectChanges();

      const todayCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--today'
      );

      // Should have at most one today cell (only if period includes today)
      expect(todayCells.length).toBeLessThanOrEqual(1);
    });

    it('should have correct aria-labels on date cells', () => {
      const enabledCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--enabled'
      );
      const firstCell = enabledCells[0];

      expect(firstCell.getAttribute('aria-label')).toContain('Saturday');
      expect(firstCell.getAttribute('aria-label')).toContain('June');
      expect(firstCell.getAttribute('aria-label')).toContain('2024');
      expect(firstCell.getAttribute('aria-label')).toContain('1');
    });

    it('should trigger click events on date cells', () => {
      vi.spyOn(component.dateSelected, 'emit');
      const enabledCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--enabled'
      );
      const firstCell = enabledCells[0];

      firstCell.click();

      expect(component.dateSelected.emit).toHaveBeenCalledWith(
        expect.objectContaining({
          getFullYear: expect.any(Function),
          getMonth: expect.any(Function),
          getDate: expect.any(Function),
        })
      );
    });

    it('should not trigger click events on disabled cells', () => {
      vi.spyOn(component.dateSelected, 'emit');
      const disabledCells = fixture.nativeElement.querySelectorAll(
        '.dp-calendar__cell--date:not(.dp-calendar__cell--enabled)'
      );

      if (disabledCells.length > 0) {
        disabledCells[0].click();
        expect(component.dateSelected.emit).not.toHaveBeenCalled();
      }
    });
  });

  describe('input property changes', () => {
    it('should update cells when period changes', () => {
      // Start with June 2024
      const juneDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('period', juneDate);
      fixture.detectChanges();

      const juneCells = component.monthCells();
      const juneDaysCount = juneCells.filter((cell) => cell.enabled).length;
      expect(juneDaysCount).toBe(30); // June has 30 days

      // Change to July 2024
      const julyDate = new Date(2024, 6, 15);
      fixture.componentRef.setInput('period', julyDate);
      fixture.detectChanges();

      const julyCells = component.monthCells();
      const julyDaysCount = julyCells.filter((cell) => cell.enabled).length;
      expect(julyDaysCount).toBe(31); // July has 31 days
    });

    it('should update selection state when value changes', () => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('period', testDate);
      fixture.componentRef.setInput('mode', 'single' as SelectionMode);

      // First selection
      fixture.componentRef.setInput('value', new Date(2024, 5, 10));
      fixture.detectChanges();

      let cells = component.monthCells();
      let selectedCell = cells.find((cell) => cell.selected);
      expect(selectedCell?.value).toBe(10);

      // Change selection
      fixture.componentRef.setInput('value', new Date(2024, 5, 20));
      fixture.detectChanges();

      cells = component.monthCells();
      selectedCell = cells.find((cell) => cell.selected);
      expect(selectedCell?.value).toBe(20);
    });

    it('should update selection behavior when mode changes', () => {
      const testDate = new Date(2024, 5, 15);
      fixture.componentRef.setInput('period', testDate);

      // Start with single mode
      fixture.componentRef.setInput('mode', 'single' as SelectionMode);
      fixture.componentRef.setInput('value', new Date(2024, 5, 10));
      fixture.detectChanges();

      let cells = component.monthCells();
      let selectedCells = cells.filter((cell) => cell.selected);
      expect(selectedCells).toHaveLength(1);

      // Switch to multiple mode with array value
      fixture.componentRef.setInput('mode', 'multiple' as SelectionMode);
      fixture.componentRef.setInput('value', [
        new Date(2024, 5, 10),
        new Date(2024, 5, 15),
      ]);
      fixture.detectChanges();

      cells = component.monthCells();
      selectedCells = cells.filter((cell) => cell.selected);
      expect(selectedCells).toHaveLength(2);
    });
  });
});
