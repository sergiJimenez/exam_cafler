import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(["es", "cat", "en", "fr", "it"]);

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

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
