import { afterNextRender, Component, effect, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DpInput, NgDaypicker } from 'ng-daypicker';

@Component({
  imports: [RouterModule, NgDaypicker, DpInput],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  dp = viewChild(NgDaypicker);

  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.dp()?.open();
      }, 300);
    });
  }
}
