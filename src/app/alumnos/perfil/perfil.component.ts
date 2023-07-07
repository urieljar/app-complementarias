import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoClase } from 'src/app/interfaces/alumno-form.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  alumno = new AlumnoClase();
  no_control: any;
  //formulario//
  formulario: any;
  constructor(private alumnoService: AlumnosService, private router: Router) { }
  ngOnInit(): void {
    this.no_control = localStorage.getItem('no_control');
    this.formularioReactivo();
    this.obtenerAlumno(this.no_control);
  }
  // formulario reactivo
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      a_paterno: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      a_materno: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]), 
      email: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      telefono: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  obtenerAlumno(alumno: any) {
    this.alumnoService.getAlumno(alumno).subscribe((res: any) => {
      this.alumno = res['data'];
      this.formulario.controls['nombre'].setValue(this.alumno.nombre);
      this.formulario.controls['a_materno'].setValue(this.alumno.a_materno);
      this.formulario.controls['a_paterno'].setValue(this.alumno.a_paterno);
      this.formulario.controls['email'].setValue(this.alumno.email);
      this.formulario.controls['telefono'].setValue(this.alumno.telefono);
      console.log(this.alumno);
    }), ((err: any) => {
      console.log(err.error.mensaje);
    });
  }
  //editar registro
  editarAlumno() {
    //console.log(this.carrera);//hacer prueba
    this.alumno.nombre = this.formulario.value.nombre.toUpperCase();
    this.alumno.a_paterno = this.formulario.value.a_paterno.toUpperCase();
    this.alumno.a_materno = this.formulario.value.a_materno.toUpperCase();
    this.alumno.email = this.formulario.value.email;
    this.alumno.telefono = this.formulario.value.telefono;
    this.alumnoService.putAlumno(this.alumno).subscribe(
      res => {
        // console.log(res);
        this.openToast();
      }, (err: any) => {
        console.log('no se pudo guardar');
        let mensajeErrorConEtiquetas = err.error.messages.error;
        console.log(mensajeErrorConEtiquetas);
        let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
        this.mensajeError(mensajeError);
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
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
    }).then((result) => {
      // location.reload(),
     // this.cargarAlumnos(this.paginaActual),
      this.router.navigate(['/alumnos/perfil']);
       // this.limpiarControls()
    });
  }
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/alumnos/perfil']);
      }
    })
  }
}
