import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoClase } from 'src/app/interfaces/alumno-form.interface';
import { Alumnos } from 'src/app/models/alumnos.model';
import { Carreras } from 'src/app/models/carreras.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CarrerasService } from 'src/app/services/carreras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  // creacion de objetos para enviar o recibir informacion de la bases de datos  ///
  public totalAlumnos:number = 0;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;
  public carreraActual: any;
  public page:number =1;
  public isAll: boolean = false;
  alumnos: Alumnos[] = [];
  alumnosTemp: Alumnos[] = [];
  carreras: Carreras[] = [];
  alumno = new AlumnoClase();
  //formulario//
  formulario: any;
  public siguiente:boolean = false;
  public anterior:boolean =  false;
  constructor(private alumnoService: AlumnosService, private carreraService: CarrerasService, private router: Router) {}
  ngOnInit(): void {
    this.formularioReactivo();
    this.cargarAlumnos(this.paginaActual);
    this.obtenerCarreras();
  }

  // formulario reractivo
  formularioReactivo(): void {
    this.formulario = new FormGroup({
      no_control: new FormControl({
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
      nip: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      carrera: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  ///consultas///
  obtenerCarreras() {
    this.carreraService.getCarreras().subscribe((res: any) => {
      this.carreras = res.data;
      console.log(this.carreras);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  cargarAlumnos(index:number){
    this.isAll = true;
    this.alumnoService.getAlumnosPaginado(index).subscribe((res: any) => {
      this.alumnos = res.data.alumnos;
      this.alumnosTemp= this.alumnos;
      this.totalAlumnos = res.data.total;
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
      if(index == this.totalPaginas){
        this.anterior = true;
        this.siguiente = true;
      }
      if(index > 1 && index < this.totalPaginas){
        this.anterior = true;
        this.siguiente = false;
      }
    }, ((error: any) => {
      console.log(error);
    }));
  }
  cambiarPagina(valor:number){
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
    if (this.isAll){
      this.cargarAlumnos(this.paginaActual);
    }else{
      this.buscarCarrera(this.carreraActual, this.paginaActual)
    }
    
  }
  numSequence(n: number): Array<number> {
    let m = n;
    return Array(m);
  }
  buscar( termino: string ){
    // console.log(termino);
    if(termino.length === 0 ){
      this.alumnos = this.alumnosTemp;
    } else if (termino.length > 0){
    this.alumnoService.buscarAlumno(termino).subscribe((res:any)=>{
      //console.log(res.data);
      this.alumnos = res.data;
    }),((error: any) => {
      console.log(error);
    });
    }
  }
  buscarCarrera(carrera:any, index:number){
    this.isAll = false;
    this.carreraActual= carrera;
    this.alumnoService.buscarAumnoCarrera(this.carreraActual, index).subscribe((res: any) => {
      //console.log(res.data);
      this.totalAlumnos = res.data.total;
      this.totalPaginas = res.data.paginas;
      this.paginaActual = index;
      this.alumnos = res.data.alumnos;
      
      if (index == this.totalPaginas && index == 1) {
        this.anterior = false;
        this.siguiente = true;
        return
      }
      if (index == 1) {
        this.anterior = false;
        this.siguiente = false;
        return
      }
      if(index == this.totalPaginas){
        this.anterior = true;
        this.siguiente = true;
        return
      }
      if (index > 1 && index < this.totalPaginas) {
        this.anterior = true;
        this.siguiente = false;
        return
      }
    }, (error: any) => {
      console.log(error.error.mensaje);
      this.alumnos = [];
    });
  }
  obtenerAlumno(alumno:any){
    this.alumnoService.getAlumno(alumno.no_control).subscribe((res:any) =>{
      this.alumno = res['data'];
      this.formulario.controls['nombre'].setValue(this.alumno.nombre);
      this.formulario.controls['a_materno'].setValue(this.alumno.a_materno);
      this.formulario.controls['a_paterno'].setValue(this.alumno.a_paterno);
      this.formulario.controls['carrera'].setValue(this.alumno.carrera);
      //console.log(this.alumno);
    }), ((err: any) => {
      console.log(err.error.mensaje);
    });
  }
  // envio de datos al backend//
  agregarAlumno() {
    // this.jdpto.nombre = this.formulario.value.nombre;
    this.alumno.no_control = this.formulario.value.no_control.toUpperCase().replace(/\s{2,}/g, ' ').trim();//sirve para poner en mayuscula y elimina los espacios
    this.alumno.nip = this.formulario.value.nip;
    this.alumno.nombre = this.formulario.value.nombre.toUpperCase();
    this.alumno.a_paterno = this.formulario.value.a_paterno.toUpperCase();
    this.alumno.a_materno = this.formulario.value.a_materno.toUpperCase();
    this.alumno.carrera = this.formulario.value.carrera;
    this.alumno.email = '';
    this.alumno.telefono = '';
    this.alumnoService.postAlumno(this.alumno).subscribe((res: any) => {
      //console.log(res);
      this.openToast();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  //editar registro
  editarAlumno() {
    //console.log(this.carrera);//hacer prueba
    this.alumno.nombre = this.formulario.value.nombre.toUpperCase();
    this.alumno.a_paterno = this.formulario.value.a_paterno.toUpperCase();
    this.alumno.a_materno = this.formulario.value.a_materno.toUpperCase();
    this.alumno.carrera = this.formulario.value.carrera;
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
  // elimnar datos en el backend  
  eliminarAlumno(alumno: any) {
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
          {
            title: 'Eliminado!',
            icon: 'success',
            text: 'Su archivo ha sido eliminado.',
            showConfirmButton: false,
            timer: 1000
          }
        ).then((result) => {
          console.log(alumno);
          this.alumnoService.deleteAlumno(alumno.no_control).subscribe(
            (res: any) => {
              this.alumno = res['data'];
              console.log(this.alumno);
              //location.reload();
              this.cargarAlumnos(this.paginaActual);
            }
          );
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            title: 'Cancelado',
            icon: 'error',
            text: 'Su archivo ha sido cancelado. :)',
            showConfirmButton: false,
            timer: 1000
          }
        )
      }
    })
  }
  //otros metodos
  limpiarControls(): void {
    this.formulario.controls['no_control'].setValue('');
    this.formulario.controls['nip'].setValue('');
    this.formulario.controls['nombre'].setValue('');
    this.formulario.controls['a_paterno'].setValue('');
    this.formulario.controls['a_materno'].setValue('');
    this.formulario.controls['carrera'].setValue('');
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
        this.router.navigate(['/administracion/alumnos']);
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
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
    }).then((result) => { 
      // location.reload(),
      this.cargarAlumnos(this.paginaActual), 
      this.limpiarControls() });
  }

}
