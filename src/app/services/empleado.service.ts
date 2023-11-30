import { Injectable } from '@angular/core';
import { Empleado } from '../model/empleado';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenResponse } from '../responses/token-response';
import { authUrl } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url:string = "http://localhost:4200/rest/api/v1/empleado";
  tokenUrl:string=authUrl;
  authToken="";

  constructor(private http: HttpClient) { 

    /*this.getToken().subscribe((response:TokenResponse) => {
      this.authToken = response.token.substring(7);
    });*/
    this.authToken = localStorage.getItem("authToken") || "";
  
    //console.log("Empleado service en linea." + this.authToken);
  }

  getToken():Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.tokenUrl}?user=client&password=123`, 
    "");
    //console.log(`Empleado fue creado exitosamente. ${JSON.stringify(data)}`);
  }

  save(newEmpleado:Empleado):Observable<any>{
    return this.http.post<any>(`${this.url}/add`, newEmpleado, 
    {
      headers: this.getHeaders()
    });
    //console.log(`Empleado fue creado exitosamente. ${JSON.stringify(data)}`);

  }

  all():Observable<any>{
    return this.http.get<any>(`${this.url}/all`, 
    {
      headers: this.getHeaders()
    });
  }

  /*getByname(name:string):Observable<Empleado[]>{
    return of(MockEmpleados);
  }*/

  byName(name:string):Observable<any>{
    return this.http.get<any>(`${this.url}/byName/${name}`, 
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
