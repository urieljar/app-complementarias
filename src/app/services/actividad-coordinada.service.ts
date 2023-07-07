import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActCoordinadaInterface } from '../interfaces/act-coordinada.interface';

const base_url = 'https://apicomplementarias.salinacruz.tecnm.mx/public';
@Injectable({
  providedIn: 'root'
})
export class ActividadCoordinadaService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  //metodos que destacan las rutas o los endpoints en el api
  getActividadesCoordinadas() {
    return this.http.get<any[]>(`${base_url}/actcordinada`);
  }
  getActividadesCoordinadas2(id: string) {
    return this.http.get<any[]>(`${base_url}/actividadcoordinada/${id}`);
  }
  buscarActividadCoordinada(rfc: string, busqueda: string) {
    return this.http.get<any[]>(`${base_url}/buscaractcoordinada/${rfc}/${busqueda}`);
  }
  getActividadesJfedpto(rfc: string, page: number = 0) {
    return this.http.get<any[]>(`${base_url}/actcoordinadajdepto/${rfc}?page=${page}`);
  }
  getActividadesCoordinador(rfc: string) {
    return this.http.get<any[]>(`${base_url}/actividadcoordinador/${rfc}`);
  }
  getActividadCoordinada(id: string) {
    return this.http.get<any[]>(`${base_url}/actcordinada/${id}`);
  }
  getTipoActividadCoordinada(id: string) {
    return this.http.get<any[]>(`${base_url}/tipoactividadcoordinada/${id}`);
  }
  postActividadCoordinada(actCoordinada: ActCoordinadaInterface): Observable<ActCoordinadaInterface> {
    console.log('posteando actividades coordinadas');
    return this.http.post<ActCoordinadaInterface>(`${base_url}/actcordinada`, actCoordinada, { headers: this.headerT });
  }
  putActividadCoordinada(actCoordinada: ActCoordinadaInterface): Observable<ActCoordinadaInterface> {
    console.log('posteando actividades coordinadas');
    return this.http.put<ActCoordinadaInterface>(`${base_url}/actcordinada/${actCoordinada.id}`, actCoordinada, { headers: this.headerT });
  }
  deleteActividadCoordinada(id: string): Observable<any> {
    return this.http.delete(`${base_url}/actcordinada/${id}`, { headers: this.headerT });
  }
}
