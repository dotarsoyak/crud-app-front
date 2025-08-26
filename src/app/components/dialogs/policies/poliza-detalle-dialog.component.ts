import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

interface PolizaDetalleRequest {
  sku: string;
  cantidad: string;
}

@Component({
  templateUrl: './poliza-detalle-dialog.html',
  standalone: true,
  selector: 'app-poliza-detalle-dialog',
  imports: [MatDialogModule, MatButtonModule, NgIf, NgFor],
})
export class PolizaDetalleDialogComponent implements OnInit {
  detalleArticulos: PolizaDetalleRequest[] = [];

  constructor(
    public dialogRef: MatDialogRef<PolizaDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idPoliza: string, empleadoId: string }
  ) { }

  ngOnInit(): void {
    const jsonPolicies = JSON.parse(localStorage.getItem('policies') || '[]');
    const policy = jsonPolicies.find((item: any) =>
      item.Data.Poliza.idPoliza === this.data.idPoliza &&
      item.Data.Empleado.idEmpleado === this.data.empleadoId
    );
    if (policy && policy.Data && policy.Data.DetalleArticulo) {
      this.detalleArticulos = policy.Data.DetalleArticulo.map((articulo: any, idx: number) => ({
        sku: articulo.sku,
        cantidad: policy.Data.Poliza.cantidad
      }));
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}