import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { OrdersService } from "src/app/features/services/orders.service";
import { ProductAccessService } from "src/app/core/services/productAccess.service";

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
    private ordersService: OrdersService,
    private productAccessService: ProductAccessService
  ) {}

  public ngOnInit(): void {
    this.loadOrders();
    sessionStorage.removeItem("hasTriedAccess");
  }

  public formatNumber(price: number): string {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  public allowAccess(): void {
    this.productAccessService.allowAccess();
  }

  private loadOrders(): void {
    this.orders$ = this.ordersService.getOrders();
  }
}
