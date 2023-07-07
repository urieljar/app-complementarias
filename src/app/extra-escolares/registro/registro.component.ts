import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coordinadores } from 'src/app/models/coordinador.model';
import { CoordinadorService } from '../../services/coordinador.service';
import { CoordinadorClase } from 'src/app/interfaces/coordinador.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  jdepto: any;
  coordinadores: Coordinadores[] = [];
  coordinadoresTemp: Coordinadores[] = [];
  coordinador = new CoordinadorClase();
  //tipo: string = '';
  ///validacion
  isValidSubmit: boolean = false;
  isbandera1: boolean = false;
  formulario: any;
  ///variables para ver el pasword///
  visible: boolean = true;
  changetype: boolean = true;
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
    private coordinadorService: CoordinadorService) { }
  ngOnInit(): void {
    this.jdepto = localStorage.getItem('rfc');
    this.formularioReactivo();
    this.obtenerCoordinadores(this.paginaActual);
  }
  // formulario reractivo
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      rfc: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      av: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      nombre: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      apellidos: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      clave: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      status: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  // envio de datos al backend//
  crearCoordinador() {
    this.coordinador.rfc = this.formulario.value.rfc;
    this.coordinador.av = this.formulario.value.av;
    this.coordinador.nombre = this.formulario.value.nombre.toUpperCase();
    this.coordinador.apellidos = this.formulario.value.apellidos.toUpperCase();
    this.coordinador.clave = this.formulario.value.clave;
    this.coordinador.status = this.formulario.value.status;
    this.coordinador.apellidos = this.formulario.value.apellidos;
    this.coordinador.jdepto = this.jdepto;
    console.log(this.coordinador);
    this.coordinadorService.postCoordinador(this.coordinador).subscribe((res: any) => {
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
  obtenerCoordinadores(index: number) {
    this.coordinadorService.getCoordinadoresPaginado(this.jdepto, index).subscribe((res: any) => {
      this.coordinadores = res.data.coordinador;
      this.coordinadoresTemp = this.coordinadores;
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
     // console.log(this.coordinadores);
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
    this.obtenerCoordinadores(this.paginaActual);
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
      this.coordinadores = this.coordinadoresTemp;
    } else if (termino.length > 0) {
      this.coordinadorService.buscarCoordinador(this.jdepto, termino).subscribe((res: any) => {
        this.coordinadores = res.data;
      }, ((error: any) => {
        console.log(error);
      }));
    }
  }
  valorInput(valorInput: string) {
    this.isbandera1 = this.validateModel(valorInput);
  }
  private validateModel(valorInput: string) {
    return !!valorInput && valorInput.length > 6;
  }
  // ver password //
  verPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  limpiarControls(): void {
    this.formulario.controls['rfc'].setValue('');
    this.formulario.controls['av'].setValue('');
    this.formulario.controls['nombre'].setValue('');
    this.formulario.controls['apellidos'].setValue('');
    this.formulario.controls['clave'].setValue('');
    this.formulario.controls['status'].setValue('');
    this.isValidSubmit = false;
    this.isbandera1 = false;
  }
  obtenerCoordinador(coordinador: any) {
    this.coordinadorService.getCoordinador(coordinador.rfc).subscribe(
      (res: any) => {
        this.coordinador = res.data;
        console.log(this.coordinador);
        this.formulario.controls['rfc'].setValue(this.coordinador.rfc);
        this.formulario.controls['av'].setValue(this.coordinador.av);
        this.formulario.controls['clave'].setValue(this.coordinador.clave);
        this.formulario.controls['status'].setValue(this.coordinador.status);
        this.formulario.controls['nombre'].setValue(this.coordinador.nombre);
        this.formulario.controls['apellidos'].setValue(this.coordinador.apellidos);
      }
    );
  }
  editarCoordinador() {
    this.coordinador.av = this.formulario.value.av;
    this.coordinador.nombre = this.formulario.value.nombre.toUpperCase();
    this.coordinador.apellidos = this.formulario.value.apellidos.toUpperCase();
    this.coordinador.status = this.formulario.value.status;
    this.coordinadorService.putCoordinador(this.coordinador).subscribe(
      res => {
        //console.log(res);
        this.openToast();
      },
      err => {
        console.log('no se pudo actualizar');
      }
    );
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
      this.obtenerCoordinadores(this.paginaActual);
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
        this.router.navigate(['/jefe-academica/registrar']);
      }
    })
  }

  EliminarConfirmation(coordinador: any) {
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
          console.log(this.coordinador);
          this.coordinadorService.deleteCoordinador(coordinador.rfc).subscribe(
            (res: any) => {
              this.coordinador = res['data'];
              // console.log(this.coordinador);
              this.obtenerCoordinadores(this.paginaActual);
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
}
