import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ErrorComponent } from "./error.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AnimationOptions, LottieModule } from "ngx-lottie";
import { playerFactory } from "../../shared.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

describe("Error Component Unit Test", () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [
        MatTooltipModule,
        LottieModule.forRoot({ player: playerFactory }),
        TranslateModule.forRoot(),
      ],
      providers: [TranslateService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("SHOULD create the app", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD display the lottie animation", () => {
    const animationElement = fixture.nativeElement.querySelector("ng-lottie");
    expect(animationElement).toBeTruthy();
  });

  it("SHOULD have correct animation options", () => {
    const expectedOptions: AnimationOptions = {
      path: "../../../../assets/lottie/error.json",
    };
    expect(component.options).toEqual(expectedOptions);
  });
});
