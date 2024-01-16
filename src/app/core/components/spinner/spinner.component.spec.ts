import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SpinnerComponent } from "./spinner.component";

describe("Loader Component Unit Test", () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    });

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
  });

  it("SHOULD create the loader component", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD show the loader when loading is true", () => {
    component.loader.setLoading(true);
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(
      By.css(".cssload-container")
    );
    expect(loaderElement).toBeTruthy();

    const spinnerElement = fixture.debugElement.query(
      By.css(".cssload-speeding-wheel")
    );
    expect(spinnerElement).toBeTruthy();
  });

  it("SHOULD hide the loader when loading is false", () => {
    component.loader.setLoading(false);
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(
      By.css(".cssload-container")
    );
    expect(loaderElement).toBeNull();

    const spinnerElement = fixture.debugElement.query(
      By.css(".cssload-speeding-wheel")
    );
    expect(spinnerElement).toBeNull();
  });
});
