import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoClase2 } from 'src/app/interfaces/periodo.interface';
import { SolicitudClase } from 'src/app/interfaces/solicitud.interface';
import { ActividadCoordinadas } from 'src/app/models/actividad-coordinada.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { ActividadCoordinadaService } from 'src/app/services/actividad-coordinada.service';
import { PeriodosService } from 'src/app/services/periodos.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  no_control: any;
  actCoordinadas: ActividadCoordinadas[] = [];
  tipo: string = '2';
  periodoActual = '1';
  bandera:any;
  ahora: any;
  periodo = new PeriodoClase2();
  solicitud = new SolicitudClase();
  //solicitudes: Solicitud[] = [];
  constructor(
    private router: Router,
    private solcitudService: SolicitudService,
    private periodoService: PeriodosService,
    private actCoordinadaService: ActividadCoordinadaService
    ) { }
  ngOnInit(): void {
    const datePite = new DatePipe('en-Us');
    this.ahora = datePite.transform(new Date(), 'yyyy-MM-dd');
    this.no_control = localStorage.getItem('no_control');
    this.obtenerActComplementarias();
    this.obtenerPeriodos();
  }
  obtenerActComplementarias() {
    ///ojo aqui hay error
    this.solcitudService.getBuscarSolicitudAlumno(this.no_control).subscribe((res: any) => {
      this.bandera = res.data;
      //console.log(this.bandera);
      if(!this.bandera){
        this.actCoordinadaService.getTipoActividadCoordinada(this.tipo).subscribe((res: any) => {
          this.actCoordinadas = res.data;
          console.log(this.actCoordinadas);
          // console.log(res);
        }, ((error: any) => {
          console.log(error);
        }));
      }else{
        //return false;
      }
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerPeriodos() {
    this.periodoService.getPeriodoActual(this.periodoActual).subscribe((res: any) => {
      this.periodo = res.data;
      console.log(this.periodo);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  crearSolicitud(actcoordinada:any) {
    this.solicitud.alumno = this.no_control;
    this.solicitud.created_at = this.ahora;
    this.solicitud.periodo = this.periodo.id;
    this.solicitud.act_coordinada = actcoordinada.id_actcoordinada;
    this.solicitud.valor_numerico = 0.00;
    this.solicitud.observacion = '';
    this.solicitud.status = 0;
    console.log(this.solicitud);
    this.solcitudService.postSolicitud(this.solicitud).subscribe((res: any) => {
      this.openToast();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  openToast() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    }).then((result) => {
      this.router.navigate(['/alumnos/registrarse']);
      this.obtenerActComplementarias();
    });
  }
  // mensajes y alertas como eventos de respuesta sobre los subscribe
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/alumnos/registrarse']);
      }
    })
  }

}
