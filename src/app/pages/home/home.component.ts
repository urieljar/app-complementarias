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
    this.formSubmitted = true; //envia el formulario posteado
    console.log(this.miformulario.value);
    if(this.miformulario.valid){
      //realizar el posteo
      this.usuarioService.accederAlumno(this.miformulario.value)
          .subscribe(  res =>{
            //window.location.reload();//recarga la pagina actual
            Swal.fire('Hola!', 'Usuario Autenticado', 'success').then((result) => {
              //location.reload();
              this.router.navigate(['/alumnos']);
              // this.router.navigateByUrl('/alumnos');
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
    this.formSubmitted = true; //envia el formulario posteado
    console.log(this.formJefeDepa.value);
    if (this.formJefeDepa.valid) {
      //realizar el posteo
      this.usuarioService.accederJfDpto(this.formJefeDepa.value)
        .subscribe((res:any) => {
          // Swal.fire('Hola!', 'Usuario Autenticado', 'success').then(result => {
          //   location.reload();
          // });
          console.log(res.data);
          if (res.data.departamento == 1) {
            //acceso al panel del administrador 
            Swal.fire('Hola!', 'Usuario Autenticado', 'success').then(result => {
               //location.reload();
                this.router.navigate(['/administracion']);
            });
            // this.router.navigateByUrl('/administracion');
          } else if (res.data.departamento==2){
            //acceso al panel del extraescolares
              Swal.fire('Hola!', 'Usuario Autenticado', 'success').then(result => {
                //location.reload();
                this.router.navigateByUrl('/jefe-extra');
              });
           
          } else if (res.data.departamento == 3 || res.data.departamento == 4 || res.data.departamento == 5){
            
            Swal.fire('Hola!', 'Usuario Autenticado', 'success').then(result => {
              //location.reload();
              this.router.navigateByUrl('/jefe-academica');
            }); 
          }
          localStorage.setItem('rfc', res.data.rfc);
          localStorage.setItem('departamento', res.data.departamento);
          // this.router.navigateByUrl('/jefe-academica');
          
        }, (err) => {
          Swal.fire('Error', err.error.mensaje, 'error');
          console.log(err.error.mensaje);
        });
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
