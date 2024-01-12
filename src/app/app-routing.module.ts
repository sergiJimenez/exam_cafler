import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutesConst } from "./core/constants/routes";
import { ErrorComponent } from "./shared/views/error/error.component";
import { AssignPageComponent } from "./features/pages/assign_page/views/assign_page.component";
import { ProductDetailsGuard } from "./core/guards/product_details.guard";

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
  {
    path: "assign/:orderId",
    component: AssignPageComponent,
    canActivate: [ProductDetailsGuard],
  },
  {
    path: RoutesConst.ERRORPATH,
    component: ErrorComponent,
  },
  { path: "", redirectTo: RoutesConst.HOME, pathMatch: "full" },
  { path: "**", redirectTo: RoutesConst.ERROR, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
