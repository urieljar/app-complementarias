import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoordinadorClase } from 'src/app/interfaces/coordinador.interface';
import { Coordinadores } from 'src/app/models/coordinador.model';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coordinadores',
  templateUrl: './coordinadores.component.html',
  styleUrls: ['./coordinadores.component.css']
})
export class CoordinadoresComponent implements OnInit {
  jdepto: any;
  ///validacion
  isValidSubmit: boolean = false;
  isbandera1: boolean = false;
 
  ///variables para ver el pasword///
  visible: boolean = true;
  changetype: boolean = true;

  coordinadores: Coordinadores[] = [];
  coordinadoresTemp: Coordinadores[] = [];
  coordinador = new CoordinadorClase();
  formulario: any;
  //variables paginado paginados
  public siguiente: boolean = false;
  public anterior: boolean = false;
  public totalActividades: number = 0;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;
  public page: number = 1;
  // public isAll: boolean = false;
  constructor(private router: Router, private coordinadorService: CoordinadorService) { }
  ngOnInit(): void {
    this.obtenerCoordinadores(this.paginaActual);
    this.formularioReactivo();
  }
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      rfc: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required
      ]),
      av: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required
      ]),
      nombre: new FormControl({
        value: '',
        disabled: true
      }, [
        Validators.required
      ]),
      apellidos: new FormControl({
        value: '',
        disabled: true
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
  obtenerCoordinadores(index: number) {
    this.coordinadorService.getCoordinadoresPaginado2(index).subscribe((res: any) => {
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
      console.log(this.coordinadores);
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
      this.coordinadorService.buscarCoordinador2(termino).subscribe((res: any) => {
        this.coordinadores = res.data;
      }, ((error: any) => {
        console.log(error);
      }));
    }
  }
  private validateModel(valorInput: string) {
    return !!valorInput && valorInput.length > 6;
  }
  // ver password //
  verPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  editarCoordinador() {

    this.coordinador.clave = this.formulario.value.clave;
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
  obtenerCoordinador(coordinador: any) {
    this.coordinadorService.getCoordinador(coordinador.rfc).subscribe(
      (res: any) => {
        this.coordinador = res.data;
        console.log(this.coordinador);
        this.formulario.controls['rfc'].setValue(this.coordinador.rfc);
        this.formulario.controls['nombre'].setValue(this.coordinador.nombre);
        this.formulario.controls['av'].setValue(this.coordinador.av);
       // this.formulario.controls['clave'].setValue(this.coordinador.clave);
        this.formulario.controls['status'].setValue(this.coordinador.status);
        
        this.formulario.controls['apellidos'].setValue(this.coordinador.apellidos);
      }
    );
  }

}
