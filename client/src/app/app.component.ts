import { Component } from '@angular/core';
import { trigger, animate, style, query, transition } from '@angular/animations';

const fade = [
  query(':self',
    [
      style({ opacity: 0 })
    ],
    { optional: true }
  ),

  query(':self',
    [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ],
    { optional: true }
  )
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimations', [
      transition('* => *', fade)
    ])
  ]
})
export class AppComponent {
  title = 'my-app';
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
