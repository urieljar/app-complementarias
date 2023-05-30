import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActvidadComplementariaClase2 } from 'src/app/interfaces/act-complementaria.interface';
import { Complementarias } from 'src/app/models/complementarias.model';
import { EvdComprobatoria } from 'src/app/models/evd-comprobatoria.model';
import { TiposAct } from 'src/app/models/tipos-act.model';
import { ActividadComplementariaService } from 'src/app/services/actividad-complementaria.service';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  complementarias: Complementarias[] = [];
  actComplementaria = new ActvidadComplementariaClase2();
  evdCompro: EvdComprobatoria[] = [];
  TiposActs: TiposAct[] = [];

  tipo: string = '';
  constructor(
    private router: Router,
    private tipoActService: TipoActividadService,
    private actComplementariaService: ActividadComplementariaService) {
  }
  ngOnInit(): void {
    this.obtenerActComplementarias();
  }
  obtenerActComplementarias() {
    this.tipo = '1';
    this.actComplementariaService.getTipoActComplementarias(this.tipo).subscribe((res: any) => {
      this.complementarias = res.data;
      console.log(this.complementarias);
      // console.log(res);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerActComplementaria(act: any) {
    this.actComplementariaService.getActComplementaria2(act.id).subscribe((res: any) => {
      this.actComplementaria = res.data;
      console.log(this.actComplementaria);
      this.obtenerEvdComprobatorias(this.actComplementaria);
      // console.log(res);

    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerEvdComprobatorias(evdComprobatorias: any) {
    this.actComplementariaService.getEvdComprobatorias(evdComprobatorias.id).subscribe((res: any) => {
      this.evdCompro = res.data;
      console.log(this.evdCompro);
      // console.log(res);

    }, ((error: any) => {
      console.log(error);
    }));
  }
  confirmBox() {
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
          'success'
        )
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
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }

}
