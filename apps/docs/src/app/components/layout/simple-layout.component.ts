import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-simple-layout',
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header />
      
      <main class="min-h-screen">
        <router-outlet />
      </main>
      
      <app-footer />
    </div>
  `,
  imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class SimpleLayoutComponent {}