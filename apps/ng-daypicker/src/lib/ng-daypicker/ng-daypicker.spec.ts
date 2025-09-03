import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgDaypicker } from './ng-daypicker';
import { DateAdapter } from '../adapters/date-adapter';
import { NativeDateAdapter } from '../adapters/native-date-adapter';
import { DP_DATE_FORMATS } from '../adapters/date-formats';
import { DP_NATIVE_DATE_FORMATS } from '../adapters/native-date-formats';

describe('NgDaypicker', () => {
  let component: NgDaypicker;
  let fixture: ComponentFixture<NgDaypicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDaypicker],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: DP_DATE_FORMATS, useValue: DP_NATIVE_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgDaypicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
