import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDaypicker } from 'ng-daypicker';

@Component({
  selector: 'app-theming',
  template: `
    <div class="max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Theming</h1>
        <p class="text-xl text-gray-600">
          Customize the appearance of ng-daypicker to match your application's design.
        </p>
      </div>

      <div class="prose prose-lg max-w-none">
        <!-- CSS Variables -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">CSS Variables</h2>
          <p class="text-gray-700 mb-4">
            ng-daypicker uses CSS custom properties (variables) for easy theming. You can override these variables 
            to customize colors, spacing, and typography.
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>:root &#123;
  /* Primary colors */
  --dp-primary-color: #3b82f6;
  --dp-primary-hover-color: #2563eb;
  --dp-primary-text-color: #ffffff;
  
  /* Background colors */
  --dp-bg-color: #ffffff;
  --dp-hover-bg-color: #f3f4f6;
  --dp-selected-bg-color: var(--dp-primary-color);
  
  /* Text colors */
  --dp-text-color: #1f2937;
  --dp-muted-text-color: #6b7280;
  --dp-disabled-text-color: #9ca3af;
  
  /* Border colors */
  --dp-border-color: #e5e7eb;
  --dp-border-radius: 0.5rem;
  
  /* Spacing */
  --dp-cell-size: 2.5rem;
  --dp-spacing-sm: 0.25rem;
  --dp-spacing-md: 0.5rem;
  --dp-spacing-lg: 1rem;
&#125;</code></pre>
          </div>
        </section>

        <!-- Custom Theme Example -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Custom Theme Example</h2>
          <p class="text-gray-700 mb-4">
            Here's an example of creating a custom purple theme:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>.purple-theme &#123;
  --dp-primary-color: #8b5cf6;
  --dp-primary-hover-color: #7c3aed;
  --dp-selected-bg-color: #8b5cf6;
  --dp-hover-bg-color: #f3e8ff;
  --dp-border-color: #e9d5ff;
&#125;</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Purple Theme Preview</h3>
            <div class="purple-theme flex justify-center">
              <dp-ng-daypicker 
                mode="single" 
                [formControl]="purpleControl"
                class="inline-block"></dp-ng-daypicker>
            </div>
          </div>
        </section>

        <!-- Dark Mode -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibent text-gray-900 mb-4">Dark Mode</h2>
          <p class="text-gray-700 mb-4">
            Create a dark theme by overriding the color variables:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>.dark-theme &#123;
  --dp-bg-color: #1f2937;
  --dp-hover-bg-color: #374151;
  --dp-text-color: #f9fafb;
  --dp-muted-text-color: #d1d5db;
  --dp-disabled-text-color: #9ca3af;
  --dp-border-color: #4b5563;
  --dp-primary-color: #60a5fa;
  --dp-primary-hover-color: #3b82f6;
&#125;</code></pre>
          </div>

          <div class="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium text-white mb-4">Dark Theme Preview</h3>
            <div class="dark-theme flex justify-center">
              <dp-ng-daypicker 
                mode="single" 
                [formControl]="darkControl"
                class="inline-block"></dp-ng-daypicker>
            </div>
          </div>
        </section>

        <!-- Component-Specific Styling -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Component-Specific Styling</h2>
          <p class="text-gray-700 mb-4">
            You can also target specific parts of the datepicker with CSS classes:
          </p>
          
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-calendar</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Main calendar container</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-calendar-header</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Calendar header with navigation</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-month-view</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Month view grid</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-calendar-cell</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Individual date cells</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-selected</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Selected date cells</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-in-range</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Dates within a selected range</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">.dp-today</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Today's date indicator</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Best Practices -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div class="flex">
              <div class="ml-3">
                <p class="text-sm text-blue-800">
                  <strong>Tip:</strong> Use CSS custom properties for easy theme switching and better maintainability. 
                  Consider using CSS-in-JS libraries or CSS preprocessors for more complex theming needs.
                </p>
              </div>
            </div>
          </div>

          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>Always test your custom themes in different browsers</li>
            <li>Ensure sufficient color contrast for accessibility</li>
            <li>Use semantic color names in your variable definitions</li>
            <li>Consider both light and dark mode variants</li>
            <li>Test with different screen sizes and devices</li>
          </ul>
        </section>
      </div>
    </div>

    <style>
      .purple-theme {
        --dp-primary-color: #8b5cf6;
        --dp-primary-hover-color: #7c3aed;
        --dp-selected-bg-color: #8b5cf6;
        --dp-hover-bg-color: #f3e8ff;
        --dp-border-color: #e9d5ff;
      }

      .dark-theme {
        --dp-bg-color: #1f2937;
        --dp-hover-bg-color: #374151;
        --dp-text-color: #f9fafb;
        --dp-muted-text-color: #d1d5db;
        --dp-disabled-text-color: #9ca3af;
        --dp-border-color: #4b5563;
        --dp-primary-color: #60a5fa;
        --dp-primary-hover-color: #3b82f6;
      }
    </style>
  `,
  imports: [NgDaypicker, ReactiveFormsModule]
})
export class ThemingComponent {
  purpleControl = new FormControl<Date | null>(null);
  darkControl = new FormControl<Date | null>(null);
}