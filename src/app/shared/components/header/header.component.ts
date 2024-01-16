import { Component, computed, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { RoutesConst } from "src/app/core/constants/routes";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  public isDarkThemeOn = signal(false);
  public icon = computed(() =>
    this.isDarkThemeOn() ? "light_mode" : "dark_mode"
  );

  constructor(public translate: TranslateService) {
    translate.addLangs(["es", "cat", "eusk", "en", "fr", "it"]);

    if (localStorage.getItem("locale")) {
      translate.setDefaultLang(localStorage.getItem("locale") || "[]");
      translate.use(localStorage.getItem("locale") || "[]");
    } else {
      const browserLang = translate.getBrowserLang();
      translate.setDefaultLang(browserLang || "[]");
      translate.use(browserLang?.match(/es|en/) ? browserLang : "es");
      localStorage.setItem("locale", browserLang || "[]");
    }
  }

  public pages: { name: string; route: string }[] = [
    { name: "navItem1", route: RoutesConst.HOME },
  ];

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}