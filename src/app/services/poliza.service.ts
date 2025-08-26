import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PolizaRequest } from '../model/poliza-request';
import { PolizaEmpleado } from '../model/poliza-empleado';
import { TokenResponse } from '../responses/token-response';
import { authUrl } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  private readonly POLICIES = "policies";

  private dataStore: {
    polizas: PolizaEmpleado[]
  } = {
      polizas: []
    };

  private _polizas: BehaviorSubject<PolizaEmpleado[]>;

  constructor(private http: HttpClient) {
    this._polizas = new BehaviorSubject<PolizaEmpleado[]>([]);
  }

  get polizas(): Observable<PolizaEmpleado[]> {
    return this._polizas.asObservable();
  }

  loadAll(idEmpleado: string) {
    const jsonPolicies = JSON.parse(localStorage.getItem(this.POLICIES) || '[]');
    const filteredPolicies = jsonPolicies.filter((item: any) =>
      item.Data.Empleado["idEmpleado"] === idEmpleado
    );
    this.dataStore.polizas = filteredPolicies.map((item: any) => item.Data.Poliza);
    this._polizas.next(Object.assign({}, this.dataStore).polizas);
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status},  error message is: ${err.message}`;
    }

    return throwError(() => errorMessage);
  }

  add(request: PolizaRequest): Observable<any> {
    const response: any = {
      Meta: {
        Status: "SUCCESS"
      },
      Data: {
        Poliza: {
          idPoliza: String(Math.floor(Math.random() * 10000)),
          cantidad: String(request.detalle.length),
          fecha: new Date().toLocaleDateString()
        },
        Empleado: {
          nombre: "",
          apellido: "",
          idEmpleado: request.idEmpleado
        },
        DetalleArticulo: request.detalle.map(item => ({
          sku: item.sku,
          nombre: ""
        }))
      }
    };

    const jsonPolicies = JSON.parse(localStorage.getItem(this.POLICIES) || '[]');
    jsonPolicies.push(response);
    localStorage.setItem(this.POLICIES, JSON.stringify(jsonPolicies));

    this.dataStore.polizas = response.Data.Poliza;
    this._polizas.next(Object.assign({}, this.dataStore).polizas);

    return of(response);
  }

  delete(idPoliza: string): Observable<any> {
    const jsonPolicies = JSON.parse(localStorage.getItem(this.POLICIES) || '[]');
    const filteredPolicies = jsonPolicies.filter((item: any) =>
      item.Data.Poliza.idPoliza !== idPoliza
    );

    localStorage.setItem(this.POLICIES, JSON.stringify(filteredPolicies));

    this.dataStore.polizas = this.dataStore.polizas.filter(poliza =>
      poliza.idPoliza !== idPoliza
    );
    this._polizas.next(Object.assign({}, this.dataStore).polizas);

    return of({
      Meta: {
        Status: "SUCCESS"
      },
      Data: {
        Poliza: { idPoliza }
      }
    });
  }


}
