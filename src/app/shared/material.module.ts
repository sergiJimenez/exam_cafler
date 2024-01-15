import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";

const MATERIAL_MODULES = [
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDividerModule,
];
@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES],
})
export class MaterialModule {}
