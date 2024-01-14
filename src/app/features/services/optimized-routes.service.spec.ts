import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { OptimizedRoutesService } from "./optimized-routes.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

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
});
