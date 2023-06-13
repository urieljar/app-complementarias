import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActCoordinadaClase, ActCoordinadaClase2 } from 'src/app/interfaces/act-coordinada.interface';
import { ActividadCoordinada } from 'src/app/models/actividad-coordinada.model';
import { Complementarias } from 'src/app/models/complementarias.model';
import { Coordinadores, Coordinadores2 } from 'src/app/models/coordinador.model';
import { EvdComprobatoria } from 'src/app/models/evd-comprobatoria.model';
import { ActividadComplementariaService } from 'src/app/services/actividad-complementaria.service';
import { ActividadCoordinadaService } from 'src/app/services/actividad-coordinada.service';
import { CoordinadorService } from 'src/app/services/coordinador.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-evaluacion',
  templateUrl: './coordinar.component.html',
  styleUrls: ['./coordinar.component.css']
})


export class CoordinarComponent implements OnInit {
  jdepto: any;
  actividadesCoordinadas: ActividadCoordinada[] = [];
  
  complementarias: Complementarias[] = [];
  coordinadores: Coordinadores2[] = [];
  actCoordinada = new ActCoordinadaClase();
  actCoordinada2 = new ActCoordinadaClase2();
  evdCompro: EvdComprobatoria[] = []
  formulario: any;
  constructor(
    private router: Router,
    private coordinadorService: CoordinadorService,
    private actComplementariaService: ActividadComplementariaService,
    private actCoordinadaService: ActividadCoordinadaService) { }
  ngOnInit(): void {
    this.formularioReactivo();
    this.jdepto = localStorage.getItem('rfc');
    this.obtenerActComplementarias();
    this.obtenerCoordinadores();
    this.obtenerActividadesCoordinadas();
  }
  // formulario reractivo
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      status: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      act_complementaria: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      coordinador: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  obtenerActividadesCoordinadas() {
    this.actCoordinadaService.getActividadesCoordinadas().subscribe((res: any) => {
      this.actividadesCoordinadas = res.data;
      //console.log(this.actividadesCoordinadas);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerCoordinadores() {
    this.coordinadorService.cordinadoresJdepto2(this.jdepto).subscribe((res: any) => {
      this.coordinadores = res.data;
      console.log(this.coordinadores);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerActComplementarias() {
    this.actComplementariaService.getActComplementarias().subscribe((res: any) => {
      this.complementarias = res.data;
      //console.log(this.complementarias);
      // console.log(res);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerActividadCoordinada(actCoordinada: any) {
    this.actCoordinadaService.getActividadCoordinada(actCoordinada.id).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.actCoordinada = res.data;
        //console.log(this.actCoordinada);
        this.formulario.controls['status'].setValue(this.actCoordinada.status);
        this.formulario.controls['act_complementaria'].setValue(this.actCoordinada.act_complementaria);
        this.formulario.controls['coordinador'].setValue(this.actCoordinada.coordinador);
      }
    );
  }
  obtenerActividadCoordinada2(actCoordinada: any) {
    this.actCoordinadaService.getActividadesCoordinadas2(actCoordinada.id).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.actCoordinada2 = res.data;
        this.obtenerEvdComprobatorias(this.actCoordinada2);
      }
    );
  }
  obtenerEvdComprobatorias(evdComprobatorias: any) {
    this.actComplementariaService.getEvdComprobatorias(evdComprobatorias.id_actcomplementaria).subscribe((res: any) => {
      this.evdCompro = res.data;
    }, ((error: any) => {
      console.log(error);
    }));
  }
  crearActComplementarias() {
    this.actCoordinada.coordinador = this.formulario.value.coordinador;
    this.actCoordinada.status = this.formulario.value.status;
    this.actCoordinada.act_complementaria = this.formulario.value.act_complementaria;

    //console.log(this.actCoordinada);
    this.actCoordinadaService.postActividadCoordinada(this.actCoordinada).subscribe((res: any) => {
      //console.log(res);
      this.openToast();
      // this.obtenerSolicitudes();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  EliminarConfirmation(actCoordinada: any) {
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
          console.log(actCoordinada);
          this.actCoordinadaService.deleteActividadCoordinada(actCoordinada.id).subscribe(
            (res: any) => {
              //this.actCoordinada = res['data'];
              this.obtenerActividadesCoordinadas();
            //  this.limpiarControls()
            }
          );
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
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
        })
      }
    })
  }
  // evaluar(solicitud: any) {
  //   this.solicitudService.getSolicitud(solicitud.id).subscribe(
  //     (res: any) => {
  //       // this.periodo = res['data'];
  //       this.Solicitud = res.data;
  //       // console.log(this.Solicitud);
  //     }
  //   );
  //   Swal.fire({
  //     title: 'Evaluación del alumno',
  //     input: 'select',
  //     width: '25%',
  //     confirmButtonColor: "rgb(0, 0, 139)",
  //     inputOptions: {
  //       '0.00': 'Insuficiente',
  //       '1.00': 'Suficiente',
  //       '2.00': 'Bueno',
  //       '3.00': 'Notable',
  //       '4.00': 'Excelente'
  //     },
  //     inputPlaceholder: 'Calificación',
  //     showCancelButton: true,
  //     inputValidator: function (value) {
  //       return new Promise(function (resolve, reject) {
  //         if (value !== '') {
  //           resolve('');
  //         } else {
  //           resolve('Seleccione una calificación');
  //         }
  //       });
  //     },

  //   }).then((result) => {

  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         icon: 'success',
  //         width: '25%',
  //         confirmButtonColor: "rgb(0, 0, 139)",
  //         html: 'Valor: ' + result.value,
  //       });
  //         console.log('valor: ', result.value);
  //         // console.log(solicitud);

  //         this.Solicitud.valor_numerico = result.value;
  //         console.log('-----', this.Solicitud.valor_numerico);
  //         if (result.value > 0) {
  //           this.Solicitud.status = 1;
  //           // console.log(this.Solicitud);
  //           //this.editarSolicitud();
  //           this.solicitudService.putSolicitud(this.Solicitud).subscribe(
  //             res => {
  //               console.log(res);
  //               this.obtenerSolicitudes();
  //               // this.openToast();
  //             },
  //             err => {
  //               console.log(err);
  //               console.log('no se pudo actualizar');
  //             }
  //           );
  //         } else {
  //           this.Solicitud.status = 0;
  //           // console.log(this.Solicitud);
  //           this.solicitudService.putSolicitud(this.Solicitud).subscribe(
  //             res => {
  //               console.log(res);
  //               this.obtenerSolicitudes();
  //               // this.openToast();
  //             },
  //             err => {
  //               console.log('no se pudo actualizar');
  //             }
  //           );
  //         }
  
  
  //     }
  //   })
  // }
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
      this.obtenerActividadesCoordinadas();
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
        this.router.navigate(['/jefe-academica/coordinar']);
      }
    })
  }
  limpiarControls(): void {
    this.formulario.controls['status'].setValue('');
    this.formulario.controls['act_complementaria'].setValue('');
    this.formulario.controls['coordinador'].setValue('');
  }
}

