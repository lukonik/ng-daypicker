import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">DP</span>
              </div>
              <span class="text-xl font-bold text-gray-900">ng-daypicker</span>
            </div>
            <p class="text-gray-600 text-sm max-w-md">
              A flexible and customizable Angular datepicker component with support for single, multiple, and range selection modes.
            </p>
          </div>

          <!-- Documentation Links -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Documentation</h3>
            <ul class="space-y-2">
              <li>
                <a routerLink="/docs/introduction" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Get Started
                </a>
              </li>
              <li>
                <a routerLink="/docs/single-selection" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Single Selection
                </a>
              </li>
              <li>
                <a routerLink="/docs/range-selection" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Range Selection
                </a>
              </li>
              <li>
                <a routerLink="/docs/api" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul class="space-y-2">
              <li>
                <a href="https://github.com/yourusername/ng-daypicker" target="_blank" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/ng-daypicker" target="_blank" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  npm Package
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Issue Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-gray-500">
              © {{ currentYear }} ng-daypicker. Built with Angular & TailwindCSS.
            </p>
            <p class="text-sm text-gray-500 mt-2 md:mt-0">
              Made with ❤️ for the Angular community
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  imports: [RouterLink]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}