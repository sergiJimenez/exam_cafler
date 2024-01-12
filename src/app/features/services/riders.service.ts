import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RidersService {
  constructor(private http: HttpClient) {}

  getRiders(): Observable<IRiders> {
    return this.http.get<IRiders>(
      `${environment.BASE_URL}${environment.RIDERS}`
    );
  }
}
