import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDaypicker, DpSelectionChange, DateRange } from 'ng-daypicker';

@Component({
  selector: 'app-range-selection',
  template: `
    <div class="max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Range Selection</h1>
        <p class="text-xl text-gray-600">
          Perfect for booking systems, date filters, and any scenario requiring date ranges.
        </p>
      </div>

      <div class="prose prose-lg max-w-none">
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p class="text-gray-700 mb-4">
            Range selection mode allows users to select a continuous range of dates by choosing 
            a start and end date. This is ideal for booking systems, vacation planners, or date range filters.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Basic Usage</h2>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>&lt;dp-ng-daypicker 
  mode="range"
  [value]="dateRange"
  (selectionChange)="onRangeChange($event)"&gt;
&lt;/dp-ng-daypicker&gt;</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Live Example</h3>
            <div class="flex flex-col lg:flex-row gap-6">
              <div class="flex-1">
                <dp-ng-daypicker 
                  mode="range" 
                  [formControl]="rangeControl"
                  (selectionChange)="onRangeChange($event)"
                  class="inline-block"></dp-ng-daypicker>
              </div>
              <div class="flex-1">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">Selected Range:</h4>
                  <div class="text-gray-600 font-mono text-sm space-y-1">
                    <div>Start: {{ displayRange?.start?.toDateString() ?? 'Not selected' }}</div>
                    <div>End: {{ displayRange?.end?.toDateString() ?? 'Not selected' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">DateRange Interface</h2>
          <p class="text-gray-700 mb-4">
            Range selection uses the DateRange interface:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>interface DateRange &#123;
  start: Date | null;
  end: Date | null;
&#125;

export class MyComponent &#123;
  dateRange: DateRange = &#123;
    start: null,
    end: null
  &#125;;

  onRangeChange(event: DpSelectionChange&lt;'range'&gt;) &#123;
    this.dateRange = event.value;
  &#125;
&#125;</code></pre>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Use Cases</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Hotel Bookings</h3>
              <p class="text-gray-600 text-sm">
                Allow customers to select check-in and check-out dates for hotel reservations.
              </p>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Date Filters</h3>
              <p class="text-gray-600 text-sm">
                Filter data by date ranges in reports, analytics, or search interfaces.
              </p>
            </div>

            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Event Planning</h3>
              <p class="text-gray-600 text-sm">
                Select date ranges for events, conferences, or project timelines.
              </p>
            </div>

            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Vacation Planning</h3>
              <p class="text-gray-600 text-sm">
                Choose vacation periods, leave requests, or availability windows.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  imports: [NgDaypicker, ReactiveFormsModule]
})
export class RangeSelectionComponent {
  rangeControl = new FormControl<DateRange>({ start: null, end: null });
  displayRange: DateRange | null = null;

  constructor() {
    this.rangeControl.valueChanges.subscribe(value => {
      this.displayRange = value;
    });
  }

  onRangeChange(event: DpSelectionChange<'range'>) {
    this.displayRange = event.value;
  }
}