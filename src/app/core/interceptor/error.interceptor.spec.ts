// import { TestBed, inject, fakeAsync, tick } from "@angular/core/testing";
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from "@angular/common/http/testing";
// import {
//   HTTP_INTERCEPTORS,
//   HttpClient,
//   HttpErrorResponse,
// } from "@angular/common/http";
// import { ErrorInterceptor } from "./error.interceptor";
// import { LoaderService } from "../services/loader.service";
// import { MatSnackBar } from "@angular/material/snack-bar";

// describe("ErrorInterceptor", () => {
//   let interceptor: ErrorInterceptor;
// //   let loaderService: LoaderService;
// //   let snackBar: MatSnackBar;
// //   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         ErrorInterceptor,
//         LoaderService,
//         MatSnackBar,
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: ErrorInterceptor,
//           multi: true,
//         },
//       ],
//     });

//     interceptor = TestBed.inject(ErrorInterceptor);
//     loaderService = TestBed.inject(LoaderService);
//     snackBar = TestBed.inject(MatSnackBar);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   it("should be created", () => {
//     expect(interceptor).toBeTruthy();
//   });

//   //   it("should retry request on HTTP error and set loading to false after max retries", fakeAsync(
//   //     inject([HttpClient], (httpClient: HttpClient) => {
//   //       spyOn(loaderService, "setLoading");
//   //       spyOn(snackBar, "open");

//   //       const url = "/some-retry-endpoint";
//   //       httpClient.get(url).subscribe(
//   //         () => {},
//   //         () => {
//   //           expect(loaderService.setLoading).toHaveBeenCalledWith(false);
//   //           expect(snackBar.open).toHaveBeenCalledWith("Retrying...", "Cerrar", {
//   //             duration: 3000,
//   //             panelClass: ["cafler-snackbar"],
//   //           });
//   //         }
//   //       );

//   //       const req = httpMock.expectOne(url);
//   //       req.error(new ErrorEvent("Internal Server Error"), { status: 500 });
//   //       tick(1000);
//   //       httpMock.verify();
//   //     })
//   //   ));

//   //   it("should throw error after max retries", fakeAsync(
//   //     inject([HttpClient], (httpClient: HttpClient) => {
//   //       spyOn(loaderService, "setLoading");
//   //       spyOn(snackBar, "open");

//   //       const url = "/some-retry-endpoint";
//   //       httpClient.get(url).subscribe(
//   //         () => {},
//   //         (error: HttpErrorResponse) => {
//   //           expect(loaderService.setLoading).toHaveBeenCalledWith(false);
//   //           expect(snackBar.open).toHaveBeenCalledWith("Retrying...", "Cerrar", {
//   //             duration: 3000,
//   //             panelClass: ["cafler-snackbar"],
//   //           });
//   //           expect(error.message).toEqual("Ocurrió un error en la solicitud.");
//   //         }
//   //       );

//   //       const req = httpMock.expectOne(url);
//   //       req.error(new ErrorEvent("Internal Server Error"), { status: 500 });

//   //       httpMock.verify();
//   //       tick(5000);
//   //       httpMock.verify();
//   //     })
//   //   ));
// });
