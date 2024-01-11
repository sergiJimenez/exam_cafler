import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssignPageRoutingModule } from "./assign_page-routing.module";
import { AssignPageComponent } from "./views/assign_page.component";

@NgModule({
  declarations: [AssignPageComponent],
  imports: [CommonModule, AssignPageRoutingModule],
})
export class AssignPageModule {}
