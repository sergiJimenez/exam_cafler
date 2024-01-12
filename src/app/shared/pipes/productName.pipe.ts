import { Pipe, PipeTransform } from "@angular/core";
import { IOrders } from "../interfaces/orders.interface";

@Pipe({
  name: "productName",
})
export class ProductNamePipe implements PipeTransform {
  transform(orderId: string | IOrders, orderArray: IOrders[]): string {
    if (typeof orderId === "string") {
      return (
        (orderArray.find((element: IOrders) => element.orderId === orderId)
          ?.productName as string) || "noProductName"
      );
    } else if (orderId && orderId.productName) {
      return orderId.productName;
    } else {
      return "noProductName";
    }
  }
}
