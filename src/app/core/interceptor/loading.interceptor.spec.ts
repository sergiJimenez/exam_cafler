import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { LoadingInterceptor } from "./loading.interceptor";
import { LoaderService } from "../services/loader.service";

describe("Loading Interceptor Unit Test", () => {
  let interceptor: LoadingInterceptor;
  let loaderService: LoaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoadingInterceptor,
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(LoadingInterceptor);
    loaderService = TestBed.inject(LoaderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("SHOULD be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("SHOULD set loading to true on request", inject(
    [HttpClient],
    (httpClient: HttpClient) => {
      spyOn(loaderService, "setLoading");
      const url = "/some-api-endpoint";
      httpClient.get(url).subscribe(() => {
        expect(loaderService.setLoading).toHaveBeenCalledWith(true);
      });

      const req = httpMock.expectOne(url);
      req.flush({});
      httpMock.verify();
    }
  ));
});
