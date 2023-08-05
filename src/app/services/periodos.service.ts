import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodoInterface } from '../interfaces/periodo.interface';


// const base_url = 'http://apicomplementarias.test';
const base_url = 'https://apicomplementarias.salinacruz.tecnm.mx/public';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getPeriodos(){
    return this.http.get<any[]>(`${base_url}/periodo`);
  }
  getPeriodo(id: string) {
    return this.http.get<any[]>(`${base_url}/periodo/${id}`);
  }
  getPeriodoActual(status: string) {
    return this.http.get<any[]>(`${base_url}/periodos/${status}`);
  }
  postPeriodo(periodo: PeriodoInterface): Observable<PeriodoInterface>{
    return this.http.post<PeriodoInterface>(`${base_url}/periodo`, periodo, { headers: this.headerT });
  }
  putPeriodo(periodo: PeriodoInterface):Observable<PeriodoInterface>{
    console.log('posteando periodo');
    return this.http.put<PeriodoInterface>(`${base_url}/periodo/${periodo.id}`, periodo, { headers: this.headerT });
  }
  deletePeriodo(id: string):Observable<any> {
    return this.http.delete(`${base_url}/periodo/${id}`, { headers: this.headerT });
  }
}
