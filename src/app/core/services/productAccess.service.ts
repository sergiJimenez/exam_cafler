import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductAccessService {
  private canAccessDetails = false;

  public allowAccess(): void {
    this.canAccessDetails = true;
  }

  public canAccess(): boolean {
    return this.canAccessDetails;
  }
}
