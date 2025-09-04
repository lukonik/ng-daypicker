import { Component } from '@angular/core';

@Component({
  selector: 'app-api',
  template: `
    <div class="max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
        <p class="text-xl text-gray-600">
          Complete API documentation for all components, directives, and interfaces.
        </p>
      </div>

      <div class="prose prose-lg max-w-none">
        <!-- NgDaypicker Component -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">NgDaypicker Component</h2>
          <p class="text-gray-700 mb-6">
            The main datepicker component that handles date selection in different modes.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">Inputs</h3>
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SelectionMode</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'single'</td>
                  <td class="px-6 py-4 text-sm text-gray-500">The selection mode: 'single', 'multiple', or 'range'</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">value</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DatepickerValue</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">null</td>
                  <td class="px-6 py-4 text-sm text-gray-500">The selected value(s) based on the mode</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">startView</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CalendarView</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'month'</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Initial calendar view: 'month', 'year', or 'multi-year'</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">minDate</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Date</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Minimum selectable date</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">maxDate</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Date</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Maximum selectable date</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">dateFilter</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(date: Date) => boolean</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Function to filter available dates</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">Outputs</h3>
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DpSelectionChange</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Emitted when the selection changes</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">viewChange</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DpNavigationEvent</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Emitted when the calendar view changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Directives -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Directives</h2>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-4">dpInput</h3>
          <p class="text-gray-700 mb-4">
            Connects an input field to the datepicker for seamless form integration.
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>&lt;input [dpInput]="'single'" dpTrigger /&gt;</code></pre>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">dpTrigger</h3>
          <p class="text-gray-700 mb-4">
            Makes an element trigger the datepicker popup when clicked.
          </p>
        </section>

        <!-- Types and Interfaces -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Types & Interfaces</h2>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>export type SelectionMode = 'single' | 'multiple' | 'range';

export type CalendarView = 'month' | 'year' | 'multi-year';

export interface DateRange &#123;
  start: Date | null;
  end: Date | null;
&#125;

export type DatepickerValue&lt;T extends SelectionMode = SelectionMode&gt; = 
  T extends 'single' ? Date | null :
  T extends 'multiple' ? Date[] :
  T extends 'range' ? DateRange :
  never;

export interface DpSelectionChange&lt;T extends SelectionMode = SelectionMode&gt; &#123;
  value: DatepickerValue&lt;T&gt;;
  mode: T;
&#125;

export interface DpNavigationEvent &#123;
  period: Date;
  view: CalendarView;
&#125;</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
  imports: []
})
export class ApiComponent {}