import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/model/empleado';
import { PolizaRequest } from 'src/app/model/poliza-request';
import { GrabadoResponse } from 'src/app/responses/grabado-response';
import { PolizaService } from 'src/app/services/poliza.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-poliza-faltante-form',
  templateUrl: './poliza-faltante-form.component.html',
  styleUrls: ['./poliza-faltante-form.component.css']
})
export class PolizaFaltanteFormComponent {
  nombreEmpleado = '';
  selectedEmpleado!: Empleado;
  generatedId = "";
  fechaActual = new Date().toLocaleDateString();

  setNombreEmpleado(empleado: Empleado): void {
    this.selectedEmpleado = empleado;
    this.actualizarPoliza();
  }

  constructor(private fb: FormBuilder, private polizaService: PolizaService,
    private snackBar: MatSnackBar) {
  }

  get skus(): FormArray {
    return <FormArray>this.polizaForm.get('detalle');
  }

  polizaForm = this.fb.group({
    idEmpleado: ['0'],
    empleadoGenero: [''],
    detalle: this.fb.array([this.buildSkuGroup()])
  });

  addSkuLine(): void {
    this.skus.push(this.buildSkuGroup());
    if (this.filtrarPorSkuDuplicados() > 0) {
      this.openSnackBar(`La póliza no debe contener códigos duplicados.`, 'Cerrar');
      return;
    }
  }

  removeSkuLine(skuId: number): void {
    this.skus.removeAt(skuId);
  }

  buildSkuGroup(): FormGroup {
    return this.fb.group({
      sku: ['', [Validators.required, Validators.maxLength(6), Validators.pattern("[0-9]+")]],
      cantidad: [0, [Validators.min(1), Validators.required]]
    });
  }

  filtrarPorSkuDuplicados(): number {
    let skuArray = this.polizaForm.controls.detalle.controls;
    let duplicados = 0;

    for (let i = 0; i < skuArray.length; i++) {
      for (let j = i + 1; j < skuArray.length; j++) {
        if (skuArray[i].controls['sku'].value == skuArray[j].controls['sku'].value) {
          duplicados = 1;
          break;
        }
      }
    }

    return duplicados;
  }

  save(): void {
    if (this.filtrarPorSkuDuplicados() > 0) {
      this.openSnackBar(`La póliza no debe contener códigos duplicados.`, 'Cerrar');
      return;
    }

    if (this.polizaForm.valid) {
      let polizaRequest: PolizaRequest = {
        idEmpleado: this.polizaForm.value.idEmpleado ? this.polizaForm.value.idEmpleado : '',
        empleadoGenero: this.polizaForm.value.empleadoGenero ? this.polizaForm.value.empleadoGenero : '',
        detalle: this.polizaForm.value.detalle ? this.polizaForm.value.detalle : []
      };

      this.polizaService.add(polizaRequest).subscribe((response: any) => {
        let res: GrabadoResponse = response;
        this.generatedId = res.Data.Poliza.idPoliza;
        this.openSnackBar(`Se generó con éxito la póliza ${this.generatedId}`, 'Cerrar');
      },
        error => {
          this.openSnackBar(`Ocurrió un error al intentar grabar la póliza.`, 'Cerrar');
          catchError(this.handleError);
        });
    }
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status},  error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  actualizarPoliza() {
    this.polizaForm.patchValue({
      idEmpleado: this.selectedEmpleado.idEmpleado,
      empleadoGenero: this.selectedEmpleado.nombre
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }



}
