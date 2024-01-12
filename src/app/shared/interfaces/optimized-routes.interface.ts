import { IOrders } from "./orders.interface";

export interface IOptimizedRoutes extends IOrders {
  routeId: string;
  driverId: string;
  productsToDeliver: [
    {
      orderId: IOrders;
    },
  ];
}
