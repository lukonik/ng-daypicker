import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'dp-ng-daypicker',
  imports: [],
  templateUrl: './ng-daypicker.html',
  styleUrl: './ng-daypicker.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDaypicker {}
