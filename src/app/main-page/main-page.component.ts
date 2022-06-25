import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../constants/routes';
import maplibregl from 'maplibre-gl';
import { ApiService } from '../services/api.service';
import { GeolocationService } from '../services/geolocation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent {
  public activeOrder!: any;

  private map: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private geolocationService: GeolocationService
  ) {}

  public ngOnInit(): void {
    this.apiService.getActiveDeliveryByUser()
      .subscribe(data => {
        // delivery_items
        // -> id
        console.log(data);
      });

    this.geolocationService.coords$
    .pipe(filter(coords => coords))
    .subscribe(coords => {
      this.map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=oUjdbMKcBoCEWUC4WnIk',
        center: [coords.longitude, coords.latitude],
        zoom: 12
      });
    });

    // @TODO: Replace by real data.
    // this.activeOrder = {
    //   start: 'A',
    //   end: 'B',
    //   weight: 357,
    //   size: [50, 50],
    //   points: [
    //     {
    //       city: 'Kyiv',
    //       address: 'Random str.'
    //     },
    //     {
    //       city: 'Lviv',
    //       address: 'Random str.'
    //     },
    //     {
    //       city: 'Uzhgorod',
    //       address: 'Random str.',
    //       end: true
    //     }
    //   ]
    // };
  }

  public openMapPage(): void {
    this.router.navigate([ROUTES.MAP]);
  }

  public openOrderPage(): void {
    this.router.navigate([ROUTES.ORDER]);
  }
}
