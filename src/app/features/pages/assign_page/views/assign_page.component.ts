import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { OptimizedRoutesService } from "src/app/features/services/optimized-routes.service";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { LocalStorageService } from "src/app/core/services/localStorage.service";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { RidersService } from "src/app/features/services/riders.service";

@Component({
  selector: "app-assign-page",
  templateUrl: "./assign_page.component.html",
  styleUrls: ["./assign_page.component.scss"],
})
export class AssignPageComponent implements OnInit {
  public optimizedRoutes$!: Observable<IOptimizedRoutes[]>;
  public optimizedRoutesDetails: IOptimizedRoutes | undefined;
  public riders$!: Observable<IRiders[]>;

  constructor(
    public ls: LocalStorageService,
    private ridersService: RidersService,
    private optimizedRoutes: OptimizedRoutesService
  ) {}

  public ngOnInit(): void {
    this.loadOptimizedRoutes();
    this.loadRiders();
  }

  private loadOptimizedRoutes(): void {
    this.optimizedRoutes$ = this.optimizedRoutes.getOptimizedRoutes();
  }

  private loadRiders(): void {
    this.ridersService.getRiders().subscribe();
  }
}
