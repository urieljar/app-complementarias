import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Periodo } from 'src/app/models/periodos.model';
import { PeriodoClase } from 'src/app/interfaces/periodo.interface';
import { PeriodosService } from 'src/app/services/periodos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit{
  periodos: Periodo[] = [];
  periodo = new PeriodoClase();


  isValidPeriodo: boolean = false;
  isbandera1: boolean = false;
  isbandera2: boolean = false;
  isbandera3: boolean = false;
  constructor(private router: Router,
    private periodoService: PeriodosService) { }
  ngOnInit():void {
    this.obtenerPeriodos();
  }
  eliminarBox(periodo: any) {
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
        ).then((result)=>{
          this.periodoService.deletePeriodo(periodo.id).subscribe(
            (res: any) => {
              this.periodo = res['data'];
              console.log(this.periodo);
              location.reload();
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
        //location.reload()
      }, 
    });
    Toast.fire({
      icon: 'success',
      title: 'Guardado correctamente.'
    }).then((result) =>{
      location.reload();
    })
  }
  obtenerPeriodos() {
   this.periodoService.getPeriodos().subscribe((res: any) => {
      this.periodos = res.data;
      console.log(this.periodos);
      console.log(res);
      // this.dtTrigger.next(0);

    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerPeriodo(periodo:any) {
    this.periodoService.getPeriodo(periodo.id).subscribe(
      (res: any) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.periodo = res['data'];
        // this.periodo = res.data;
        console.log(this.periodo);
   
      }
    );
  }
  refresh(): void { window.location.reload(); }
  editarPeriodo(){
    // let periodo = new PeriodoClase();//Creamos una variable local de tipo administrador, no usamos el this.administrador
    console.log(this.periodo);
    this.periodoService.putPeriodo(this.periodo).subscribe(
      res => {
        console.log(res);
        this.openToast();
      },
      err =>{
        console.log('no se pudo actualizar');
      }
    );
  }
  guardarPeriodo() {
    //console.log(this.periodo);
     this.periodoService.postPeriodo(this.periodo).subscribe((res: any) => {
        console.log(res);
        this.openToast();
      },(err: any)=> {
        console.log('no se pudo guardar');
         let mensajeErrorConEtiquetas = err.error.messages.error;
         console.log(mensajeErrorConEtiquetas);
         let mensajeError = mensajeErrorConEtiquetas.replace(/<[^>]*>?/g, '');
         this.mensajeError(mensajeError);
      }
    );
  }
  cambiarMesIni(valorInput: string) {
    this.periodo.mes_ini= valorInput.toUpperCase();
    this.isbandera1 = this.validateModel(valorInput);
    this.validacion();
    // this.isValidPeriodo = this.validateModel(valorInput);
  }
  private validateModel(valorInput: string){
    return !!valorInput && valorInput.length>3;
  }
  cambiarMesFin(valorInput: string){
    this.periodo.mes_fin = valorInput.toUpperCase()//pone a mayuscula a una cadena string
    this.isbandera2 = this.validateModel(valorInput);
    this.validacion();
  }
  anio(valorInput: string) {
    this.isbandera3 = this.validateModel(valorInput);
    this.validacion();
  }
  validacion(){
    if(this.isbandera1 && this.isbandera2 && this.isbandera3){
      this.isValidPeriodo = true;
    }
  }
  status(valorInput: any){
    this.periodo.status = valorInput.target.value;
    console.log(this.periodo.status);
  }
  mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/administracion/periodos']);
      }
    })
  }
}
