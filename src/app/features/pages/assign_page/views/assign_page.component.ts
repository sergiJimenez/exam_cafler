import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdersService } from "src/app/features/services/orders.service";
import { IOrders } from "src/app/shared/interfaces/orders.interface";

@Component({
  selector: "app-assign-page",
  templateUrl: "./assign_page.component.html",
  styleUrls: ["./assign_page.component.scss"],
})
export class AssignPageComponent implements OnInit {
  private orderId: string = "";
  public orderDetails: IOrders | undefined;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params["orderId"];
      this.loadOrderDetails();
    });
  }

  private loadOrderDetails(): void {
    this.ordersService.getOrdersId(this.orderId).subscribe((details) => {
      this.orderDetails = details;
    });
  }
}
