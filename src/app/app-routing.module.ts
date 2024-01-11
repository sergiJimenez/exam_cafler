import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutesConst } from "./core/constants/routes";

const routes: Routes = [
  {
    path: RoutesConst.HOMEPATH,
    loadChildren: () =>
      import("./features/pages/home_page/home_page.module").then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: RoutesConst.ASSIGNPATH,
    loadChildren: () =>
      import("./features/pages/assign_page/assign_page.module").then(
        (m) => m.AssignPageModule
      ),
  },
  { path: "", redirectTo: RoutesConst.HOME, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
