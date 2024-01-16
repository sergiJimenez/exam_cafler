import { TestBed } from "@angular/core/testing";
import { ProductNamePipe } from "./productName.pipe";
import { IOrders } from "../interfaces/orders.interface";

describe("ProductName Pipe Unit Test", () => {
  let pipe: ProductNamePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductNamePipe],
    });
    pipe = TestBed.inject(ProductNamePipe);
  });

  it("SHOULD create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("SHOULD return product name when orderId is a string", () => {
    const orderId = "123";
    const orderArray: IOrders[] = [
      {
        orderId: "1",
        productName: "Product 1",
        price: 10,
        deliveryLocation: { longitude: 1, latitude: 2 },
      },
    ];

    const result = pipe.transform(orderId, orderArray);

    expect(result).toBe("noProductName");
  });

  it("SHOULD return noProductName when orderId is a string and not found in orderArray", () => {
    const orderId = "789";
    const orderArray: IOrders[] = [
      {
        orderId: "1",
        productName: "Product 1",
        price: 10,
        deliveryLocation: { longitude: 1, latitude: 2 },
      },
    ];

    const result = pipe.transform(orderId, orderArray);

    expect(result).toBe("noProductName");
  });

  it("SHOULD return product name when orderId is an IOrders object with productName", () => {
    const order: IOrders = {
      orderId: "1",
      productName: "Product 1",
      price: 10,
      deliveryLocation: { longitude: 1, latitude: 2 },
    };

    const result = pipe.transform(order, []);

    expect(result).toBe("Product 1");
  });

  it("SHOULD return noProductName when orderId is an IOrders object without productName", () => {
    const order: IOrders = {
      orderId: "1",
      productName: "Product 1",
      price: 10,
      deliveryLocation: { longitude: 1, latitude: 2 },
    };

    const result = pipe.transform(order, []);

    expect(result).toBe("Product 1");
  });
});
