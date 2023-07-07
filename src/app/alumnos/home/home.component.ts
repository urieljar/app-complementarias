import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud, SolicitudAlumno } from 'src/app/models/solicitud.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bandera: any;
  no_control: any;
  solicitudes: Solicitud[] = [];
  constructor(private router: Router,
    private solicitudService: SolicitudService) { }
  ngOnInit(): void {
    this.no_control = localStorage.getItem('no_control');
    this.obtenerSolicitudes(this.no_control);
  }
  obtenerSolicitudes(no_control:any) {
    this.solicitudService.getSolicitudAlumno(no_control).subscribe((res: any) => {
      this.solicitudes = res.data;
      this.bandera = false;
      //this.solicitudes = res.data.credito
      //console.log(this.solicitudes);
    }, ((error: any) => {
      this.bandera = true;
      console.log(error);
    }));
  }
  numSequence(n: string): Array<number> {
    let m=parseInt(n);
    return Array(m);
  }
  actualizar(bandera: boolean) {
    if (bandera == true) {
      // location.reload();//recarga la pagina actual
      bandera = false;
    } else {
      bandera = false;
    }
  }
}
