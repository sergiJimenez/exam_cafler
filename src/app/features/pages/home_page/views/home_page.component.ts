import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { OrdersService } from "src/app/features/services/orders.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home_page.component.html",
  styleUrls: ["./home_page.component.scss"],
})
export class HomePageComponent implements OnInit {
  public orders$!: Observable<IOrders[]>;
  public dataSource = this.orders$;
  public nameColumn = ["ID", "Nombre del producto", "Precio"];
  public username: string = "Aparatos S.L.";

  constructor(
    private ordersService: OrdersService
  ) {}

  public ngOnInit(): void {
    this.loadOrders();
  }

  public formatNumber(price: number): string {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  private loadOrders(): void {
    this.orders$ = this.ordersService.getOrders();
  }
}
