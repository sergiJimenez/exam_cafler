import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { OptimizedRoutesService } from "./optimized-routes.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { IRiders } from "src/app/shared/interfaces/riders.interface";

describe("Optimized Routes Service Unit Test", () => {
  let service: OptimizedRoutesService;
  let httpMock: HttpTestingController;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj("LocalStorageService", [
      "getItem",
      "setItem",
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OptimizedRoutesService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(OptimizedRoutesService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  const MOCK_OPTIMIZED_ROUTES: IOptimizedRoutes[] = [
    { routeId: "", driverId: "Driver 1", productsToDeliver: [] },
    { routeId: "", driverId: "Driver 2", productsToDeliver: [] },
    { routeId: "", driverId: "Driver 3", productsToDeliver: [] },
  ];

  afterEach(() => {
    httpMock.verify();
  });

  it("SHOULD be created", () => {
    expect(service).toBeTruthy();
  });

  it("SHOULD return cached routes if available", () => {
    localStorageService.getItem.and.returnValue(MOCK_OPTIMIZED_ROUTES);

    service.getOptimizedRoutes().subscribe((routes) => {
      expect(routes).toEqual(MOCK_OPTIMIZED_ROUTES);
    });

    expect(localStorageService.getItem).toHaveBeenCalledWith("routes");
  });

  it("SHOULD make an HTTP request and store routes in local storage", fakeAsync(() => {
    service.getOptimizedRoutes().subscribe((routes) => {
      expect(routes).toEqual(MOCK_OPTIMIZED_ROUTES);
    });

    const req = httpMock.expectOne(
      `${environment.BASE_URL}${environment.OPTIMIZED_ROUTES}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(MOCK_OPTIMIZED_ROUTES);

    tick();

    expect(localStorageService.setItem).toHaveBeenCalledWith(
      "routes",
      MOCK_OPTIMIZED_ROUTES
    );
  }));

  it("SHOULD get improved routes", () => {
    const orders: IOrders[] = [
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

    const riders: IRiders[] = [
      {
        driverId: "1",
        driverName: "Rider 1",
        initialLocation: { lat: 1, lng: 2 },
      },
      {
        driverId: "2",
        driverName: "Rider 2",
        initialLocation: { lat: 3, lng: 4 },
      },
    ];

    const result = service.getRoutesImproved(orders, riders);

    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBe(true);

    expect(localStorageService.setItem).toHaveBeenCalledWith(
      "routes",
      jasmine.any(Array)
    );
  });

  it("SHOULD calculate distance correctly", () => {
    const lat1 = 1;
    const lng1 = 2;
    const lat2 = 3;
    const lng2 = 4;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (service as any).calculateDistance(lat1, lng1, lat2, lng2);

    expect(result).toBeTruthy();
    expect(typeof result).toBe("number");
  });
});
