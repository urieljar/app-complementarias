import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoClase2 } from 'src/app/interfaces/alumno-form.interface';
import { PeriodoClase2 } from 'src/app/interfaces/periodo.interface';
import { SolicitudClase } from 'src/app/interfaces/solicitud.interface';
import { ActividadCoordinadas } from 'src/app/models/actividad-coordinada.model';
import { Complementarias } from 'src/app/models/complementarias.model';
import { Periodo } from 'src/app/models/periodos.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { ActividadCoordinadaService } from 'src/app/services/actividad-coordinada.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { PeriodosService } from 'src/app/services/periodos.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
 // created_at : Date = new Date;
  periodoActual = '1';
  coordinador: any;
  actCoordinadas: ActividadCoordinadas[] = [];
  solicitud = new SolicitudClase();
  tipo: string = '';
  solicitudes: Solicitud[] = [];
  ///validacion
  isValidSubmit: boolean = false;
  isbandera1: boolean = false;
  ahora: any;
  fechareactivo: any;
  formulario: any;
  //periodo:any;
  periodo = new PeriodoClase2();
  //periodos: Periodo []= [];
  alumno = new AlumnoClase2();
  constructor(
    private router: Router,
    private alumnoService: AlumnosService,
    private periodoService: PeriodosService,
    private solcitudService: SolicitudService,
    private actCoordinadaService: ActividadCoordinadaService
    ) { }
  ngOnInit(): void {
    const datePite = new DatePipe('en-Us')
    const datePipe = new DatePipe('es-Us')
    this.ahora = datePite.transform(new Date(), 'yyyy-MM-dd');
    this.fechareactivo = datePipe.transform(new Date(), 'fullDate');
    this.coordinador = localStorage.getItem('rfc');
    //console.log(this.ahora);
    this.obtenerPeriodos();
   // console.log(this.periodos);
    this.obtenerSolicitudes();
    this.obtenerActComplementarias();
    this.formularioReactivo();
  }
  // formulario reractivo
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      periodo: new FormControl({
        value: this.periodo.periodo,
        disabled: true
      }, [
        Validators.required
      ]),
      alumno: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      nombre: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required
      ]),
      act_complementaria: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      observacion: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      created_at: new FormControl({
        value:  this.fechareactivo,
        disabled: true
      }, [
        Validators.required
      ])
    });
  }
  obtenerPeriodos() {
    this.periodoService.getPeriodoActual(this.periodoActual).subscribe((res: any) => {
      //this.periodos = res.data;
      //console.log(this.periodoActual);
      this.periodo = res.data;
      //console.log(res.data.periodo);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerActComplementarias() {
    this.actCoordinadaService.getActividadesCoordinador(this.coordinador).subscribe((res: any) => {
      this.actCoordinadas = res.data;
      console.log(this.actCoordinadas);
      // console.log(res);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  // envio de datos al backend//
  crearSolicitud() {
    // this.jdpto.nombre = this.formulario.value.nombre;
    this.solicitud.alumno = this.formulario.value.alumno;
    this.solicitud.created_at = this.ahora;
    this.solicitud.periodo = this.periodo.id
    this.solicitud.act_coordinada = this.formulario.value.act_complementaria;
   // this.solicitud.jdepto = 'VAFG680629GC0';
    this.solicitud.valor_numerico = 0.00;
    this.solicitud.observacion = this.formulario.value.observacion;
    this.solicitud.status = 0;
    // console.log(this.jdpto.rfc);
    console.log(this.solicitud);

    this.solcitudService.postSolicitud(this.solicitud).subscribe((res: any) => {
     // console.log(res);
      this.openToast();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  obtenerSolicitudes() {
    this.solcitudService.getSolicitudes().subscribe((res: any) => {
      this.solicitudes = res.data;
      //console.log(this.solicitudes);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  valorInput(valorInput: string) {
    this.isbandera1 = this.validateModel(valorInput);
  }
  private validateModel(valorInput: string) {
    return !!valorInput && valorInput.length > 6;
  }
  obtenerAlumno() {
    console.log(this.formulario.value.alumno);
    this.alumnoService.getAlumno2(this.formulario.value.alumno).subscribe((res: any) => {
      this.alumno = res['data'];
      this.formulario.controls['nombre'].setValue(this.alumno.nombre_completo);
      this.isValidSubmit = true;
      // console.log(this.alumno);
    }, (err: any) => {
      // console.log(err.error.mensaje);
      let mensajeErrorConEtiquetas = err.error.mensaje;
      // console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  limpiarControls(): void {
    this.formulario.controls['nombre'].setValue('');
    this.formulario.controls['alumno'].setValue('');
    this.formulario.controls['act_complementaria'].setValue('');
    this.formulario.controls['observacion'].setValue('');
    // this.formulario.controls['periodo'].setValue('');
    this.isValidSubmit = false;
    this.isbandera1 = false;
  }
  confirmBox() {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar?',
      text: '¡No podrá recuperar este archivo!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#DC143C",
      confirmButtonColor: "rgb(0, 0, 139)",
      confirmButtonText: '¡Sí, borralo!',
      cancelButtonText: '¡No, quiero borrarlo!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'Su archivo ha sido eliminado.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Su archivo ha sido cancelado. :)',
          'error'
        )
      }
    })
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
      // location.reload(),
      this.obtenerSolicitudes();
      this.limpiarControls()
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
        this.router.navigate(['/coordinacion/registros']);
      }
    })
  }

  EliminarConfirmation(solicitud: any) {
    Swal.fire({
      position: 'top',
      width: '40%',
      padding: '0.75rem',
      title: 'Estas seguro de Eliminar!',
      text: 'No se podra recuperar la informacion.',
      icon: 'warning',
      footer: '<span class="rojo">Esta informacion es importante</span>',
      backdrop: 'true',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#DC143C",
      confirmButtonColor: "rgb(0, 0, 139)",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Borrado exitosamente!',
          position: 'top-right',
          iconColor: 'white',
          color: 'white',
          background: '#3fc3ee',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true,
        }).then((result) => {
          console.log(this.solicitud);
          this.solcitudService.deleteSolicitud(solicitud.id).subscribe(
            (res: any) => {
              this.solicitud = res['data'];
              console.log(this.solicitud);
              this.obtenerSolicitudes();
              // location.reload();
            }
          );
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            toast: true,
            icon: 'success',
            title: 'Borrado exitosamente!',
            position: 'top-right',
            iconColor: 'white',
            color: 'white',
            background: '#f27474',
            showConfirmButton: false,
            timer: 1250,
            timerProgressBar: true,
          }
        )
      }
    })
  }
}
