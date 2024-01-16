import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RouteUpdatedService } from "./route-updated.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { environment } from "src/environments/environment";

describe("Route Updated Service Unit Test", () => {
  let service: RouteUpdatedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RouteUpdatedService],
    });

    service = TestBed.inject(RouteUpdatedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  const MOCK_ROUTES_UPDATES: IOptimizedRoutes = {
    routeId: "",
    driverId: "Driver 1",
    productsToDeliver: [],
  };

  afterEach(() => {
    httpMock.verify();
  });

  it("SHOULD be created", () => {
    expect(service).toBeTruthy();
  });

  it("SHOULD make a POST request to update routes", () => {
    service.postRouteUpdated(MOCK_ROUTES_UPDATES).subscribe((response) => {
      expect(response).toEqual(MOCK_ROUTES_UPDATES);
    });

    const req = httpMock.expectOne(
      `${environment.BASE_URL}${environment.ROUTE_UPDATED}`
    );
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(MOCK_ROUTES_UPDATES);

    req.flush(MOCK_ROUTES_UPDATES);
  });
});
