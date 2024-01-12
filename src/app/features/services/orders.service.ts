import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrders[]> {
    return this.http.get<IOrders[]>(
      `${environment.BASE_URL}${environment.ORDERS}`
    );
  }

  getOrdersId(id: string): Observable<IOrders | undefined> {
    return this.http
      .get<IOrders[]>(`${environment.BASE_URL}${environment.ORDERS}`)
      .pipe(map((orders) => orders.find((order) => order.orderId === id)));
  }
}
