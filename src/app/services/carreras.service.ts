import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarreraInterface } from '../interfaces/carrera.interface';
// const base_url = 'http://apicomplementarias.test';

const base_url = 'https://apicomplementarias.salinacruz.tecnm.mx/public';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getCarreras() {
    return this.http.get<any[]>(`${base_url}/carreras`);
  }
  contarCarreras() {
    return this.http.get<any[]>(`${base_url}/contar/carreras`);
  }
  getCarrera(id: string) {
    return this.http.get<any[]>(`${base_url}/carreras/${id}`);
  }
  postCarrera(carrera: CarreraInterface): Observable<CarreraInterface> {
    return this.http.post<CarreraInterface>(`${base_url}/carreras`, carrera, { headers: this.headerT });
  }
  putCarrera(carrera: CarreraInterface): Observable<CarreraInterface> {
    console.log('posteando periodo');
    return this.http.put<CarreraInterface>(`${base_url}/carreras/${carrera.id}`, carrera, { headers: this.headerT });
  }
  deleteCarrera(id: string): Observable<any> {
    return this.http.delete(`${base_url}/carreras/${id}`, { headers: this.headerT });
  }
}
