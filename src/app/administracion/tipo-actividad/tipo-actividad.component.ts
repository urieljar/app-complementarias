import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoActClase } from 'src/app/interfaces/tipo-act.interface';
import { TiposAct } from 'src/app/models/tipos-act.model';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.css']
})

export class TipoActividadComponent implements OnInit {
  TiposActs: TiposAct[] = [];
  tipoAct = new TipoActClase();
  ///validacion
  isValidSubmit: boolean = false;
  isbandera1: boolean = false;
  isbandera2: boolean = false;
  constructor(private router: Router,
    private tipoActService: TipoActividadService) { }

  ngOnInit(): void {
    this.tipoAct.max_creditos = 'null';
    this.obtenerTiposActividades();
  }
  obtenerTiposActividades(){
    this.tipoActService.getTipoActividades().subscribe((res: any) => {
      this.TiposActs = res.data;
      //console.log(this.TiposActs);
      //console.log(res);
      // this.dtTrigger.next(0);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerTipoActividad(tipo: any) {
    this.tipoActService.getTipoActividad(tipo.id).subscribe(
      (res: any) => {
        this.tipoAct = res['data'];
        // this.periodo = res.data;
        //console.log(this.tipoAct);
      }
    );
  }
  guardarTipoActividad(){
    console.log(this.tipoAct);
    this.tipoActService.postTipoActividad(this.tipoAct).subscribe((res: any) => {
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
  editarTipoActividad() {
    console.log(this.tipoAct);
    this.tipoActService.putTipoActividad(this.tipoAct).subscribe(
      res => {
        //console.log(res);
        this.openToast();
      },
      err => {
        console.log('no se pudo actualizar');
      }
    );
  }
  eliminarTipoActividad(tipo: any) {
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
        Swal.fire({
          title: 'Eliminado!',
          icon: 'success',
          text: 'Su archivo ha sido eliminado.',
          showConfirmButton: false,
          timer: 1000
        }
        ).then((result) => {
          this.tipoActService.deleteTipoActividad(tipo.id).subscribe(
            (res: any) => {
              //this.tipoAct = res['data'];
              this.obtenerTiposActividades();
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
            timer: 2800
          }
        )
      }
    })
  }
  eventNombre(valorInput: string){
    // this.tipoAct.nombre = valorInput.toUpperCase()//pone a mayuscula a una cadena string
    if (valorInput == '') {
      this.isbandera1 = false;
      this.isValidSubmit = false;
    } else if (valorInput && valorInput.length > 4) {
      this.isbandera1 = this.validateModel(valorInput);
      this.validacion();
    }
    else {
      this.isValidSubmit = false;
    }
    this.isbandera1 = this.validateModel(valorInput);
    this.validacion();
  }
  eventCredito(valorInput: any) {
    this.tipoAct.max_creditos = valorInput.target.value;
    //console.log(this.tipoAct.max_creditos);
    this.isbandera2 = true;
    this.validacion();
  }
  private validateModel(valorInput: string) {
    return !!valorInput && valorInput.length > 5;
  }
  validacion() {
    if (this.isbandera1 && this.isbandera2) {
      this.isValidSubmit = true;
    }
  }
  refresh(): void { window.location.reload(); }
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
      title: 'Guardado correctamente.'
    }).then((result) => {
      this.obtenerTiposActividades();
      this.limpiarControls();
      //this.refresh();
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
        this.router.navigate(['/administracion/tipos-actividad']);
      }
    })
  }
  limpiarControls(): void {
    this.tipoAct.nombre = '';
    this.tipoAct.max_creditos = 'null';
    this.isValidSubmit =false;
    this.isbandera1 = false;
    this.isbandera2 = false;
    this.validacion();
  }
}
