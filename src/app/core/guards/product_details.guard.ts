import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { ProductAccessService } from "../services/productAccess.service";
import { RoutesConst } from "../constants/routes";

export const ProductDetailsGuard: CanActivateFn = () => {
  const productAccessService = inject(ProductAccessService);
  const router = inject(Router);

  const hasTriedAccess: string | null =
    sessionStorage.getItem("hasTriedAccess");

  if (hasTriedAccess || productAccessService.canAccess()) {
    return true;
  } else {
    sessionStorage.setItem("hasTriedAccess", "true");
    return router.createUrlTree([RoutesConst.ERROR]);
  }
};
