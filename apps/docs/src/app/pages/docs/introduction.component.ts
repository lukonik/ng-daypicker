import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgDaypicker } from 'ng-daypicker';

@Component({
  selector: 'app-introduction',
  template: `
    <div class="max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Introduction & Get Started</h1>
        <p class="text-xl text-gray-600">
          Learn how to install and use ng-daypicker in your Angular application.
        </p>
      </div>

      <div class="prose prose-lg max-w-none">
        <!-- Installation -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Installation</h2>
          <p class="text-gray-700 mb-4">
            Install ng-daypicker using your preferred package manager:
          </p>
          
          <div class="bg-gray-900 rounded-lg p-4 mb-4">
            <pre class="text-green-400 text-sm"><code># npm
npm install ng-daypicker

# yarn
yarn add ng-daypicker

# pnpm
pnpm add ng-daypicker</code></pre>
          </div>
        </section>

        <!-- Basic Setup -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Basic Setup</h2>
          <p class="text-gray-700 mb-4">
            Import the ng-daypicker component in your Angular component:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <pre class="text-gray-800 text-sm"><code>import &#123; Component &#125; from '@angular/core';
import &#123; NgDaypicker &#125; from 'ng-daypicker';

@Component(&#123;
  selector: 'app-example',
  template: \`
    &lt;dp-ng-daypicker mode="single"&gt;&lt;/dp-ng-daypicker&gt;
  \`,
  imports: [NgDaypicker]
&#125;)
export class ExampleComponent &#123;&#125;</code></pre>
          </div>
        </section>

        <!-- CSS Imports -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Styling</h2>
          <p class="text-gray-700 mb-4">
            Import the default styles in your global styles.css or component styles:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <pre class="text-gray-800 text-sm"><code>/* In your styles.css */
@import 'ng-daypicker/theming/default-theme.css';
@import 'ng-daypicker/theming/css-variables.css';</code></pre>
          </div>
        </section>

        <!-- First Example -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Your First Datepicker</h2>
          <p class="text-gray-700 mb-4">
            Here's a simple example to get you started:
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <pre class="text-gray-800 text-sm"><code>&lt;dp-ng-daypicker 
  mode="single" 
  [value]="selectedDate"
  (selectionChange)="onDateChange($event)"&gt;
&lt;/dp-ng-daypicker&gt;</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6 mb-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Live Example</h3>
            <div class="flex justify-center">
              <dp-ng-daypicker 
                mode="single" 
                [formControl]="introControl"
                class="inline-block"></dp-ng-daypicker>
            </div>
          </div>
        </section>

        <!-- What's Next -->
        <section class="mb-12">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">What's Next?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Selection Modes</h3>
              <p class="text-gray-600 text-sm mb-4">
                Learn about single, multiple, and range selection modes.
              </p>
              <a href="/docs/single-selection" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Explore Selection Modes →
              </a>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">API Reference</h3>
              <p class="text-gray-600 text-sm mb-4">
                Complete API documentation for all components and directives.
              </p>
              <a href="/docs/api" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View API Reference →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  imports: [NgDaypicker, ReactiveFormsModule]
})
export class IntroductionComponent {
  introControl = new FormControl<Date | null>(null);
}