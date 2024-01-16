import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssignPageComponent } from "./views/assign_page.component";

const routes: Routes = [
  {
    path: "",
    component: AssignPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignPageRoutingModule {}
