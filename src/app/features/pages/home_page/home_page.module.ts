import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageRoutingModule } from "./home_page-routing.module";
import { HomePageComponent } from "./views/home_page.component";

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomePageRoutingModule],
})
export class HomePageModule {}
