import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { DpInput, DpTrigger, NgDaypicker } from "ng-daypicker";

@Component({
  imports: [NxWelcome, RouterModule,NgDaypicker,DpInput,DpTrigger],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'docs';
}
