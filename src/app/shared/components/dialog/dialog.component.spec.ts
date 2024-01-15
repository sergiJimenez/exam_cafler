import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogComponent } from "./dialog.component";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

describe("DialogComponent", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        LocalStorageService,
        MatSnackBar,
      ],
    });

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("SHOULD create", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD initialize routes", () => {
    const mockLocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(mockLocalStorageService, "getItem").and.returnValue([
      { routeId: "1", productsToDeliver: [] },
      { routeId: "2", productsToDeliver: [] },
    ]);

    component.data = { orderId: "123", fromRoute: "2" };
    component.ngOnInit();

    expect(component.routes.length).toBe(1);
  });

  it("SHOULD move order to route", () => {
    const orderId = "123";
    const fromRouteId = "1";
    const toRouteId = "2";

    const mockLocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(mockLocalStorageService, "getItem").and.returnValue([
      { routeId: fromRouteId, productsToDeliver: [{ orderId }] },
      { routeId: toRouteId, productsToDeliver: [] },
    ]);

    spyOn(localStorage, "setItem");

    component.moveOrderToRoute(orderId, fromRouteId, toRouteId);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("SHOULD handle destination route not found", () => {
    spyOn(component, "openSnackBar");
    const orderId = "123";
    const fromRouteId = "1";
    const toRouteId = "2";

    const mockLocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(mockLocalStorageService, "getItem").and.returnValue([
      { routeId: fromRouteId, productsToDeliver: [{ orderId }] },
    ]);

    component.moveOrderToRoute(orderId, fromRouteId, toRouteId);

    expect(component.openSnackBar).toHaveBeenCalledWith(
      "Ruta de destino no encontrada"
    );
  });

  it("SHOULD handle source route not found", () => {
    spyOn(component, "openSnackBar");
    const orderId = "123";
    const fromRouteId = "1";
    const toRouteId = "2";

    const mockLocalStorageService = TestBed.inject(LocalStorageService);
    spyOn(mockLocalStorageService, "getItem").and.returnValue([
      { routeId: toRouteId, productsToDeliver: [] },
    ]);

    component.moveOrderToRoute(orderId, fromRouteId, toRouteId);

    expect(component.openSnackBar).toHaveBeenCalledWith(
      "Ruta de origen no encontrada"
    );
  });
});
