import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoForm } from '../interfaces/alumno-form.interface';
import { Observable } from 'rxjs';
import { JefeDepartmento } from '../interfaces/jefe-departamento.interface';
const base_url = 'http://apicomplementarias.test';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  headerT = new HttpHeaders().set('Content-Type', 'application/json');
  constructor( private http: HttpClient) { }

  accederAlumno(formData: AlumnoForm):Observable<any>{
    console.log('posteando usuario');
    return this.http.post(`${base_url}/alumnos/login`, formData,{ headers: this.headerT });
  }

  accederJfDpto(formJefe: JefeDepartmento): Observable<any> {
    console.log('posteando usuario');
    return this.http.post(`${base_url}/jefes/login`, formJefe, { headers: this.headerT });
  }
  

}
