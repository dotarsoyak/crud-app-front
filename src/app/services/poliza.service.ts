import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PolizaRequest } from '../model/poliza-request';
import { PolizaEmpleado } from '../model/poliza-empleado';
import { EmpleadoPolizasResponse } from '../responses/empleado-polizas-response';
import { TokenResponse } from '../responses/token-response';
import { authUrl } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class PolizaService{
  //url:string='api/polizas/polizas.json';
  url="http://localhost:4200/rest/api/v1/poliza";
  authToken="";
  tokenUrl:string=authUrl;

  private dataStore: {
    polizas: PolizaEmpleado[]
  } = {
    polizas: []
  };
  
  private _polizas: BehaviorSubject<PolizaEmpleado[]>;

  constructor(private http: HttpClient) { 

    this._polizas = new BehaviorSubject<PolizaEmpleado[]>([]);
    this.authToken = localStorage.getItem("authToken") || "";

    /*this.getToken().subscribe((response:TokenResponse) => {
      this.authToken = response.token.substring(7);
      //console.log(this.authToken);
    });*/
  }

  getToken():Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.tokenUrl}?user=client&password=123`, 
    "");
    //console.log(`Empleado fue creado exitosamente. ${JSON.stringify(data)}`);
  }

  get polizas():Observable<PolizaEmpleado[]>{
    return this._polizas.asObservable();
  }

  loadAll(idEmpleado:string){
    this.http.get<EmpleadoPolizasResponse>(`${this.url}/empleado/${idEmpleado}`,
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          "Accept":"application/json"
        })
        }
    )
    .subscribe(
      response => {
        this.dataStore.polizas = response.Data.Poliza;
        this._polizas.next(Object.assign({}, this.dataStore).polizas);
      },
      error => {catchError(this.handleError)}
    );
  }

  handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error ocurred: ${err.error.message}`;
    }else{
      errorMessage = `Server returned code: ${err.status},  error message is: ${err.message}`;
    }

    //console.error(errorMessage);
    return  throwError(()=>errorMessage);
  }
  
  obtenerPorEmpleado(idEmpleado:string):Observable<any>{
    return this.http.get<PolizaRequest>(`${this.url}/empleado/${idEmpleado}`,
    //return this.http.get<PolizaRequest>(this.url,
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        "Accept":"application/json"
      })
    });
  }

  add(request:PolizaRequest):Observable<any>{
    return this.http.post<PolizaRequest>(`${this.url}/add`, request,
    {
      headers: this.getHeaders()
    });
  }

  getHeaders():HttpHeaders{
    return new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.authToken}`,
      "Accept":"application/json"
    });
  }


}
