import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class GeolocationService {
  public coords$: BehaviorSubject<any> = new BehaviorSubject(null);
}
