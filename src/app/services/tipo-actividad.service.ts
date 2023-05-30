import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoActInterface } from '../interfaces/tipo-act.interface';
const base_url = 'http://apicomplementarias.test';
@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getTipoActividades() {
    return this.http.get<any[]>(`${base_url}/tipoact`);
  }
  getTipoActividad(id: string) {
    return this.http.get<any[]>(`${base_url}/tipoact/${id}`);
  }
  postTipoActividad(periodo: TipoActInterface): Observable<TipoActInterface> {
    return this.http.post<TipoActInterface>(`${base_url}/tipoact`, periodo, { headers: this.headerT });
  }
  putTipoActividad(periodo: TipoActInterface): Observable<TipoActInterface> {
    console.log('posteando tipo de actividad');
    return this.http.put<TipoActInterface>(`${base_url}/tipoact/${periodo.id}`, periodo, { headers: this.headerT });
  }
  deleteTipoActividad(id: string): Observable<any> {
    return this.http.delete(`${base_url}/tipoact/${id}`, { headers: this.headerT });
  }
}
