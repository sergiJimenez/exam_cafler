import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageRoutingModule } from "./home_page-routing.module";
import { HomePageComponent } from "./views/home_page.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableModule } from "@angular/material/table";
@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomePageRoutingModule, SharedModule, MatTableModule],
})
export class HomePageModule {}
