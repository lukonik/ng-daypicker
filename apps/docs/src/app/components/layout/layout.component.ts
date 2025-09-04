import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-layout',
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header />
      
      <div class="flex">
        @if (showSidebar) {
          <app-sidebar />
        }
        
        <main [class]="showSidebar ? 'flex-1 overflow-hidden' : 'flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'">
          <div [class]="showSidebar ? 'p-8' : 'py-8'">
            <router-outlet />
          </div>
        </main>
      </div>
      
      <app-footer />
    </div>
  `,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent]
})
export class LayoutComponent {
  showSidebar = true; // This can be controlled based on route or user preference
}