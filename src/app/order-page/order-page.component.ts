import { Component } from '@angular/core';
import { Router } from '@angular/router';
import maplibregl from 'maplibre-gl';
import { GEO } from './geo';

import { ROUTES } from '../constants/routes';
import { GeolocationService } from '../services/geolocation.service';
import { filter } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.less']
})
export class OrderPageComponent {
  public numberOfClosestOrders = 0;
  public closestOrders: any[] = [];
  public productWasChoosenModal = false;
  public unsavedChangesModal = false;
  public totalAmount = 0;
  public totalSizes = [0, 0];
  public totalWeight = 0;

  private map: any;
  private cart: any = {
    storage_ids: [],
    order_ids: []
  };

  constructor(private router: Router, private geolocationService: GeolocationService, private apiService: ApiService) {}

  public ngOnInit(): void {
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

    this.apiService.getOrdersAndStorages()
    .subscribe(data => {
      this.closestOrders = data.closestOrders;
      this.numberOfClosestOrders = data.numberOfClosestOrders;
    });

    // this.closestOrders = [
    //   {
    //     address: 'HERZ Ukraine. Random str., 5',
    //     products: [
    //       {
    //         name: 'Бензопила',
    //         weight: 15,
    //         sizes: [50, 100, 40],
    //         available: 93,
    //         store: 'Петропавловская Борщаговка (Киево-Святошинский р-н Киевской области)',
    //         totalDistance: 49,
    //         distanceFromYou: 1.8,
    //         maximumAvailable: 15
    //       },
    //       {
    //         name: 'Мотопомпа',
    //         weight: 15,
    //         sizes: [735, 535, 565],
    //         available: 53,
    //         store: 'Петропавловская Борщаговка (Киево-Святошинский р-н Киевской области)',
    //         totalDistance: 49,
    //         distanceFromYou: 1.8,
    //         maximumAvailable: 15
    //       }
    //     ]
    //   },
    //   {
    //     address: 'HERZ Ukraine. Random str., 5',
    //     products: [
    //       {
    //         name: 'Бензопила',
    //         weight: 15,
    //         sizes: [50, 100, 40],
    //         available: 93,
    //         store: 'Петропавловская Борщаговка (Киево-Святошинский р-н Киевской области)',
    //         totalDistance: 49,
    //         distanceFromYou: 1.8,
    //         maximumAvailable: 15
    //       },
    //       {
    //         name: 'Мотопомпа',
    //         weight: 15,
    //         sizes: [735, 535, 565],
    //         available: 53,
    //         store: 'Петропавловская Борщаговка (Киево-Святошинский р-н Киевской области)',
    //         totalDistance: 49,
    //         distanceFromYou: 1.8,
    //         maximumAvailable: 15
    //       }
    //     ]
    //   }
    // ];
  }

  public addToCart(event: any): void {
    this.cart.storage_ids.push(event.product.storage_id);
    this.cart.order_ids.push(event.product.order_id);
  }

  public calculateRoute(): void {
    const payload = {
      longitude: this.geolocationService.coords$.getValue().longitude,
      latitude: this.geolocationService.coords$.getValue().latitude,
      storage_ids: [...new Set(this.cart.storage_ids)],
      order_ids: [...new Set(this.cart.order_ids)]
    };
    this.apiService.sendCurrentGeolocation(payload).subscribe(() => {
      this.router.navigate([ROUTES.CONFIRMATION]);
    });
  }
}
