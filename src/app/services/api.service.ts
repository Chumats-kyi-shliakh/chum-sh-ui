import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { GEO } from "../order-page/geo";

@Injectable()
export class ApiService {
  public BASE_URL = 'https://chum-shlakh-rails-test.herokuapp.com/api/v1/';

  constructor(private http: HttpClient) {}

  public getActiveDeliveryByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}deliveries?login=test-driver-0`)
      .pipe(map(data => data?.find(item => item.status === 'active') || {}));
  }

  public getOrdersAndStorages(): Observable<any> {
    return of(GEO)
      .pipe(
        map(data => {
          return {
            numberOfClosestOrders: data.customer_orders.features.length,
            closestOrders: data.customer_orders.features.map((item: any) => {
              const storages = data.storages.features.filter(storage => {
                return item.properties.store_id.includes(storage.properties.storage_id);
              });
              const products: any[] = [];
              storages.forEach(storage => {
                storage.properties.product_id.forEach(product_id => {
                  if (item.properties.product_id.includes(product_id)) {
                    products.push({
                      order_id: item.order_id,
                      storage_id: storage.properties.storage_id,
                      product_id,
                      address: storage.properties.address,
                      distanceFromYou: Math.round(storage.properties.dist_m * 10) / 10
                    });
                  }
                });
              });
              return {
                address: item.address,
                products
              };
            })
          };
        })
      );
  }
}
