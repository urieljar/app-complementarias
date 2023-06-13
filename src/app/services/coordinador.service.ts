import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoordinadorInterface } from '../interfaces/coordinador.interface';
import { Observable } from 'rxjs';
const base_url = 'http://apicomplementarias.test';
@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getCoordinadores() {
    return this.http.get<any[]>(`${base_url}/coordinadores`);
  }
  getCoordinador(rfc: string) {
    return this.http.get<any[]>(`${base_url}/coordinadores/${rfc}`);
  }
  
  cordinadoresJdepto(rfc: string) {
    return this.http.get<any[]>(`${base_url}/coordinador/${rfc}`);
  }
  cordinadoresJdepto2(rfc: string) {
    return this.http.get<any[]>(`${base_url}/coordinadoresact/${rfc}`);
  }
  postCoordinador(coordinador: CoordinadorInterface): Observable<CoordinadorInterface> {
    return this.http.post<CoordinadorInterface>(`${base_url}/coordinadores`, coordinador, { headers: this.headerT });
  }
  putCoordinador(coordinador: CoordinadorInterface): Observable<CoordinadorInterface> {
    console.log('posteando coordinadores');
    return this.http.put<CoordinadorInterface>(`${base_url}/coordinadores/${coordinador.rfc}`, coordinador, { headers: this.headerT });
  }
  deleteCoordinador(rfc: string): Observable<any> {
    return this.http.delete(`${base_url}/coordinadores/${rfc}`, { headers: this.headerT });
  }

}
