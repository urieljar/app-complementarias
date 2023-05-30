import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudClase } from 'src/app/interfaces/solicitud.interface';
import { Complementarias } from 'src/app/models/complementarias.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})


export class EvaluacionComponent implements OnInit {
  complementarias: Complementarias[] = [];
  solicitudes: Solicitud[] = [];
  Solicitud = new SolicitudClase();
  constructor(
    private router: Router,
    private solicitudService: SolicitudService) { }
  ngOnInit(): void {
    // this.formularioReactivo();
    this.obtenerSolicitudes();

  }
  obtenerSolicitudes() {

    this.solicitudService.getSolicitudes().subscribe((res: any) => {
      this.solicitudes = res.data;
      console.log(this.solicitudes);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  evaluar(solicitud: any) {
    this.solicitudService.getSolicitud(solicitud.id).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.Solicitud = res.data;
        // console.log(this.Solicitud);
      }
    );
    Swal.fire({
      title: 'Evaluación del alumno',
      input: 'select',
      width: '25%',
      confirmButtonColor: "rgb(0, 0, 139)",
      inputOptions: {
        '0.00': 'Insuficiente',
        '1.00': 'Suficiente',
        '2.00': 'Bueno',
        '3.00': 'Notable',
        '4.00': 'Excelente'
      },
      inputPlaceholder: 'Calificación',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve('');
          } else {
            resolve('Seleccione una calificación');
          }
        });
      },

    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          width: '25%',
          confirmButtonColor: "rgb(0, 0, 139)",
          html: 'Valor: ' + result.value,
        });
          console.log('valor: ', result.value);
          // console.log(solicitud);

          this.Solicitud.valor_numerico = result.value;
          console.log('-----', this.Solicitud.valor_numerico);
          if (result.value > 0) {
            this.Solicitud.status = 1;
            // console.log(this.Solicitud);
            //this.editarSolicitud();
            this.solicitudService.putSolicitud(this.Solicitud).subscribe(
              res => {
                console.log(res);
                this.obtenerSolicitudes();
                // this.openToast();
              },
              err => {
                console.log(err);
                console.log('no se pudo actualizar');
              }
            );
          } else {
            this.Solicitud.status = 0;
            // console.log(this.Solicitud);
            this.solicitudService.putSolicitud(this.Solicitud).subscribe(
              res => {
                console.log(res);
                this.obtenerSolicitudes();
                // this.openToast();
              },
              err => {
                console.log('no se pudo actualizar');
              }
            );
          }
  
  
      }
    })
  }
  openToast() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)

      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
    }).then((result) => {
      // location.reload(),
      this.obtenerSolicitudes();
      // this.limpiarControls()
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
        this.router.navigate(['/jefe-extra/evaluacion']);
      }
    })
  }
}

