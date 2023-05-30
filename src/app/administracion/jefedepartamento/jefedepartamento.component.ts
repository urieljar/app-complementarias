import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { JefeDptoClase } from 'src/app/interfaces/jefe-departamento.interface';
import { Departamento } from 'src/app/models/departamento.model';
import { JefeDptos } from 'src/app/models/jefedpto.model';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { JefeDptoService } from 'src/app/services/jefe-dpto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jefedepartamento',
  templateUrl: './jefedepartamento.component.html',
  styleUrls: ['./jefedepartamento.component.css']
})
export class JefedepartamentoComponent implements OnInit {
  // creacion de objetos para enviar o recibir informacion de la bases de datos  ///
  jdptos: JefeDptos[] = [];
  dptos: Departamento[] = [];
  jdpto = new JefeDptoClase();
  //formulario//
  formulario: any;
  ///variables para fechas////
  submitted = false;
  title = 'Como Limitar Rangos de Fecha en un Calendario con Angular';
  ahora: any;
  deshabilitar: any;
  ///variables para ver el pasword///
  visible: boolean = true;
  changetype: boolean = true;
  constructor(private jefedptoService: JefeDptoService, private dptoService: DepartamentosService, private router: Router) { }
 // inicio del componente
  ngOnInit(): void {
    this.formularioReactivo();
    this.obtenerJefeDptos();
    this.obtenerDptos();
    const datePite = new DatePipe('en-Us')
    this.ahora = datePite.transform(new Date(), 'yyyy-MM-dd');
  }
  // formulario reractivo
  formularioReactivo(): void{
    this.formulario = new FormGroup({
      rfc: new FormControl({
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
      fecha_ingreso: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ]),
      fecha_termina: new FormControl({
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
      ]),
      departamento: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required
      ])
    });
  }
  //validacion de fechas //
  fechaActual(){
    const datePite = new DatePipe('en-Us')
    this.ahora = datePite.transform(new Date(), 'yyyy-MM-dd')
  }
  cambioFecha(){
    this.deshabilitar = this.formulario.value.fecha_ingreso;
  }
  
  get f() { return this.formulario.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return
    }
    alert('Mensaje Enviado !')
  }
  // ver password //
  verPassword(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  // evento del estado de=l jefe de departamento //ya no es necesario utilizar
  obtenerstatus(valorInput: any) {
    this.jdpto.status = valorInput.target.value;
    console.log(this.jdpto.status);
  }
  
  ///consultas///
  obtenerDptos() {
    this.dptoService.getDptos().subscribe((res: any) => {
      this.dptos = res.data;
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerJefeDptos(){
    this.jefedptoService.getJefeDptos().subscribe((res: any) => {
      this.jdptos = res.data;
      console.log(this.jdptos);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerJefeDpto(jefe: any) {
    this.jefedptoService.getJefeDpto(jefe.rfc).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.jdpto = res.data;
        console.log(this.jdpto);
        this.formulario.controls['status'].setValue(this.jdpto.status);
        this.formulario.controls['nombre'].setValue(this.jdpto.nombre);
        this.formulario.controls['apellidos'].setValue(this.jdpto.apellidos);
        this.formulario.controls['departamento'].setValue(this.jdpto.departamento);
      }
    );
  }
  limpiarControls():void{
    this.formulario.controls['status'].setValue('');
    this.formulario.controls['nombre'].setValue('');
    this.formulario.controls['apellidos'].setValue('');
    this.formulario.controls['departamento'].setValue('');
  }
  // envio de datos al backend//
  agregarJefeDpto(){
    // this.jdpto.nombre = this.formulario.value.nombre;
    this.jdpto.rfc = this.formulario.value.rfc.toUpperCase().replace(/\s{2,}/g, ' ').trim();//sirve para poner en mayuscula y elimina los espacios
    this.jdpto.nombre = this.formulario.value.nombre.toUpperCase();
    this.jdpto.apellidos = this.formulario.value.apellidos.toUpperCase();
    this.jdpto.clave = this.formulario.value.clave;
    this.jdpto.status = this.formulario.value.status;
    this.jdpto.fecha_ingreso = this.formulario.value.fecha_ingreso;
    this.jdpto.fecha_termina = this.formulario.value.fecha_termina;
    this.jdpto.departamento = this.formulario.value.departamento;
   // console.log(this.jdpto.rfc);
    //console.log(this.jdpto);
    this.jefedptoService.postJefeDpto(this.jdpto).subscribe((res: any) => {
      console.log(res);
      this.openToast();
    }, (err: any) => {
      let mensajeErrorConEtiquetas = err.error.mensaje.errores;
      console.log(mensajeErrorConEtiquetas);
      let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
      this.mensajeError(mensajeError);
    });
  }
  editarJefeDpto() {
    // let periodo = new PeriodoClase();//Creamos una variable local de tipo administrador, no usamos el this.administrador
    // this.jdpto.rfc = this.formulario.value.rfc.toUpperCase().replace(/\s{2,}/g, ' ').trim();//sirve para poner en mayuscula y elimina los espacios
    this.jdpto.nombre = this.formulario.value.nombre.toUpperCase();
    this.jdpto.apellidos = this.formulario.value.apellidos.toUpperCase();
    this.jdpto.status = this.formulario.value.status;
    this.jdpto.departamento = this.formulario.value.departamento;
    console.log(this.jdpto);
    this.jefedptoService.putJefeDpto(this.jdpto).subscribe(
      res => {
        console.log(res);
        this.openToast();
      },
      err => {
        console.log('no se pudo actualizar');
      }
    );
  }
// elimnar datos en el backend  
  eliminarJefeDpto(jefe:any){
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
        ).then((result) => {
          console.log(jefe);
          this.jefedptoService.deleteJefeDpto(jefe.rfc).subscribe(
            (res: any) => {
              this.jdpto = res['data'];
              console.log(this.jdpto);
              this.obtenerJefeDptos();
              // location.reload();
            }
          );
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

  // mensajes y alertas como eventos de respuesta sobre los subscribe
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/administracion/jefes']);
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
        
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
    }).then((result)=>{
      // location.reload(),
      this.obtenerJefeDptos();
      this.limpiarControls()
    }); 
  }

}
