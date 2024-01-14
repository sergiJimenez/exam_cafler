import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./components/header/header.component";
import { ErrorComponent } from "./views/error/error.component";
import { RouterModule } from "@angular/router";
import { DialogComponent } from "./components/dialog/dialog.component";
import { MaterialModule } from "./material.module";
import { LottieModule } from "ngx-lottie";

export function playerFactory(): any {
  return import("lottie-web");
}

@NgModule({
  declarations: [HeaderComponent, ErrorComponent, DialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MaterialModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [HeaderComponent, TranslateModule, DialogComponent, MaterialModule],
})
export class SharedModule {}
