import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JefeDptoInterface } from '../interfaces/jefe-departamento.interface';
const base_url = 'http://apicomplementarias.test';
@Injectable({
  providedIn: 'root'
})
export class JefeDptoService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getJefeDptos() {
    return this.http.get<any[]>(`${base_url}/jefes`);
  }
  getJefeDpto(id: string) {
    return this.http.get<any[]>(`${base_url}/jefes/${id}`);
  }
  contarJefeDpto() {
    return this.http.get<any[]>(`${base_url}/contar/jefes`);
  }
  postJefeDpto(jdpto: JefeDptoInterface): Observable<JefeDptoInterface> {
    return this.http.post<JefeDptoInterface>(`${base_url}/jefes`, jdpto, { headers: this.headerT });
  }
  putJefeDpto(jdpto: JefeDptoInterface): Observable<JefeDptoInterface> {
    console.log('posteando jefes');
    return this.http.put<JefeDptoInterface>(`${base_url}/jefes/${jdpto.rfc}`, jdpto, { headers: this.headerT });
  }
  deleteJefeDpto(rfc: string): Observable<any> {
    return this.http.delete(`${base_url}/jefes/${rfc}`, { headers: this.headerT });
  }
}
