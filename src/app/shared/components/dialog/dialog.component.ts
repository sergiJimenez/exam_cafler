import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { IOptimizedRoutes } from "../../interfaces/optimized-routes.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  public routes: IOptimizedRoutes[] = [];
  public toRoute: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { orderId: string; fromRoute: string },
    private ls: LocalStorageService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    const storedRoutes = this.ls.getItem("routes") as IOptimizedRoutes[] | null;

    if (storedRoutes) {
      this.routes = storedRoutes.filter(
        (route) => route.routeId !== this.data.fromRoute
      );
    } else {
      this.routes = [];
    }
  }

  public moveOrderToRoute(
    orderId: string,
    fromRouteId: string,
    toRouteId: string
  ): void {
    const fullRoutes: IOptimizedRoutes[] = this.ls.getItem(
      "routes"
    ) as IOptimizedRoutes[];
    const fromRoute = fullRoutes.find((route) => route.routeId === fromRouteId);

    if (fromRoute) {
      fromRoute.productsToDeliver = fromRoute.productsToDeliver.filter(
        (product) => product.orderId !== orderId
      );

      const toRoute = fullRoutes.find((route) => route.routeId === toRouteId);

      if (toRoute) {
        toRoute.productsToDeliver.push({ orderId: orderId });

        localStorage.setItem("routes", JSON.stringify(fullRoutes));
        this.onNoClick();
      } else {
        this.openSnackBar("Ruta de destino no encontrada");
      }
    } else {
      this.openSnackBar("Ruta de origen no encontrada");
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000,
      panelClass: ["cafler-snackbar"],
    });
  }
}
