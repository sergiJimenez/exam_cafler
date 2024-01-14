import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { DialogComponent } from "./dialog.component";
import { IOptimizedRoutes } from "../../interfaces/optimized-routes.interface";

describe("Dialog Component Unit Test", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const matDialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);
    const localStorageServiceSpy = jasmine.createSpyObj("LocalStorageService", [
      "getItem",
    ]);
    const snackBarSpy = jasmine.createSpyObj("MatSnackBar", ["open"]);

    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      imports: [MatSnackBarModule],
    });

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    localStorageServiceMock = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
    snackBarMock = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    component.data = "mockedOrderId";
  });

  it("SHOULD create", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD initialize with routes from local storage", () => {
    const mockRoutes: IOptimizedRoutes[] = [
      { routeId: "1", driverId: "Driver 1", productsToDeliver: [] },
    ];
    localStorageServiceMock.getItem.and.returnValue(mockRoutes);
    localStorageServiceMock.getItem.and.returnValue(mockRoutes);

    component.ngOnInit();

    expect(component.routes).toEqual(mockRoutes);
  });

  it("SHOULD move order to route", () => {
    const mockOrder = { orderId: "1" };
    const mockFromRoute = {
      routeId: "fromRoute",
      productsToDeliver: [mockOrder],
    };
    const mockToRoute = { routeId: "toRoute", productsToDeliver: [] };

    localStorageServiceMock.getItem.and.returnValue([
      mockFromRoute,
      mockToRoute,
    ]);

    snackBarMock.open.and.callThrough();

    component.moveOrderToRoute(
      mockOrder.orderId,
      mockFromRoute.routeId,
      mockToRoute.routeId
    );

    expect(snackBarMock.open).toHaveBeenCalled();
  });
});
