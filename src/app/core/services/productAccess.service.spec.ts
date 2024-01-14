import { TestBed } from "@angular/core/testing";
import { ProductAccessService } from "./productAccess.service";

describe("Product Access Service Unit Test", () => {
  let productAccessService: ProductAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductAccessService],
    });

    productAccessService = TestBed.inject(ProductAccessService);
  });

  it("SHOULD be created", () => {
    expect(productAccessService).toBeTruthy();
  });

  it("SHOULD initially not allow access", () => {
    const canAccess = productAccessService.canAccess();

    expect(canAccess).toBeFalse();
  });

  it("SHOULD allow access", () => {
    productAccessService.allowAccess();

    const canAccess = productAccessService.canAccess();

    expect(canAccess).toBeTrue();
  });
});
