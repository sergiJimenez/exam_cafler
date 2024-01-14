import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("Header Component Unit Test", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateServiceMock: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const translateSpy = jasmine.createSpyObj("TranslateService", [
      "addLangs",
      "setDefaultLang",
      "use",
      "getBrowserLang",
      "getLangs",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [{ provide: TranslateService, useValue: translateSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateServiceMock = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
  });

  it("SHOULD create", () => {
    expect(component).toBeTruthy();
  });

  it("SHOULD switch language", () => {
    const lang = "fr";

    component.switchLanguage(lang);

    expect(translateServiceMock.use).toHaveBeenCalledWith(lang);
  });

  it("SHOULD toggle dark theme", () => {
    spyOn(document.body.classList, "toggle");

    component.toggleDarkTheme();

    expect(document.body.classList.toggle).toHaveBeenCalledWith("dark-theme");
    expect(component.isDarkThemeOn()).toBe(true);

    // Toggle it again
    component.toggleDarkTheme();

    expect(document.body.classList.toggle).toHaveBeenCalledWith("dark-theme");
    expect(component.isDarkThemeOn()).toBe(false);
  });
});
