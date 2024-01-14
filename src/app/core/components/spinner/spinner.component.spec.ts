// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { LoaderService } from "../../services/loader.service";
// import { SpinnerComponent } from "./spinner.component";

// describe("Loading spinner unit test", () => {
//   let component: SpinnerComponent;
//   let fixture: ComponentFixture<SpinnerComponent>;
//   let loaderServiceStub: jasmine.SpyObj<LoaderService>;

//   beforeEach(() => {
//     loaderServiceStub = jasmine.createSpyObj("LoaderService", [
//       "getLoading",
//       "setLoading",
//     ]);
//     loaderServiceStub.getLoading.and.returnValue(false);

//     TestBed.configureTestingModule({
//       declarations: [SpinnerComponent],
//       providers: [{ provide: LoaderService, useValue: loaderServiceStub }],
//     });

//     fixture = TestBed.createComponent(SpinnerComponent);
//     component = fixture.componentInstance;
//   });

//   it("SHOULD create", () => {
//     expect(component).toBeTruthy();
//   });

//   it("SHOULD display spinner when loading is true", () => {
//     loaderServiceStub.getLoading.and.returnValue(true);
//     fixture.detectChanges();

//     const spinnerElement =
//       fixture.nativeElement.querySelector(".cssload-container");
//     expect(spinnerElement).toBeTruthy();
//   });

//   it("SHOULD not display spinner when loading is false", () => {
//     loaderServiceStub.getLoading.and.returnValue(false);
//     fixture.detectChanges();

//     const spinnerElement =
//       fixture.nativeElement.querySelector(".cssload-container");
//     expect(spinnerElement).toBeFalsy();
//   });

//   it("SHOULD call setLoading method on loader service", () => {
//     loaderServiceStub.getLoading.and.returnValue(true);
//     fixture.detectChanges();

//     expect(loaderServiceStub.setLoading).toHaveBeenCalledWith(true);
//   });
// });
