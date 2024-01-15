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
  ): Map<string, string> {
    const asignaciones: Map<string, string> = new Map();

    orders.forEach((order) => {
      let distanciaMinima = Number.MAX_VALUE;
      let riderAsignado = "";

      riders.forEach((rider) => {
        const distancia = this.calculateDistance(
          order.deliveryLocation.latitude,
          order.deliveryLocation.longitude,
          rider.initialLocation.lat,
          rider.initialLocation.lng
        );

        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          riderAsignado = rider.driverId;
        }
      });

      asignaciones.set(order.orderId, riderAsignado);
    });

    return asignaciones;
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    // Esta función calcula la distancia entre dos puntos utilizando la fórmula de Haversine
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
