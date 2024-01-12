import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IOrders } from "src/app/shared/interfaces/orders.interface";
import { OrdersService } from "src/app/features/services/orders.service";
import { RoutesConst } from "src/app/core/constants/routes";

@Component({
  selector: "app-home-page",
  templateUrl: "./home_page.component.html",
  styleUrls: ["./home_page.component.scss"],
})
export class HomePageComponent implements OnInit {
  public orders$!: Observable<IOrders[]>;

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orders$ = this.ordersService.getOrders();
  }

  public orderId(id: string): void {
    this.router.navigate([`${RoutesConst.ASSIGN}`, id]);
  }
}
