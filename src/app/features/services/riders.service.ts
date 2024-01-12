import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

@Injectable({
  providedIn: "root",
})
export class RidersService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getRiders(): Observable<IRiders[]> {
    return this.http
      .get<IRiders[]>(`${environment.BASE_URL}${environment.RIDERS}`)
      .pipe(
        tap((riders) => {
          this.localStorage.setItem("riderList", riders);
        })
      );
  }
}
