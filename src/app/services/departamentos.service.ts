import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentoInterface } from '../interfaces/departamento.interface';
// const base_url = 'http://apicomplementarias.test';
const base_url = 'https://apicomplementarias.salinacruz.tecnm.mx/public';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService { 
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getDptos() {
    return this.http.get<any[]>(`${base_url}/departamentos`);
  }
  getDpto(id: string) {
    return this.http.get<any[]>(`${base_url}/departamentos/${id}`);
  }
  postDpto(dpto: DepartamentoInterface): Observable<DepartamentoInterface> {
    return this.http.post<DepartamentoInterface>(`${base_url}/departamentos`, dpto, { headers: this.headerT });
  }
  putDpto(dpto: DepartamentoInterface): Observable<DepartamentoInterface> {
    console.log('posteando periodo');
    return this.http.put<DepartamentoInterface>(`${base_url}/departamentos/${dpto.id}`, dpto, { headers: this.headerT });
  }
  deleteDpto(id: string): Observable<any> {
    return this.http.delete(`${base_url}/departamentos/${id}`, { headers: this.headerT });
  }
}
