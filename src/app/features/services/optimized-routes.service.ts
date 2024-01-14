import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

@Injectable({
  providedIn: "root",
})
export class OptimizedRoutesService {
  constructor(
    private http: HttpClient,
    private ls: LocalStorageService
  ) {}

  public getOptimizedRoutes(): Observable<IOptimizedRoutes[]> {
    const cachedRoutes = this.ls.getItem("routes") as IOptimizedRoutes[];

    if (cachedRoutes && cachedRoutes.length > 0) {
      return of(cachedRoutes);
    } else {
      return this.http
        .get<IOptimizedRoutes[]>(
          `${environment.BASE_URL}${environment.OPTIMIZED_ROUTES}`
        )
        .pipe(tap((res) => this.ls.setItem("routes", res)));
    }
  }
}
