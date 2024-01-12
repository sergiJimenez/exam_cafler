import { Pipe, PipeTransform } from "@angular/core";
import { IRiders } from "../interfaces/riders.interface";

@Pipe({
  name: "ridersName",
})
export class RidersNamePipe implements PipeTransform {
  transform(driverId: string | IRiders, driversArray: IRiders[]): string {
    if (typeof driverId === "string") {
      return (
        (driversArray.find((element: IRiders) => element.driverId === driverId)
          ?.driverName as string) || "noRiderName"
      );
    } else if (driverId && driverId.driverName) {
      return driverId.driverName;
    } else {
      return "noRiderName";
    }
  }
}
