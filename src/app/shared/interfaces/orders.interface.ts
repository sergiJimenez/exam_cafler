export interface IOrders {
  orderId: string;
  productName: string;
  price: number;
  deliveryLocation: {
    latitude: number;
    longitude: number;
  };
}
