import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoClase } from 'src/app/interfaces/departamento.interface';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit{
  dptos: Departamento[] = [];
  formulario: any;
  dpto = new DepartamentoClase();
  constructor(private dptoService: DepartamentosService, private router: Router){}
  ngOnInit(): void {
    this.obtenerDptos();
    this.formularioReactivo();
  }
  eliminarDpto(dpto: any) {
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
          'success',
        ).then(result=>{
          this.dptoService.deleteDpto(dpto.id).subscribe(
            (res: any) => {
              this.dpto = res['data'];
              console.log(this.dpto);
              this.refresh()
            }
          )
        })
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
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        this.refresh();
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }
  refresh(): void { window.location.reload(); }
  obtenerDptos() {
    this.dptoService.getDptos().subscribe((res: any) => {
      this.dptos = res.data;
      console.log(this.dptos);
      console.log(res);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  formularioReactivo(): void {
    this.formulario = new FormGroup({
       nombre: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
    });
  }
  obtenerDpto(depto: any) {
    console.log(depto.id);
    this.dptoService.getDpto(depto.id).subscribe(
      (res: any) => {
        this.dpto = res['data'];
        // this.periodo = res.data;
        console.log(this.dpto);
      }
    );
  }
  agregarDpto() {
    this.dpto.nombre = this.formulario.value.nombre;
    // this.dpto.nombre = this.formulario.value.nombre.toUpperCase();//sirve para poner en mayuscula
    // console.log(this.dpto.nombre);
    this.dptoService.postDpto(this.dpto).subscribe((res: any) => {
      console.log(res);
      this.openToast();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  editarDpto() {
    console.log(this.dpto);
    this.dptoService.putDpto(this.dpto).subscribe((res: any) => {
      console.log(res);
      this.openToast();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
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
        this.router.navigate(['/administracion/departamentos']);
      }
    })
  }
}
