import { TestBed } from "@angular/core/testing";
import { LoaderService } from "./loader.service";

describe("Loader Service Unit Test", () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });

    loaderService = TestBed.inject(LoaderService);
  });

  it("SHOULD be created", () => {
    expect(loaderService).toBeTruthy();
  });

  it("SHOULD set loading to true", () => {
    loaderService.setLoading(true);
    expect(loaderService.getLoading()).toBe(true);
  });

  it("SHOULD set loading to false", () => {
    loaderService.setLoading(false);
    expect(loaderService.getLoading()).toBe(false);
  });

  it("SHOULD set loading to true and then false", () => {
    loaderService.setLoading(true);
    expect(loaderService.getLoading()).toBe(true);

    loaderService.setLoading(false);
    expect(loaderService.getLoading()).toBe(false);
  });
});
