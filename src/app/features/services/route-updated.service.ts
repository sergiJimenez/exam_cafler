import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IRouteUpdated } from "src/app/shared/interfaces/route-updated.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RouteUpdatedService {
  constructor(private http: HttpClient) {}

  postRouteUpdated(): Observable<IRouteUpdated> {
    return this.http.get<IRouteUpdated>(
      `${environment.BASE_URL}${environment.ROUTE_UPDATED}`
    );
  }
}
