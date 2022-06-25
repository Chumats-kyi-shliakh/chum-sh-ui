import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../constants/routes';
import maplibregl from 'maplibre-gl';
import { GeolocationService } from '../services/geolocation.service';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.less']
})
export class ConfirmationPageComponent {
  public numberOfProducts = 0;
  public totalAmount = 0;
  public totalSizes = [0, 0, 0];
  public totalWeight = 0;
  public numberOfStops = 3;
  public finalAddress = 'Луцьк. Фізкультури, 29';
  public kmLeft = 16.9;
  public addresses: any[] = [];
  public removeProductModal = false;
  public productToRemove: any;

  private map: any;

  constructor(private router: Router, private geolocationService: GeolocationService) {}

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

    this.addresses = [
      {
        address: 'HERZ Ukraine. Random str., 5',
        type: 'RECEIVE',
        products: [
          {
            name: 'Бензопила',
            weight: 15,
            sizes: [50, 100, 40],
            available: 93
          },
          {
            name: 'Бензопила',
            weight: 15,
            sizes: [50, 100, 40],
            available: 93
          }
        ]
      },
      {
        address: 'HERZ Ukraine. Random str., 5',
        type: 'GIVE',
        products: [
          {
            name: 'Бензопила',
            weight: 15,
            sizes: [50, 100, 40],
            available: 93
          },
          {
            name: 'Мотопомпа',
            weight: 15,
            sizes: [735, 535, 565],
            available: 53
          }
        ]
      }
    ];
  }
  
  public openMapPage(): void {
    this.router.navigate([ROUTES.MAP]);
  }

  public openOrderPage(): void {
    this.router.navigate([ROUTES.ORDER]);
  }

  public openRemoveProductModal(product: any): void {
    this.productToRemove = product;
    this.removeProductModal = true;
  }
}
