import { Pipe, PipeTransform } from "@angular/core";
import { IOrders } from "../interfaces/orders.interface";

@Pipe({
  name: "productName",
})
export class ProductNamePipe implements PipeTransform {
  transform(orderId: string | IOrders): string {
    if (typeof orderId === "string") {
      return orderId;
    } else if (orderId && orderId.productName) {
      return orderId.productName;
    } else {
      return "Sin Nombre";
    }
  }
}
