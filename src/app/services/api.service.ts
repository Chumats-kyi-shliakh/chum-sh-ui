import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
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
            storageFeatures: data.storages.features,
            storage_ids: data.storages.features.map((storage: any) => storage.properties.storage_id),
            numberOfClosestOrders: data.customer_orders.features.length,
            closestOrders: data.customer_orders.features.map((item: any) => {
              return <any>{
                address: item.properties.address,
                order_id: item.properties.order_id,
                storage_ids: item.properties.store_id
              };
            })
          };
        }),
        switchMap(data => {
          return forkJoin(
            data.closestOrders.map((item: any) => this.getCartItemsForOrder(item.order_id))
          ).pipe(map((array: any) => {
            data.closestOrders.forEach((item: any, i: number) => {
              item = {
                ...item,
                products: array[i],
                product_ids: array[i].map((e: any) => e.product.id)
              }
            });
            return data;
          }));
        }),
        switchMap(data => {
          return forkJoin(
            data.storage_ids.map((item: any) => this.getProductAvailabilities(item))
          ).pipe(map((array: any) => {
            data.storageFeatures.forEach((feature: any, i: number) => {
              feature = {
                ...feature,
                products: array[i],
                product_ids: array[i].map((e: any) => e.product.id)
              }
            });
            console.log(data.closestOrders, data.storageFeatures);
            data.closestOrders.forEach((order: any) => {
              const products: any[] = [];
              data.storageFeatures
              .filter((feature: any) => feature.properties.storage_id === order.storage_ids)
              .forEach((storage: any) => {
                storage.properties.product_ids.forEach((product_id: any) => {
                  if (order.properties.product_id.includes(product_id)) {
                    const tempProduct = storage.products.find((product: any) => product.product.id === product_id);
                    products.push({
                      name: tempProduct.product.name,
                      weight: tempProduct.product.weight,
                      sizes: [tempProduct.product.length, tempProduct.product.height, tempProduct.product.width],
                      quantity: tempProduct.quantity,
                      order_id: order.order_id,
                      storage_id: storage.properties.storage_id,
                      product_id,
                      address: storage.properties.address,
                      distanceFromYou: storage.properties.dist_m
                    });
                  }
                });
              });
              order.products = products;
            });
            return data;
          }));
        })
      );
  }

  public sendCurrentGeolocation(payload: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, payload);
  }

  public getCartItemsForOrder(order_id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}customers/${order_id}/cart_items`);
  }

  public getProductAvailabilities(storage_id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}storages/${storage_id}/product_availabilities`);
  }
}
