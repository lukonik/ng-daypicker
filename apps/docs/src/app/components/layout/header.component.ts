import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and brand -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">DP</span>
              </div>
              <span class="text-xl font-bold text-gray-900">ng-daypicker</span>
            </a>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center space-x-8">
            <a 
              routerLink="/docs/introduction" 
              routerLinkActive="text-primary-600 border-primary-600"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary-300 transition-colors"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/yourusername/ng-daypicker" 
              target="_blank"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  imports: [RouterLink, RouterLinkActive]
})
export class HeaderComponent {}