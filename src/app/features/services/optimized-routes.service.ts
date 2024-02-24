import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { IOrders } from "src/app/shared/interfaces/orders.interface";

@Injectable({
  providedIn: "root",
})
export class OptimizedRoutesService {
  constructor(
    private http: HttpClient,
    private ls: LocalStorageService
  ) {}

  public getOptimizedRoutes(): Observable<IOptimizedRoutes[]> {
    const cachedRoutes = this.ls.getItem("routes") as IOptimizedRoutes[];

    if (cachedRoutes && cachedRoutes.length > 0) {
      return of(cachedRoutes);
    } else {
      return this.http
        .get<IOptimizedRoutes[]>(
          `${environment.BASE_URL}${environment.OPTIMIZED_ROUTES}`
        )
        .pipe(tap((res) => this.ls.setItem("routes", res)));
    }
  }

  public getRoutesImproved(
    orders: IOrders[],
    riders: IRiders[]
  ): IOptimizedRoutes[] {
    const sortedRiders = [...riders];
    sortedRiders.sort((a, b) => {
      const distanceA = this.calculateDistance(
        orders[0].deliveryLocation.latitude,
        orders[0].deliveryLocation.longitude,
        a.initialLocation.lat,
        a.initialLocation.lng
      );
      const distanceB = this.calculateDistance(
        orders[0].deliveryLocation.latitude,
        orders[0].deliveryLocation.longitude,
        b.initialLocation.lat,
        b.initialLocation.lng
      );
      return distanceA - distanceB;
    });

    const optimizedRoutes: IOptimizedRoutes[] = [];

    orders.forEach((order, orderIndex) => {
      const riderIndex = orderIndex % sortedRiders.length;
      const rider = sortedRiders[riderIndex];

      const existingRoute = optimizedRoutes.find(
        (route) => route.driverId === rider.driverId
      );

      if (existingRoute) {
        existingRoute.productsToDeliver.push({ orderId: order.orderId });
      } else {
        optimizedRoutes.push({
          routeId: `${optimizedRoutes.length + 1}`,
          driverId: rider.driverId,
          productsToDeliver: [{ orderId: order.orderId }],
        });
      }
    });
    this.ls.setItem("routes", optimizedRoutes);
    return optimizedRoutes;
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lng1 - lng2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
  }
}
