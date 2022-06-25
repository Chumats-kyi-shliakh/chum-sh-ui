import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { PAGE_NAMES } from './constants/page-names';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public titleText: string = PAGE_NAMES.default;
  public isBackButton = false;

  constructor(private router: Router, private geolocationService: GeolocationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const path = (<NavigationEnd>event).url.slice(1);
        this.titleText = path ? PAGE_NAMES[path] : PAGE_NAMES.default;
        this.isBackButton = !!path;
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geolocationService.coords$.next(position.coords);
      });
    }
  }
}
