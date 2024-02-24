import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { OptimizedRoutesService } from "src/app/features/services/optimized-routes.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { RidersService } from "src/app/features/services/riders.service";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { RouteUpdatedService } from "src/app/features/services/route-updated.service";
import { IOrders } from "src/app/shared/interfaces/orders.interface";

@Component({
  selector: "app-assign-page",
  templateUrl: "./assign_page.component.html",
  styleUrls: ["./assign_page.component.scss"],
})
export class AssignPageComponent implements OnInit {
  public optimizedRoutes$!: Observable<IOptimizedRoutes[]>;

  constructor(
    public ls: LocalStorageService,
    public dialog: MatDialog,
    private ridersService: RidersService,
    private optimizedRoutes: OptimizedRoutesService,
    private routeUpdated: RouteUpdatedService
  ) {}

  public ngOnInit(): void {
    this.loadOptimizedRoutes();
    this.loadRiders();
  }

  public openDialog(orderId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { orderId: orderId, fromRoute: this.getRootRoute(orderId) },
      panelClass: "dialogContainer",
    });

    dialogRef.afterClosed().subscribe(() => {
      this.optimizedRoutes$ = of(
        this.ls.getItem("routes") as IOptimizedRoutes[]
      );
    });
  }

  public changeToImprovedRoutes(): void {
    this.optimizedRoutes$ = of(this.improvedRoutes());
  }

  public cleanUpdatedRules(): void {
    this.ls.removeItem("routes");
    location.reload();
  }

  public saveUpdatedRoutes(): void {
    const newRoutes: IOptimizedRoutes =
      (this.ls.getItem("routes") as IOptimizedRoutes) || [];
    if (newRoutes !== null) {
      this.routeUpdated.postRouteUpdated(newRoutes).subscribe();
    }
  }

  private loadOptimizedRoutes(): void {
    this.optimizedRoutes$ = this.optimizedRoutes.getOptimizedRoutes();
  }

  private loadRiders(): void {
    this.ridersService.getRiders().subscribe();
  }

  private getRootRoute(orderId: string): string {
    const routes = this.ls.getItem("routes") as IOptimizedRoutes[];
    return routes.find((route) =>
      route.productsToDeliver.find((order) => order.orderId == orderId)
    )?.routeId as string;
  }

  private improvedRoutes(): IOptimizedRoutes[] {
    return this.optimizedRoutes.getRoutesImproved(
      this.ls.getItem("orderList") as IOrders[],
      this.ls.getItem("riderList") as IRiders[]
    );
  }
}
