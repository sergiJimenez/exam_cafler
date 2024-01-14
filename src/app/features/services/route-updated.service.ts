import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RouteUpdatedService {
  constructor(private http: HttpClient) {}

  public postRouteUpdated(
    routesUpdates: IOptimizedRoutes
  ): Observable<IOptimizedRoutes> {
    return this.http.post<IOptimizedRoutes>(
      `${environment.BASE_URL}${environment.ROUTE_UPDATED}`,
      routesUpdates
    );
  }
}
