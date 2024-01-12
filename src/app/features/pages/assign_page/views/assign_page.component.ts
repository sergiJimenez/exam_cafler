import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { OptimizedRoutesService } from "src/app/features/services/optimized-routes.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";

@Component({
  selector: "app-assign-page",
  templateUrl: "./assign_page.component.html",
  styleUrls: ["./assign_page.component.scss"],
})
export class AssignPageComponent implements OnInit {
  public optimizedRoutes$!: Observable<IOptimizedRoutes[]>;
  public optimizedRoutesDetails: IOptimizedRoutes | undefined;

  constructor(private optimizedRoutes: OptimizedRoutesService) {}

  public ngOnInit(): void {
    this.loadOptimizedRoutes();
  }

  private loadOptimizedRoutes(): void {
    this.optimizedRoutes$ = this.optimizedRoutes.getOptimizedRoutes();
  }
}
