import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudClase } from 'src/app/interfaces/solicitud.interface';
import { Complementarias } from 'src/app/models/complementarias.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-constancia',
  templateUrl: './constancia.component.html',
  styleUrls: ['./constancia.component.css']
})
export class ConstanciaComponent implements OnInit {
  complementarias: Complementarias[] = [];
  solicitudes: Solicitud[] = [];
  jdepto:any;
  Solicitud = new SolicitudClase();
  constructor(
    private router: Router,
    private solicitudService: SolicitudService) { }
  ngOnInit(): void {
    this.jdepto = localStorage.getItem('rfc');
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.solicitudService.getSolicitudJdepto(this.jdepto).subscribe((res: any) => {
      this.solicitudes = res.data;
      console.log(this.solicitudes);
    }, ((error: any) => {
      console.log(error);
    }));
  }
}
