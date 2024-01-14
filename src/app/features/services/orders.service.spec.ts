import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { OrdersService } from "./orders.service";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

describe("Orders Service Unit Test", () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj("LocalStorageService", [
      "setItem",
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrdersService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  const MOCK_ORDERS: IOrders[] = [
    {
      orderId: "1",
      productName: "Product 1",
      price: 10,
      deliveryLocation: { longitude: 1, latitude: 2 },
    },
    {
      orderId: "2",
      productName: "Product 2",
      price: 20,
      deliveryLocation: { longitude: 1, latitude: 2 },
    },
  ];

  afterEach(() => {
    httpMock.verify();
  });

  it("SHOULD be created", () => {
    expect(service).toBeTruthy();
  });

  it("SHOULD make an HTTP request and store orders in local storage", fakeAsync(() => {
    service.getOrders().subscribe((orders) => {
      expect(orders).toEqual(MOCK_ORDERS);
    });

    const req = httpMock.expectOne(
      `${environment.BASE_URL}${environment.ORDERS}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(MOCK_ORDERS);

    tick();

    expect(localStorageService.setItem).toHaveBeenCalledWith(
      "orderList",
      MOCK_ORDERS
    );
  }));
});
