import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoInterface } from '../interfaces/alumno-form.interface';
const base_url = 'http://apicomplementarias.test';
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { } 
  getAlumnos() {
    return this.http.get<any[]>(`${base_url}/alumnos`);
  }
  getAlumnosPaginado(page: number = 0){
    return this.http.get<any[]>(`${base_url}/alumno/paginado?page=${ page}`);
  }
  buscarAlumno(busqueda:string){
    return this.http.get<any[]>(`${base_url}/buscaralumno/${busqueda}`);
  }
  buscarAumnoCarrera(carrera: string, page: number = 0){
    return this.http.get<any[]>(`${base_url}/buscar/alumno/${carrera}?page=${page}`);
  }
  getAlumno(id: string) {
    return this.http.get<any[]>(`${base_url}/alumnos/${id}`);
  }
  getAlumno2(id: string) {
    return this.http.get<any[]>(`${base_url}/alumno/${id}`);
  }
  postAlumno(alumno: AlumnoInterface): Observable<AlumnoInterface> {
    return this.http.post<AlumnoInterface>(`${base_url}/alumnos`, alumno, { headers: this.headerT });
  }
  putAlumno(alumno: AlumnoInterface): Observable<AlumnoInterface> {
    console.log('posteando periodo');
    return this.http.put<AlumnoInterface>(`${base_url}/alumnos/${alumno.no_control}`, alumno, { headers: this.headerT });
  }
  deleteAlumno(no_control: string): Observable<any> {
    return this.http.delete(`${base_url}/alumnos/${no_control}`, { headers: this.headerT });
  }
}
