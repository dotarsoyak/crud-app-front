import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/model/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-busqueda-empleado-modal',
  templateUrl: './busqueda-empleado-modal.component.html',
  styleUrls: ['./busqueda-empleado-modal.component.css']
})
export class BusquedaEmpleadoModalComponent {
  nombreABuscar = '';
  @Output() onFinish: EventEmitter<Empleado> = new EventEmitter<Empleado>();
  empleados?: any;
  empleadosFiltered: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) {
  }

  getEmpleados() {
    this.empleadoService.all().subscribe(empleadoResponse => {
      this.empleados = empleadoResponse;
    });
  }

  onClosing(forma: NgForm): void {
    this.empleados = undefined;
    this.nombreABuscar = '';
    forma.resetForm();
  }

  searchEmpleado(): void {
    const findThis = this.nombreABuscar.trim();
    this.empleadoService.byName(findThis).subscribe(emp => {
      this.empleados = emp;
    });
  }

  selectEmpleado(empleado: any): void {
    this.onFinish.emit(empleado);
  }


}
