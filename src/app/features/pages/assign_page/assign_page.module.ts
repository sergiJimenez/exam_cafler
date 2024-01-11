import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignPageRoutingModule } from "./assign_page-routing.module";
import { AssignPageComponent } from "./views/assign_page.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [AssignPageComponent],
  imports: [CommonModule, AssignPageRoutingModule, SharedModule],
})
export class AssignPageModule {}
