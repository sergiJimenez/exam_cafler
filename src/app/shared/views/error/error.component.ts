import { Component } from "@angular/core";
import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
})
export class ErrorComponent {
  public options: AnimationOptions = {
    path: "../../../../assets/lottie/error.json",
  };

  public onAnimate(animationItem: AnimationItem): void {
    animationItem;
  }
}
