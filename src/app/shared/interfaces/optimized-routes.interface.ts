import { IOrdersFromRoutes } from "./order-routes.interface";

export interface IOptimizedRoutes {
  routeId: string;
  driverId: string;
  productsToDeliver: IOrdersFromRoutes[];
}
