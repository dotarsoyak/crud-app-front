import { Component } from '@angular/core';
import { PolizaRequest } from 'src/app/model/poliza-request';
import { PolizaDetalleRequest } from 'src/app/model/poliza-detalle-request';
import { PolizaService } from 'src/app/services/poliza.service';
import { TokenResponse } from 'src/app/responses/token-response';
import { GrabadoResponse } from 'src/app/responses/grabado-response';
import { DataModelResponse } from 'src/app/responses/model/data-model-response';
import { PolizaModelResponse } from 'src/app/responses/model/poliza-model-response';
import { MetaStatusModel } from 'src/app/responses/model/meta-status-model';
import { GenericResponse } from 'src/app/responses/generic-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private polizaService: PolizaService) { }

  getPolizaRequest(): any {
    let detalleRequest: PolizaDetalleRequest[] = [{
      sku: "101285",
      cantidad: "2"
    }, {
      sku: "224195",
      cantidad: "3"
    }];

    let polizaRequest: PolizaRequest = {
      idEmpleado: "1",
      empleadoGenero: "Ulises Trujillo",
      detalle: detalleRequest
    };

    return polizaRequest;
  }

  addPoliza(): void {
    let request = this.getPolizaRequest();
    this.polizaService.add(request).subscribe((response: any) => {
    });

  }

}
