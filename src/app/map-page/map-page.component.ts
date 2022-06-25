import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { filter } from 'rxjs/operators';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.less']
})
export class MapPageComponent implements OnInit {
  public nextPoint: any;
  public isCloseToDestination = true;
  public continuePathModal = false;
  public completePathModal = false;
  public furtherPoints: any[] = [];

  private map: any;

  constructor(private geolocationService: GeolocationService) {}

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

    this.nextPoint = {
      isLastPoint: true,
      type: 'RECEIVE',
      address: 'Київ. Князя Костянтина Острозького 136/189',
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
    };

    this.furtherPoints = [{...this.nextPoint}, {...this.nextPoint}];
  }

  public openContinuePathModal(): void {
    this.continuePathModal = true;
  }

  public openCompletePathModal(): void {
    this.completePathModal = true;
  }
}
