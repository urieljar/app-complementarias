import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudAlumno } from 'src/app/models/solicitud.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bandera: boolean = false;
  no_control: any;
  
  solicitudes: SolicitudAlumno[] = [];
  constructor(private router: Router,
    private solicitudService: SolicitudService) { }
  ngOnInit(): void {
    // this.formularioReactivo();
    this.no_control = localStorage.getItem('no_control');
    this.obtenerSolicitudes();

  }
  obtenerSolicitudes() {
    console.log(this.no_control);
    this.solicitudService.getSolicitudAlumno(this.no_control).subscribe((res: any) => {
      this.solicitudes = res.data;
      this.bandera = true;
      //this.solicitudes = res.data.credito
      console.log(this.solicitudes);
    }, ((error: any) => {
      this.bandera = false;
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
