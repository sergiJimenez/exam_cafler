import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignPageRoutingModule } from "./assign_page-routing.module";
import { AssignPageComponent } from "./views/assign_page.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductNamePipe } from "src/app/shared/pipes/productName.pipe";
import { RidersNamePipe } from "src/app/shared/pipes/ridersName.pipe";

@NgModule({
  declarations: [AssignPageComponent, ProductNamePipe, RidersNamePipe],
  imports: [CommonModule, AssignPageRoutingModule, SharedModule],
})
export class AssignPageModule {}
