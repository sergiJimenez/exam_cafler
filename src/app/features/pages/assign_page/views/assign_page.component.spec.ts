import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { AssignPageComponent } from "./assign_page.component";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { OptimizedRoutesService } from "src/app/features/services/optimized-routes.service";
import { RidersService } from "src/app/features/services/riders.service";
import { RouteUpdatedService } from "src/app/features/services/route-updated.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ProductNamePipe } from "src/app/shared/pipes/productName.pipe";
import { RidersNamePipe } from "src/app/shared/pipes/ridersName.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";

class LocationService {
  public reload(): void {
    location.reload();
  }
}

describe("Assign Page Component Unit Test", () => {
  let component: AssignPageComponent;
  let fixture: ComponentFixture<AssignPageComponent>;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;
  let optimizedRoutesServiceMock: jasmine.SpyObj<OptimizedRoutesService>;
  let ridersServiceMock: jasmine.SpyObj<RidersService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj("LocalStorageService", [
      "getItem",
      "removeItem",
    ]);

    const optimizedRoutesSpy = jasmine.createSpyObj("OptimizedRoutesService", [
      "getOptimizedRoutes",
      "getRoutesImproved",
    ]);

    const ridersServiceSpy = jasmine.createSpyObj("RidersService", [
      "getRiders",
    ]);

    const routeUpdatedServiceSpy = jasmine.createSpyObj("RouteUpdatedService", [
      "postRouteUpdated",
    ]);

    const matDialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);

    const locationServiceSpy = jasmine.createSpyObj("LocationService", [
      "reload",
    ]);

    TestBed.configureTestingModule({
      declarations: [AssignPageComponent, ProductNamePipe, RidersNamePipe],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatTooltipModule,
        MatDividerModule,
      ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: OptimizedRoutesService, useValue: optimizedRoutesSpy },
        { provide: RidersService, useValue: ridersServiceSpy },
        { provide: RouteUpdatedService, useValue: routeUpdatedServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: LocationService, useValue: locationServiceSpy },
        TranslateService,
      ],
    });

    fixture = TestBed.createComponent(AssignPageComponent);
    component = fixture.componentInstance;
    localStorageServiceMock = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
    optimizedRoutesServiceMock = TestBed.inject(
      OptimizedRoutesService
    ) as jasmine.SpyObj<OptimizedRoutesService>;
    ridersServiceMock = TestBed.inject(
      RidersService
    ) as jasmine.SpyObj<RidersService>;

    const mockOptimizedRoutes: IOptimizedRoutes[] = [
      { routeId: "1", driverId: "Driver 1", productsToDeliver: [] },
      { routeId: "2", driverId: "Driver 2", productsToDeliver: [] },
    ];

    const mockRiders: IRiders[] = [
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

    localStorageServiceMock.getItem.and.returnValue(mockOptimizedRoutes);
    optimizedRoutesServiceMock.getOptimizedRoutes.and.returnValue(
      of(mockOptimizedRoutes)
    );
    ridersServiceMock.getRiders.and.returnValue(of(mockRiders));
  });

  it("SHOULD create", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD load optimized routes and riders on init", () => {
    fixture.detectChanges();
    expect(localStorageServiceMock.getItem).toHaveBeenCalledWith("riderList");
    expect(optimizedRoutesServiceMock.getOptimizedRoutes).toHaveBeenCalled();
    expect(ridersServiceMock.getRiders).toHaveBeenCalled();
  });

  it("SHOULD change to improved routes", () => {
    component.changeToImprovedRoutes();
    expect(component.optimizedRoutes$).toBeTruthy();
  });
});
