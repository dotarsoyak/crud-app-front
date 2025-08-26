import { Injectable } from '@angular/core';
import { Empleado } from '../model/empleado';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenResponse } from '../responses/token-response';
import { authUrl } from 'src/config';
import { environment } from 'src/environment/environment';
import { EmpleadoListResponse } from '../responses/empleado-list-response';

const EMPLEADOS = "employees";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url: string = environment.URL_EMPLOYEE_SERVICE;
  tokenUrl: string = authUrl;
  authToken = "";

  constructor(private http: HttpClient) {
    /*this.getToken().subscribe((response:TokenResponse) => {
      this.authToken = response.token.substring(7);
    });*/
    this.authToken = localStorage.getItem("authToken") || "";
    this.prepareLocalStorage();
  }

  prepareLocalStorage(data: any = undefined) {
    if (data) {
      localStorage.setItem(EMPLEADOS, JSON.stringify(data));
    } else {
      this.all().subscribe(emp => {
        localStorage.setItem(EMPLEADOS, JSON.stringify(emp.Data.Empleado));
      });
    }
  }

  getToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.tokenUrl}?user=client&password=123`,
      "");
    //console.log(`Empleado fue creado exitosamente. ${JSON.stringify(data)}`);
  }

  save(newEmpleado: Empleado): Observable<any> {
    // return this.http.post<any>(`${this.url}/add`, newEmpleado,
    //   {
    //     headers: this.getHeaders()
    //   });

    let employees = JSON.parse(localStorage.getItem(EMPLEADOS) || "[]");

    newEmpleado.idEmpleado = (Math.ceil(Math.random() * 100) + 1).toString();
    employees.push(newEmpleado);
    this.prepareLocalStorage(employees);

    return of(employees)

  }

  all(): Observable<any> {
    return of(JSON.parse(localStorage.getItem(EMPLEADOS) || "{}"));
  }

  /*getByname(name:string):Observable<Empleado[]>{
    return of(MockEmpleados);
  }*/

  byName(name: string): Observable<EmpleadoListResponse | []> {
    //return this.http.get<any>(`${this.url}/byName/${name}`,
    // return this.http.get<EmpleadoListResponse>(`${this.url}`,
    //   {
    //     headers: this.getHeaders()
    //   })
    //   .pipe(
    //     map((res: any) => {
    //       for (let emp of res[0].Data.Empleado) {
    //         if (emp.nombre.toLowerCase() == name.toLowerCase()) {
    //           return res[0]
    //         }
    //       }

    //       return [];
    //     })
    //   );

    const employeeDataSource = JSON.parse(localStorage.getItem(EMPLEADOS) || "[]");
    const employees = [{
      Data: {
        Empleado: employeeDataSource
      }
    }];

    return of(employees)
      .pipe(
        map((res: any) => {
          const result =
            res[0].Data.Empleado.filter((emp: any) => emp.nombre.toLowerCase() == name.toLowerCase());

          res[0].Data.Empleado = result;

          return res[0];

          // for (let emp of res[0].Data.Empleado) {
          //   if (emp.nombre.toLowerCase() == name.toLowerCase()) {
          //     return res[0]
          //   }
          // }

          //return [];
        })
      )
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.authToken}`,
      "Accept": "application/json"
    });
  }


}
