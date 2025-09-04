import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDaypicker, DpSelectionChange } from 'ng-daypicker';

@Component({
  selector: 'app-multiple-selection',
  template: `
    <div class="max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Multiple Selection</h1>
        <p class="text-xl text-gray-600">
          Allow users to select multiple dates for events, appointments, or scheduling applications.
        </p>
      </div>

      <div class="prose prose-lg max-w-none">
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p class="text-gray-700 mb-4">
            Multiple selection mode allows users to select multiple individual dates. This is perfect for 
            scenarios like selecting available dates, choosing multiple appointment slots, or marking important dates.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Basic Usage</h2>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>&lt;dp-ng-daypicker 
  mode="multiple"
  [value]="selectedDates"
  (selectionChange)="onDatesChange($event)"&gt;
&lt;/dp-ng-daypicker&gt;</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Live Example</h3>
            <div class="flex flex-col lg:flex-row gap-6">
              <div class="flex-1">
                <dp-ng-daypicker 
                  mode="multiple" 
                  [formControl]="datesControl"
                  (selectionChange)="onDatesChange($event)"
                  class="inline-block"></dp-ng-daypicker>
              </div>
              <div class="flex-1">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">Selected Dates:</h4>
                  <div class="text-gray-600 font-mono text-sm max-h-32 overflow-y-auto">
                    @if (selectedDateStrings.length > 0) {
                      @for (date of selectedDateStrings; track date) {
                        <div>{{ date }}</div>
                      }
                    } @else {
                      <div>No dates selected</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Configuration</h2>
          <p class="text-gray-700 mb-4">
            The value for multiple selection mode is an array of Date objects:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>export class MyComponent &#123;
  selectedDates: Date[] = [
    new Date('2024-01-15'),
    new Date('2024-01-20'),
    new Date('2024-01-25')
  ];

  onDatesChange(event: DpSelectionChange&lt;'multiple'&gt;) &#123;
    this.selectedDates = event.value;
  &#125;
&#125;</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
  imports: [NgDaypicker, ReactiveFormsModule]
})
export class MultipleSelectionComponent {
  datesControl = new FormControl<Date[]>([]);
  selectedDateStrings: string[] = [];

  constructor() {
    this.datesControl.valueChanges.subscribe(value => {
      this.selectedDateStrings = value ? value.map(date => date.toDateString()) : [];
    });
  }

  onDatesChange(event: DpSelectionChange<'multiple'>) {
    this.selectedDateStrings = event.value.map(date => date.toDateString());
  }
}