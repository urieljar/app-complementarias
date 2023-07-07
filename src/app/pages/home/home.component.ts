import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public formSubmitted = false; //formulario posteado 

  public  miformulario:any = this.fb.group({
    no_control: ['', Validators.required ],
    nip: ['', Validators.required]
  });
  public formJefeDepa: any = this.fb.group({
    rfc: ['', Validators.required],
    clave: ['', Validators.required]
  });
  constructor( private router:Router,
               private fb: FormBuilder,
                private fb2: FormBuilder,
               private usuarioService:UsuarioService){}
  accedeAlumno(){
    let timerInterval: any;
    this.formSubmitted = true; //envia el formulario posteado
    console.log(this.miformulario.value);
    if(this.miformulario.valid){
      //realizar el posteo
      this.usuarioService.accederAlumno(this.miformulario.value)
          .subscribe(  res =>{
            //window.location.reload();//recarga la pagina actual
            Swal.fire({
              title: 'Entrando al sistema!!!',
              html:
                'Espere 3 segundos!' +
                '</button>',
              timer: 3000,
              didOpen: () => {
                Swal.showLoading()
              },
              willClose: () => {
                this.router.navigate(['/alumnos']);
                //location.reload();
                // this.router.navigateByUrl('/alumnos');
                clearInterval(timerInterval)
              }
            });
            localStorage.setItem('no_control', res.data.no_control);
            localStorage.setItem('nombre_completo', res.data.nombre_completo);
            localStorage.setItem('carrera', res.data.carrera);
            console.log('Usuario entrado');
            // this.router.navigate(['/alumnos']);
            console.log(res);
          },(err)=>{
            Swal.fire('Error', err.error.mensaje, 'error');
            console.log(err.error.mensaje);
          });
    }else{
      return console.log('No se puede entrar.');;
    }
    
    // if( this.miformulario.valid){
    //   console.log('Posteando formulario');
    //   this.router.navigateByUrl('/');
    // }else{
    //   console.log('Formulario no es correcto..');
    // }
  }
  accedeJfDpto(){
    let timerInterval: any;
    this.formSubmitted = true; //envia el formulario posteado
   // console.log(this.formJefeDepa.value);
    if (this.formJefeDepa.valid) {
      //realizar el posteo
      this.usuarioService.accederJfDpto(this.formJefeDepa.value)
        .subscribe((res:any) => {
          // Swal.fire('Hola!', 'Usuario Autenticado', 'success').then(result => {
          //   location.reload();
          // });
          //console.log(res.data);
          if (res.data.departamento == 1) {
            //acceso al panel del administrador 
            Swal.fire({
              title: 'Entrando al sistema!!!',
              html:
                'Espere 3 segundos!' +
                '</button>',
              timer: 3000,
              didOpen: () => {
                Swal.showLoading()
              },
              willClose: () => {
                this.router.navigate(['/administracion']);
                //location.reload();
                // this.router.navigateByUrl('/alumnos');
                clearInterval(timerInterval)
              }
            });
          } else if (res.data.departamento==2){
            //acceso al panel del extraescolares
            Swal.fire({
              title: 'Entrando al sistema!!!',
              html:
                'Espere 3 segundos!' +
                '</button>',
              timer: 3000,
              didOpen: () => {
                Swal.showLoading()
              },
              willClose: () => {
                this.router.navigateByUrl('/jefe-extra');
                clearInterval(timerInterval)
              }
            });
          } else if (res.data.departamento == 3 || res.data.departamento == 4 || res.data.departamento == 5 || res.data.departamento == 7){
            Swal.fire({
              title: 'Entrando al sistema!!!',
              html:
                'Espere 3 segundos!' +
                '</button>',
              timer: 3000,
              didOpen: () => {
                Swal.showLoading()
              },
              willClose: () => {
                this.router.navigateByUrl('/jefe-academica');
                clearInterval(timerInterval)
              }
            });
          }
          localStorage.setItem('rfc', res.data.rfc);
          localStorage.setItem('departamento', res.data.departamento);
        }, (err) => {
          Swal.fire('Error', err.error.mensaje, 'error');
          console.log(err.error.mensaje);
        });
      this.usuarioService.accederCoordinador(this.formJefeDepa.value).subscribe(
        (res: any) =>{
          Swal.fire({
            title: 'Entrando al sistema!!!',
            html:
              'Espere 3 segundos!' +
              '</button>',
            timer: 3000,
            didOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              this.router.navigate(['/coordinacion']);
              clearInterval(timerInterval)
            }
          });
          localStorage.setItem('rfc', res.data.rfc);
          //localStorage.setItem('departamento', res.data.departamento);
        },
        (err) => {
          Swal.fire('Error', err.error.mensaje, 'error');
          console.log(err.error.mensaje);
        }
      );
    } else {
      return console.log('No se puede entrar.');;
    }
  }
  campoNoValido( campo: string): boolean{
    //return false;
    if ( this.miformulario.get(campo).invalid && this.formSubmitted){
      return true;
    } else{
      return false;
    }
  }
  campoNoValido2(campo: string): boolean{
    if (this.formJefeDepa.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }
  refresh(): void { window.location.reload(); }

}
