import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoordinadorClase } from 'src/app/interfaces/coordinador.interface';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formulario: any;
  coordinador2: any;
  coordinador = new CoordinadorClase();
  constructor(
    private router: Router,
    private coordinadorService: CoordinadorService
  ) { }
  ngOnInit(): void {
    this.coordinador2 = localStorage.getItem('rfc');
    this.formularioReactivo();
    this.obtenerCoordinador(this.coordinador2);
  }
  limpiarStorage() {
    localStorage.removeItem('rfc');
    this.router.navigate(['/inicio']);
  }
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      nueva_contrasena: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      confirmar_contrasena: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  actualizar(){
    if (this.formulario.value.nueva_contrasena && this.formulario.value.confirmar_contrasena){
      if (this.formulario.value.nueva_contrasena == this.formulario.value.confirmar_contrasena) {
        this.editarCoordinador();
      } else {
        let mensajeError = 'No coinciden las contraseñas'
        this.mensajeError(mensajeError);
      }
    }else{
      let mensajeError = 'Error en las contraseñas'
      this.mensajeError(mensajeError);
    }
  }
  obtenerCoordinador(coordinador: any) {
    this.coordinadorService.getCoordinador(coordinador).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.coordinador = res.data;
       console.log(this.coordinador);
      }
    );
  }
  editarCoordinador() {
    this.coordinador.clave = this.formulario.value.confirmar_contrasena;
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
      this.limpiarStorage();
      //this.limpiarControls()
    });
  }
  // mensajes y alertas como eventos de respuesta sobre los subscribe
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      confirmButtonColor: "rgb(0, 0, 139)"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/coordinacion/perfil']);
      }
    })
  }
}
