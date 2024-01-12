import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { ProductAccessService } from "../services/product_access.service";
import { RoutesConst } from "../constants/routes";

export const ProductDetailsGuard: CanActivateFn = () => {
  const productAccessService = inject(ProductAccessService);
  const router = inject(Router);
  if (productAccessService.canAccess()) {
    return true;
  } else {
    return router.createUrlTree([RoutesConst.ERROR]);
  }
};
