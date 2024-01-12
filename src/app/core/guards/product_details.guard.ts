import { Injectable } from "@angular/core";
import { CanActivate, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ProductAccessService } from "../services/product_access.service";
import { RoutesConst } from "../constants/routes";

@Injectable({
  providedIn: "root",
})
export class ProductDetailsGuard implements CanActivate {
  constructor(
    private productAccessService: ProductAccessService,
    private router: Router
  ) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkAccess();
  }

  private checkAccess():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.productAccessService.canAccess()) {
      return true;
    } else {
      return this.router.createUrlTree([RoutesConst.ERROR]);
    }
  }
}
