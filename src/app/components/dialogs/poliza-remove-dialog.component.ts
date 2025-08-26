import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { PolizaService } from "src/app/services/poliza.service";

@Component({
  templateUrl: 'poliza-remove-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class PolizaRemoveDialog {
  constructor(public dialogRef: MatDialogRef<PolizaRemoveDialog>,
    private polizaService: PolizaService,
    @Inject(MAT_DIALOG_DATA) public data: { idPoliza: string, empleadoId: string }
  ) { }

  onConfirmClick(): void {
    this.polizaService.delete(this.data.idPoliza).subscribe({
      next: (response) => {
        if (response.Meta.Status === 'SUCCESS') {
          this.polizaService.loadAll(this.data.empleadoId);
          this.dialogRef.close(true);
        }
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}