import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { OrdersService } from "src/app/features/services/orders.service";
import { ProductAccessService } from "src/app/core/services/product_access.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home_page.component.html",
  styleUrls: ["./home_page.component.scss"],
})
export class HomePageComponent implements OnInit {
  public orders$!: Observable<IOrders[]>;

  constructor(
    private ordersService: OrdersService,
    private productAccessService: ProductAccessService
  ) {}

  public ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orders$ = this.ordersService.getOrders();
  }

  public allowAccess(): void {
    this.productAccessService.allowAccess();
  }
}
