import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDaypicker, DpSelectionChange } from 'ng-daypicker';

@Component({
  selector: 'app-single-selection',
  template: `
    <div class="max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Single Selection</h1>
        <p class="text-xl text-gray-600">
          Learn how to use single date selection mode for simple date picking scenarios.
        </p>
      </div>

      <div class="prose prose-lg max-w-none">
        <!-- Overview -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p class="text-gray-700 mb-4">
            Single selection mode is perfect for scenarios where users need to pick one specific date, 
            such as birthdate forms, appointment scheduling, or event creation.
          </p>
        </section>

        <!-- Basic Example -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Basic Usage</h2>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>&lt;dp-ng-daypicker 
  mode="single"
  [value]="selectedDate"
  (selectionChange)="onDateChange($event)"&gt;
&lt;/dp-ng-daypicker&gt;</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Live Example</h3>
            <div class="flex flex-col lg:flex-row gap-6">
              <div class="flex-1">
                <dp-ng-daypicker 
                  mode="single" 
                  [formControl]="dateControl"
                  (selectionChange)="onDateChange($event)"
                  class="inline-block"></dp-ng-daypicker>
              </div>
              <div class="flex-1">
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">Selected Value:</h4>
                  <p class="text-gray-600 font-mono text-sm">
                    {{ selectedDateValue || 'No date selected' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- Configuration Options -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Configuration Options</h2>
          
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">mode</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'single'</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Sets the selection mode to single</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">value</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Date | null</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">null</td>
                  <td class="px-6 py-4 text-sm text-gray-500">The selected date value</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">minDate</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Date</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Minimum selectable date</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">maxDate</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Date</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Maximum selectable date</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Events -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Events</h2>
          
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">selectionChange</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DpSelectionChange&lt;'single'&gt;</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Emitted when a date is selected or deselected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `,
  imports: [NgDaypicker, ReactiveFormsModule]
})
export class SingleSelectionComponent {
  dateControl = new FormControl<Date | null>(null);
  selectedDateValue: string | null = null;

  constructor() {
    this.dateControl.valueChanges.subscribe(value => {
      this.selectedDateValue = value ? value.toDateString() : null;
    });
  }

  onDateChange(event: DpSelectionChange<'single'>) {
    this.selectedDateValue = event.value ? event.value.toDateString() : null;
  }
}