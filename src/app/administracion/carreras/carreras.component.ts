import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarreraClase } from 'src/app/interfaces/carrera.interface';
import { Carreras } from 'src/app/models/carreras.model';
import { JefeDptos } from 'src/app/models/jefedpto.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { JefeDptoService } from 'src/app/services/jefe-dpto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  selectedOption: any;
  carreras: Carreras[] = [];
  carrera = new CarreraClase();
  jdptos: JefeDptos[] = [];
  //validaciones en los inputs
  isValidSubmit: boolean = false;//validacion padre
  isbanderaC1: boolean = false; //validacion hijo
  isbanderaC2: boolean = false; //validacion hijo
  isbanderaC3: boolean = false; //validacion hijo
  constructor(private carreraService: CarrerasService, private jefedptoService: JefeDptoService, private router: Router) { }
  // inicio del componente
  ngOnInit(): void {
    //this.formularioReactivo();
    this.obtenerJefeDptos();
    this.obtenerCarreras();
  }
  //consultas
  obtenerJefeDptos() {
    this.jefedptoService.getJefeDptos().subscribe((res: any) => {
      this.jdptos = res.data;
      console.log(this.jdptos);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerCarreras() {
    this.carreraService.getCarreras().subscribe((res: any) => {
      this.carreras = res.data;
      console.log(this.carreras);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerCarrera(carrea: any) {
    this.carreraService.getCarrera(carrea.id).subscribe(
      (res: any) => {
        // this.periodo = res['data'];
        this.carrera= res.data;
       // console.log(this.carrera);
      }
    );
  }
  //guardar registro
  agregarCarrera() {
   // console.log(this.carrera);
    this.carreraService.postCarrera(this.carrera).subscribe((res: any) => {
      //console.log(res);
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
  //editar registro
  editarCarrera() {
    //console.log(this.carrera);//hacer prueba
    this.carreraService.putCarrera(this.carrera).subscribe(
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
  // eventos 
private validateModel(valorInput: string) {
    return !!valorInput && valorInput.length > 3;
  }
  selectJdpto(valorInput: any){
    this.carrera.jdepto = valorInput.target.value;
    console.log(this.carrera.jdepto);
    this.isbanderaC3 = true;
    this.validacion();
  }
  nombreS(valorInput: string) {
    //console.log(valorInput);
    if (valorInput == ''){
      this.isbanderaC1 = false;
      this.isValidSubmit = false;
    } else if (valorInput && valorInput.length > 3){
      this.isbanderaC1 = this.validateModel(valorInput);
      this.validacion();
    }
    else{
      this.isValidSubmit = false;
    }
    
  }
  nombreCorto(valorInput: string){
    //console.log(valorInput);
    if (valorInput == ''){
      this.isbanderaC2 = false;
      this.isValidSubmit = false;
    }else{
      if (valorInput && valorInput.length > 3){
        this.isbanderaC2 = true;
        this.validacion();
      }else{
        this.isValidSubmit = false;
      }
    }
  }
  validacion(){
    if (this.isbanderaC1 && this.isbanderaC2 && this.isbanderaC3) {
      this.isValidSubmit = true;
    }
  }
  
  //mensaje y eventos de alaert con swal
  eliminarCarrera(carrera: any) {
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
          console.log(carrera);
          this.carreraService.deleteCarrera(carrera.id).subscribe(
            (res: any) => {
              //this.carrera = res['data'];
              //console.log(this.carrera);
              //location.reload();
              this.obtenerCarreras();
              this.limpiarControls();
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
      title: 'Guardado correctamente.',
    }).then((result)=>{
      this.obtenerCarreras();
      this.limpiarControls();
      //this.router.navigate(['/administracion/carreras']);
    })
  }
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/administracion/carreras']);
      }
    })
  }
  limpiarControls(): void {
    this.carrera.nombre = '';
    this.carrera.nombre_corto = '';
    
    this.isbanderaC1 = false;
    this.isbanderaC2 = false;
    this.isbanderaC3 = false;
    this.validacion();
    //this.formulario.reset();
  }
}
