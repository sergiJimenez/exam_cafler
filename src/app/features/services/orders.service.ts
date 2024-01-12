import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getOrders(): Observable<IOrders[]> {
    return this.http
      .get<IOrders[]>(`${environment.BASE_URL}${environment.ORDERS}`)
      .pipe(
        tap((orders) => {
          this.localStorage.setItem("orderList", orders);
        })
      );
  }
}
