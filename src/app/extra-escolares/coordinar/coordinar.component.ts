import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActCoordinadaClase, ActCoordinadaClase2 } from 'src/app/interfaces/act-coordinada.interface';
import { ActividadCoordinada, ActividadCoordinadaJdepto } from 'src/app/models/actividad-coordinada.model';
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
  tipoActividad= "2";
  actividadesCoordinadas: ActividadCoordinadaJdepto[] = [];
  actividadesCoordinadasTemp: ActividadCoordinadaJdepto[] = [];
  complementarias: Complementarias[] = [];
  coordinadores: Coordinadores2[] = [];
  actCoordinada = new ActCoordinadaClase();
  actCoordinada2 = new ActCoordinadaClase2();
  evdCompro: EvdComprobatoria[] = []
  formulario: any;
  //variables paginado paginados
  public siguiente: boolean = false;
  public anterior: boolean = false;
  public totalActividades: number = 0;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;
  public page: number = 1;
  public isAll: boolean = false;
  constructor(
    private router: Router,
    private coordinadorService: CoordinadorService,
    private actComplementariaService: ActividadComplementariaService,
    private actCoordinadaService: ActividadCoordinadaService) { this.jdepto = localStorage.getItem('rfc'); }
  ngOnInit(): void {
    this.jdepto = localStorage.getItem('rfc');
    this.formularioReactivo();
    this.obtenerActComplementarias();
    this.obtenerCoordinadores();
    this.obtenerActividadesCoordinadas(this.paginaActual);
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
  obtenerActividadesCoordinadas(index: number) {
    this.actCoordinadaService.getActividadesJfedpto(this.jdepto, index).subscribe((res: any) => {
      this.actividadesCoordinadas = res.data.actividad;
      this.actividadesCoordinadasTemp = this.actividadesCoordinadas;
      this.totalActividades = res.data.total;
      this.totalPaginas = res.data.paginas;
      this.paginaActual = index;
      if (index == this.totalPaginas && index == 1) {
        this.anterior = false;
        this.siguiente = true;
        return
      }
      if (index == 1) {
        this.anterior = false;
        this.siguiente = false;
      }
      if (index == this.totalPaginas) {
        this.anterior = true;
        this.siguiente = true;
      }
      if (index > 1 && index < this.totalPaginas) {
        this.anterior = true;
        this.siguiente = false;
      }
      //console.log(this.actividadesCoordinadas);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  cambiarPagina(valor: number) {
    this.paginaActual += valor;
    if (this.paginaActual == 1) {
      this.anterior = false;
      this.siguiente = false;
    }
    if (this.paginaActual == this.totalPaginas) {
      this.anterior = true;
      this.siguiente = true;
    }
    if (this.paginaActual > 1 && this.page < this.totalPaginas) {
      this.anterior = true;
      this.siguiente = false;
    }
    this.obtenerActividadesCoordinadas(this.paginaActual);
    // if (this.isAll) {
    //   this.cargarAlumnos(this.paginaActual);
    // } else {
    //   this.buscarCarrera(this.carreraActual, this.paginaActual)
    // }

  }
  numSequence(n: number): Array<number> {
    let m = n;
    return Array(m);
  }
  buscarcoordinador(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      this.actividadesCoordinadas = this.actividadesCoordinadasTemp;
    } else if (termino.length > 0) {
      this.actCoordinadaService.buscarActividadCoordinada(this.jdepto , termino).subscribe((res: any) => {
        //console.log(res.data);
        this.actividadesCoordinadas = res.data;
      }), ((error: any) => {
        console.log(error);
      });
    }
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
    this.actComplementariaService.getTipoActComplementaria(this.tipoActividad).subscribe((res: any) => {
      this.complementarias = res.data;
      //console.log(this.complementarias);
      // console.log(res);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerActividadCoordinada(actCoordinada: any) {
    this.actCoordinadaService.getActividadCoordinada(actCoordinada.id_actcoordinada).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.actCoordinada = res.data;
        console.log(this.actCoordinada);
        this.formulario.controls['status'].setValue(this.actCoordinada.status);
        this.formulario.controls['act_complementaria'].setValue(this.actCoordinada.act_complementaria);
        this.formulario.controls['coordinador'].setValue(this.actCoordinada.coordinador);
      }
    );
  }
  obtenerActividadCoordinada2(actCoordinada: any) {
    this.actCoordinadaService.getActividadesCoordinadas2(actCoordinada.id_actcoordinada).subscribe(
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
    this.actCoordinada.status = this.formulario.value.status;
    this.actCoordinada.act_complementaria = this.formulario.value.act_complementaria;
    this.actCoordinada.coordinador = this.formulario.value.coordinador;
    console.log(this.actCoordinada);
    this.actCoordinadaService.postActividadCoordinada(this.actCoordinada).subscribe((res: any) => {
      console.log(res);
      this.openToast();
      // this.obtenerSolicitudes();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  editarActComplementarias(){
    this.actCoordinada.coordinador = this.formulario.value.coordinador;
    this.actCoordinada.status = this.formulario.value.status;
    this.actCoordinada.act_complementaria = this.formulario.value.act_complementaria;
    this.actCoordinadaService.putActividadCoordinada(this.actCoordinada).subscribe(
      (res:any)=> {
        //console.log(res);
        this.openToast();
      },
      (err:any) => {
        console.log('no se pudo actualizar');
      }
    );
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
          timerProgressBar: true
        }).then((result) => {
          console.log(actCoordinada);
          this.actCoordinadaService.deleteActividadCoordinada(actCoordinada.id_actcoordinada).subscribe(
            (res: any) => {
              //this.actCoordinada = res['data'];
              this.obtenerActividadesCoordinadas(this.paginaActual);
              //  this.limpiarControls()
            }
          );
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          toast: true,
          icon: 'info',
          title: 'Cancelado',
          position: 'top-right',
          iconColor: 'white',
          color: 'white',
          background: '#f27474',
          showConfirmButton: false,
          timer: 1250,
          timerProgressBar: true
        })
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
      this.obtenerActividadesCoordinadas(this.paginaActual);
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
        this.router.navigate(['/jefe-extra/coordinar']);
      }
    })
  }
  limpiarControls(): void {
    this.formulario.controls['status'].setValue('');
    this.formulario.controls['act_complementaria'].setValue('');
    this.formulario.controls['coordinador'].setValue('');
  }
}
