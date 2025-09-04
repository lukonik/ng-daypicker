import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="relative">
      <!-- Hero Section -->
      <div class="bg-gradient-to-br from-primary-50 to-primary-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ng-daypicker
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A flexible and customizable Angular datepicker component with support for single, multiple, and range selection modes.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                routerLink="/docs/introduction"
                class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Get Started
              </a>
              <a 
                href="https://github.com/yourusername/ng-daypicker"
                target="_blank"
                class="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p class="text-xl text-gray-600">
              Everything you need in a modern Angular datepicker
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div class="w-8 h-8 bg-primary-600 rounded"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Single Selection</h3>
              <p class="text-gray-600">
                Perfect for forms where users need to select a single date with intuitive interaction.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div class="grid grid-cols-2 gap-1">
                  <div class="w-3 h-3 bg-primary-600 rounded"></div>
                  <div class="w-3 h-3 bg-primary-400 rounded"></div>
                  <div class="w-3 h-3 bg-primary-400 rounded"></div>
                  <div class="w-3 h-3 bg-primary-600 rounded"></div>
                </div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Multiple Selection</h3>
              <p class="text-gray-600">
                Allow users to select multiple dates for events, appointments, or scheduling.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div class="flex space-x-1">
                  <div class="w-2 h-8 bg-primary-600 rounded"></div>
                  <div class="w-2 h-8 bg-primary-400 rounded"></div>
                  <div class="w-2 h-8 bg-primary-400 rounded"></div>
                  <div class="w-2 h-8 bg-primary-600 rounded"></div>
                </div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Range Selection</h3>
              <p class="text-gray-600">
                Ideal for booking systems, date filters, and any scenario requiring date ranges.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Start Section -->
      <div class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Start
            </h2>
            <p class="text-xl text-gray-600">
              Get up and running in minutes
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="bg-gray-900 rounded-lg p-6 mb-8">
              <pre class="text-green-400 text-sm"><code>npm install ng-daypicker</code></pre>
            </div>

            <div class="bg-white rounded-lg p-6 border border-gray-200">
              <pre class="text-sm text-gray-800"><code>&lt;dp-ng-daypicker mode="single"&gt;&lt;/dp-ng-daypicker&gt;</code></pre>
            </div>
          </div>

          <div class="text-center mt-8">
            <a 
              routerLink="/docs/introduction"
              class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Read the full documentation →
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [RouterLink]
})
export class HomeComponent {}