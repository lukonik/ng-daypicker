import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div class="p-6">
        <nav class="space-y-1">
          @for (item of navItems; track item.path) {
            <div>
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-primary-50 text-primary-700 border-primary-500"
                class="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent transition-colors"
                [class.font-semibold]="!item.children"
              >
                {{ item.title }}
              </a>
              
              @if (item.children) {
                <div class="ml-4 mt-1 space-y-1">
                  @for (child of item.children; track child.path) {
                    <a
                      [routerLink]="child.path"
                      routerLinkActive="bg-primary-50 text-primary-700 border-primary-500"
                      class="group flex items-center px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent transition-colors"
                    >
                      {{ child.title }}
                    </a>
                  }
                </div>
              }
            </div>
          }
        </nav>
      </div>
    </aside>
  `,
  imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent {
  navItems: NavItem[] = [
    {
      title: 'Getting Started',
      path: '/docs/introduction'
    },
    {
      title: 'Selection Modes',
      path: '/docs/selection',
      children: [
        { title: 'Single Selection', path: '/docs/single-selection' },
        { title: 'Multiple Selection', path: '/docs/multiple-selection' },
        { title: 'Range Selection', path: '/docs/range-selection' }
      ]
    },
    {
      title: 'API Reference',
      path: '/docs/api'
    },
    {
      title: 'Theming',
      path: '/docs/theming'
    }
  ];
}