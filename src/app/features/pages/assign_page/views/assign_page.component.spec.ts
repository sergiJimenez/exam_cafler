import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { of } from "rxjs";
import { AssignPageComponent } from "./assign_page.component";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { OptimizedRoutesService } from "src/app/features/services/optimized-routes.service";
import { RidersService } from "src/app/features/services/riders.service";
import { RouteUpdatedService } from "src/app/features/services/route-updated.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ProductNamePipe } from "src/app/shared/pipes/productName.pipe";
import { RidersNamePipe } from "src/app/shared/pipes/ridersName.pipe";

describe("Assign Page Component Unit Test", () => {
  let component: AssignPageComponent;
  let fixture: ComponentFixture<AssignPageComponent>;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;
  let optimizedRoutesServiceMock: jasmine.SpyObj<OptimizedRoutesService>;
  let ridersServiceMock: jasmine.SpyObj<RidersService>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj("LocalStorageService", [
      "getItem",
      "removeItem",
    ]);

    const optimizedRoutesSpy = jasmine.createSpyObj("OptimizedRoutesService", [
      "getOptimizedRoutes",
    ]);

    const ridersServiceSpy = jasmine.createSpyObj("RidersService", [
      "getRiders",
    ]);

    const routeUpdatedServiceSpy = jasmine.createSpyObj("RouteUpdatedService", [
      "postRouteUpdated",
    ]);

    const matDialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);

    TestBed.configureTestingModule({
      declarations: [AssignPageComponent, ProductNamePipe, RidersNamePipe],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: OptimizedRoutesService, useValue: optimizedRoutesSpy },
        { provide: RidersService, useValue: ridersServiceSpy },
        { provide: RouteUpdatedService, useValue: routeUpdatedServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
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
    matDialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

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

  it("SHOULD open dialog and reload optimized routes on dialog close", fakeAsync(() => {
    fixture.detectChanges();
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(undefined),
    } as MatDialogRef<unknown, unknown>);

    component.openDialog("1");

    tick();

    expect(matDialogMock.open).toHaveBeenCalledWith(DialogComponent, {
      width: "250px",
      height: "250px",
      data: "1",
    });

    expect(optimizedRoutesServiceMock.getOptimizedRoutes).toHaveBeenCalled();
  }));
});
