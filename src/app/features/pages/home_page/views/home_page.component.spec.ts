import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { HomePageComponent } from "./home_page.component";
import { OrdersService } from "src/app/features/services/orders.service";
import { ProductAccessService } from "src/app/core/services/productAccess.service";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { TranslateModule } from "@ngx-translate/core";

describe("Home Page Component Unit Test", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let ordersServiceMock: jasmine.SpyObj<OrdersService>;
  let productAccessServiceMock: jasmine.SpyObj<ProductAccessService>;

  beforeEach(() => {
    const ordersServiceSpy = jasmine.createSpyObj("OrdersService", [
      "getOrders",
    ]);
    const productAccessServiceSpy = jasmine.createSpyObj(
      "ProductAccessService",
      ["allowAccess"]
    );

    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: OrdersService, useValue: ordersServiceSpy },
        { provide: ProductAccessService, useValue: productAccessServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    ordersServiceMock = TestBed.inject(
      OrdersService
    ) as jasmine.SpyObj<OrdersService>;
    productAccessServiceMock = TestBed.inject(
      ProductAccessService
    ) as jasmine.SpyObj<ProductAccessService>;
  });

  it("SHOULD create", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD load orders on init", () => {
    const mockOrders: IOrders[] = [
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

    ordersServiceMock.getOrders.and.returnValue(of(mockOrders));

    fixture.detectChanges();

    expect(ordersServiceMock.getOrders).toHaveBeenCalled();
    expect(component.orders$).toBeDefined();
  });

  it("SHOULD allow access", () => {
    component.allowAccess();

    expect(productAccessServiceMock.allowAccess).toHaveBeenCalled();
  });
});
