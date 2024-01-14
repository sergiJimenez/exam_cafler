import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
const MATERIAL_MODULES = [
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
];
@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES],
})
export class MaterialModule {}
