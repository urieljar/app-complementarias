import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EvdPresentarInterface } from '../interfaces/evd-presentar.interface';
import { Observable } from 'rxjs';
import { ActvidadComplementariaInterface } from '../interfaces/act-complementaria.interface';
import { EvdComprobatoriaInterface } from '../interfaces/evd-comprobatoria.interface';

const base_url = 'http://apicomplementarias.test';
@Injectable({
  providedIn: 'root'
})
export class ActividadComplementariaService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  ///evidencias a presentas metodos para consumir mi api
  getEvdsPresentar() {
    return this.http.get<any[]>(`${base_url}/evidenciapresentar`);
  }
  getEvdPresentar(id: string) {
    return this.http.get<any[]>(`${base_url}/evidenciapresentar/${id}`);
  }
  postJEvdPresentar(evdPre: EvdPresentarInterface): Observable<EvdPresentarInterface> {
    return this.http.post<EvdPresentarInterface>(`${base_url}/evidenciapresentar`, evdPre, { headers: this.headerT });
  }
  putEvdPresentar(evdPre: EvdPresentarInterface): Observable<EvdPresentarInterface> {
    console.log('posteando jefes');
    return this.http.put<EvdPresentarInterface>(`${base_url}/evidenciapresentar/${evdPre.id}`, evdPre, { headers: this.headerT });
  }
  deleteEvdPresentar(id: string): Observable<any> {
    return this.http.delete(`${base_url}/evidenciapresentar/${id}`, { headers: this.headerT });
  }
  ///evidencias a presentas metodos para consumir mi api
  getActComplementarias() {
    return this.http.get<any[]>(`${base_url}/actcomplementarias`);
  }
  getActComplementaria(id: string) {
    return this.http.get<any[]>(`${base_url}/actcomplementarias/${id}`);
  }
  posActComplementaria(actcom: ActvidadComplementariaInterface): Observable<ActvidadComplementariaInterface> {
    return this.http.post<ActvidadComplementariaInterface>(`${base_url}/actcomplementarias`, actcom, { headers: this.headerT });
  }
  putActComplementaria(actcom: ActvidadComplementariaInterface): Observable<ActvidadComplementariaInterface> {
    console.log('posteando periodo');
    return this.http.put<ActvidadComplementariaInterface>(`${base_url}/actcomplementarias/${actcom.id}`, actcom, { headers: this.headerT });
  }
  getActComplementaria2(id: string) {
    return this.http.get<any[]>(`${base_url}/actcomplementaria/${id}`);
  }
  deleteActComplementaria(id: string): Observable<any> {
    return this.http.delete(`${base_url}/actcomplementarias/${id}`, { headers: this.headerT });
  }
  getTipoActComplementarias(id: string) {
    return this.http.get<any[]>(`${base_url}/tipoactcomplementaria/${id}`);
  }
  ///evidencias comprotorias metodos para consumir mi api
  getEvdComprobatorias(id: string) {
    return this.http.get<any[]>(`${base_url}/evidenciascomprobatorias/actcomplementaria/${id}`);
  }
  postEvdComprobatoria(evdComprobatoria: EvdComprobatoriaInterface): Observable<EvdComprobatoriaInterface> {
    return this.http.post<EvdComprobatoriaInterface>(`${base_url}/evidenciascomprobatoria`, evdComprobatoria, { headers: this.headerT });
  }
  deleteEvdComprobatoria(id: string): Observable<any> {
    return this.http.delete(`${base_url}/evidenciascomprobatoria/${id}`, { headers: this.headerT });
  }
}
