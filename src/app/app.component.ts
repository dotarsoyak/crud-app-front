import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from './responses/token-response';
import { HttpClient } from '@angular/common/http';
import { authUrl } from 'src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestor de polizas';
  tokenUrl: string = authUrl;

  constructor(private http: HttpClient) {
    this.getToken().subscribe((response: TokenResponse) => {
      localStorage.setItem("authToken", response.token.substring(7));
    });
  }

  getToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.tokenUrl}?user=client&password=123`,
      "");
  }
}
