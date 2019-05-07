import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'asin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'client';
  year = new Date().getFullYear();

  constructor() {
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
    // return outlet && outlet.activatedRoute && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

