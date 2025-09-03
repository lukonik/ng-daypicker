import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgDaypicker } from './ng-daypicker';

describe('NgDaypicker', () => {
  let component: NgDaypicker;
  let fixture: ComponentFixture<NgDaypicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDaypicker],
    }).compileComponents();

    fixture = TestBed.createComponent(NgDaypicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
