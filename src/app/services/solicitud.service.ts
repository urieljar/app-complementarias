import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudInterface } from '../interfaces/solicitud.interface';

const base_url = 'http://apicomplementarias.test';
@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    headerT = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) { }
    getSolicitudes() {
        return this.http.get<any[]>(`${base_url}/solicitud`);
    }
    getSolicitud(id: string) {
        return this.http.get<any[]>(`${base_url}/solicitud/${id}`);
    }
    getSolicitudAlumno(no_control: string){
        return this.http.get<any[]>(`${base_url}/solicitudalumno/${no_control}`);
    }
    postSolicitud(solicitud: SolicitudInterface): Observable<SolicitudInterface> {
        return this.http.post<SolicitudInterface>(`${base_url}/solicitud`, solicitud, { headers: this.headerT });
    }
    putSolicitud(solicitud: SolicitudInterface): Observable<SolicitudInterface> {
        console.log('posteando solicitud');
        return this.http.put<SolicitudInterface>(`${base_url}/solicitud/${solicitud.id}`, solicitud, { headers: this.headerT });
    }
    deleteSolicitud(id: string): Observable<any> {
        return this.http.delete(`${base_url}/solicitud/${id}`, { headers: this.headerT });
    }
}