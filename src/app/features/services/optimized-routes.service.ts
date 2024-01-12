import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IOptimizedRoutes } from "src/app/shared/interfaces/optimized-routes.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OptimizedRoutesService {
  constructor(private http: HttpClient) {}

  getOptimizedRoutes(): Observable<IOptimizedRoutes[]> {
    return this.http.get<IOptimizedRoutes[]>(
      `${environment.BASE_URL}${environment.OPTIMIZED_ROUTES}`
    );
  }
}
