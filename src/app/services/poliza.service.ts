import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PolizaRequest } from '../model/poliza-request';
import { PolizaEmpleado } from '../model/poliza-empleado';
import { EmpleadoPolizasResponse } from '../responses/empleado-polizas-response';
import { TokenResponse } from '../responses/token-response';
import { authUrl } from 'src/config';
import { GrabadoResponse } from '../responses/grabado-response';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  url = "http://localhost:4200/rest/api/v1/poliza";
  authToken = "";
  tokenUrl: string = authUrl;
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

  getToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.tokenUrl}?user=client&password=123`, "");
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

  obtenerPorEmpleado(idEmpleado: string): Observable<any> {
    return this.http.get<PolizaRequest>(`${this.url}/empleado/${idEmpleado}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          "Accept": "application/json"
        })
      });
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

    return of(response);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.authToken}`,
      "Accept": "application/json"
    });
  }


}
