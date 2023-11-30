import { Component, OnInit, ViewChild } from '@angular/core';
import { PolizaService } from 'src/app/services/poliza.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PolizaEmpleado } from 'src/app/model/poliza-empleado';
import { ActivatedRoute } from '@angular/router';

export interface PolizaStruct {
  idPoliza: string;
  cantidad: string;
  fecha: string;
}

@Component({
  selector: 'app-poliza-listado',
  templateUrl: './poliza-listado.component.html',
  styleUrls: ['./poliza-listado.component.css']
})
export class PolizaListadoComponent implements OnInit {
  selectedEmpleado?:string;
  empleadoId:string="";
  //polizas:any; 
  polizas: Observable<PolizaEmpleado[]> | undefined;
  displayedColumns: string[] = ['idPoliza', 'cantidad', 'fecha', 'accion'];
  dataSource!:MatTableDataSource<PolizaEmpleado>;  

   constructor(private polizaService:PolizaService,private route: ActivatedRoute){
    //this.obtenerPolizas();
   }

   @ViewChild(MatPaginator) paginator!: MatPaginator;

   ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.empleadoId = routeParams.get("id") || '0';
    this.selectedEmpleado = routeParams.get("name") || '';

    this.polizas = this.polizaService.polizas;
    this.polizaService.loadAll(this.empleadoId);
    this.polizas.subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<PolizaEmpleado>(data);
        this.dataSource.paginator = this.paginator;
      }
    })
   }

   obtenerPolizas(){
    this.polizaService.obtenerPorEmpleado("1").subscribe(
      (lista:any)=>{
        this.polizas = lista;
        //console.log(`Polizas recuperadas: ${JSON.stringify(lista)}`);
      }
    );
   }
}
