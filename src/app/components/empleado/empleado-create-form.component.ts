import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from 'src/app/model/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado-create-form.component.html',
  styleUrls: ['./empleado-create-form.component.css']
})
export class EmpleadoCreateComponent {
  empleado: Empleado = {
    idEmpleado: "0",
    nombre: "",
    apellido: "",
    puesto: ""
  };

  constructor(
    private empleadoService: EmpleadoService,
    private snackBar: MatSnackBar) {

  }

  submit(data: any) {
    this.empleadoService.save(data).subscribe(
      data => {
        this.openSnackBar('Empleado guardado', 'Cerrar');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
