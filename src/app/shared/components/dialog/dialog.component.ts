import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { IOptimizedRoutes } from "../../interfaces/optimized-routes.interface";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  public routes: IOptimizedRoutes[] = [];
  public fromRoute: string = "";
  public toRoute: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private ls: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.routes = (this.ls.getItem("routes") as IOptimizedRoutes[]) || [];
  }

  private onNoClick(): void {
    this.dialogRef.close();
  }

  public moveOrderToRoute(
    orderId: string,
    fromRouteId: string,
    toRouteId: string
  ): void {
    if (this.areRoutesSame(fromRouteId, toRouteId)) {
      alert(
        "La ruta de origen y destino es la misma. No se puede cambiar."
      );
      return;
    }

    const fromRoute: IOptimizedRoutes | undefined =
      this.getRouteById(fromRouteId);

    if (!this.isProductInRoute(orderId, fromRoute)) {
      alert(
        "El producto no proviene de la ruta de origen. No se puede cambiar."
      );
      return;
    }

    const toRoute: IOptimizedRoutes | undefined = this.getRouteById(toRouteId);

    if (this.isProductInRoute(orderId, toRoute)) {
      alert(
        "El producto ya está en la ruta de destino. No se puede cambiar."
      );
      return;
    }

    this.moveProductBetweenRoutes(orderId, fromRoute, toRoute);
  }

  private areRoutesSame(routeId1: string, routeId2: string): boolean {
    return routeId1 === routeId2;
  }

  private getRouteById(routeId: string): IOptimizedRoutes | undefined {
    return this.routes.find((route) => route.routeId === routeId);
  }

  private isProductInRoute(
    orderId: string,
    route: IOptimizedRoutes | undefined
  ): boolean {
    return (
      !!route &&
      !!route.productsToDeliver.find((product) => product.orderId === orderId)
    );
  }

  private moveProductBetweenRoutes(
    orderId: string,
    fromRoute: IOptimizedRoutes | undefined,
    toRoute: IOptimizedRoutes | undefined
  ): void {
    if (fromRoute && toRoute) {
      fromRoute.productsToDeliver = fromRoute.productsToDeliver.filter(
        (product) => product.orderId !== orderId
      );

      toRoute.productsToDeliver.push({ orderId: orderId });

      localStorage.setItem("routes", JSON.stringify(this.routes));
      this.onNoClick();
    } else {
      alert("Ruta de origen o destino no encontrada");
    }
  }
}
