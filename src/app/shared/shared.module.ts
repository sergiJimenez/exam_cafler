import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./components/header/header.component";
import { ErrorComponent } from "./views/error/error.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [HeaderComponent, ErrorComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [HeaderComponent, TranslateModule],
})
export class SharedModule {}
