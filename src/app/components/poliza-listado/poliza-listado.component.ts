import { Component, OnInit, ViewChild } from '@angular/core';
import { PolizaService } from 'src/app/services/poliza.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PolizaEmpleado } from 'src/app/model/poliza-empleado';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PolizaRemoveDialog } from '../dialogs/poliza-remove-dialog.component';
import { PolizaDetalleDialogComponent } from '../dialogs/policies/poliza-detalle-dialog.component';

@Component({
  selector: 'app-poliza-listado',
  templateUrl: './poliza-listado.component.html',
  styleUrls: ['./poliza-listado.component.css']
})
export class PolizaListadoComponent implements OnInit {
  selectedEmpleado?: string;
  empleadoId: string = "";
  polizas: Observable<PolizaEmpleado[]> | undefined;
  displayedColumns: string[] = ['idPoliza', 'cantidad', 'fecha', 'accion'];
  dataSource!: MatTableDataSource<PolizaEmpleado>;

  constructor(private polizaService: PolizaService, private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, idPoliza: string): void {
    const dialogRef = this.dialog.open(PolizaRemoveDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        idPoliza: idPoliza,
        empleadoId: this.empleadoId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Policy deleted successfully');
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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

  openDetalleDialog(idPoliza: string): void {
    this.dialog.open(PolizaDetalleDialogComponent, {
      width: '500px',
      data: {
        idPoliza: idPoliza,
        empleadoId: this.empleadoId
      }
    });
  }

}
