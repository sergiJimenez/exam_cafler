import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { RoutesConst } from "src/app/core/constants/routes";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  public pages: { name: string; route: string }[] = [
    { name: "navItem1", route: RoutesConst.HOME }
  ];

  constructor(public translate: TranslateService) {
    translate.addLangs(["es", "cat", "eusk", "en", "fr", "it"]);

    if (localStorage.getItem("LocalLanguage")) {
      translate.setDefaultLang(localStorage.getItem("LocalLanguage") || "[]");
      translate.use(localStorage.getItem("LocalLanguage") || "[]");
    } else {
      const browserLang = translate.getBrowserLang();
      translate.setDefaultLang(browserLang || "[]");
      translate.use(browserLang?.match(/es|en/) ? browserLang : "es");
      localStorage.setItem("LocalLanguage", browserLang || "[]");
    }
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
