import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActvidadComplementariaClase2 } from 'src/app/interfaces/act-complementaria.interface';
import { Complementarias } from 'src/app/models/complementarias.model';
import { EvdComprobatoria } from 'src/app/models/evd-comprobatoria.model';
import { TiposAct } from 'src/app/models/tipos-act.model';
import { ActividadComplementariaService } from 'src/app/services/actividad-complementaria.service';
import { TipoActividadService } from 'src/app/services/tipo-actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad-complementaria',
  templateUrl: './actividad-complementaria.component.html',
  styleUrls: ['./actividad-complementaria.component.css']
})
export class ActividadComplementariaComponent implements OnInit {
  complementarias: Complementarias[] = [];
  evdCompro: EvdComprobatoria[]=[]
  TiposActs: TiposAct[] = [];

  actComplementaria = new ActvidadComplementariaClase2();
  public totalAlumnos: number = 0;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;
  public siguiente: boolean = false;
  public anterior: boolean = false;
  public page: number = 1;
  public isAll: boolean = false;
  constructor(private router: Router,
    private tipoActService: TipoActividadService,
    private actComplementariaService: ActividadComplementariaService,
  ) { }
  ngOnInit(): void {
    //this.obtenerActComplementarias();
    this.obtenerActComplementarias2(this.paginaActual);
    this.obtenerTiposActividades();
  }
  obtenerActComplementarias(){
    this.actComplementariaService.getActComplementarias().subscribe((res: any) => {
      this.complementarias = res.data;
     // console.log(this.complementarias);
      // console.log(res);

    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerActComplementarias2(index: number) {
    this.actComplementariaService.getActComplementariasPaginado(index).subscribe((res: any) => {
      this.complementarias = res.data.actividad;
     // this.alumnosTemp = this.alumnos;
      this.totalAlumnos = res.data.total;
      this.totalPaginas = res.data.paginas;
      this.paginaActual = index;
      //console.log(this.complementarias);
      // console.log(res);
      if (index == this.totalPaginas && index == 1) {
        this.anterior = false;
        this.siguiente = true;
        return
      }
      if (index == 1) {
        this.anterior = false;
        this.siguiente = false;
      }
      if (index == this.totalPaginas) {
        this.anterior = true;
        this.siguiente = true;
      }
      if (index > 1 && index < this.totalPaginas) {
        this.anterior = true;
        this.siguiente = false;
      }
    }, ((error: any) => {
      console.log(error);
    }));
  }
  cambiarPagina(valor: number) {
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
    this.obtenerActComplementarias2(this.paginaActual);
   

  }
  numSequence(n: number): Array<number> {
    let m = n;
    return Array(m);
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
  eliminarActComplementaria(actCom: any) {
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
          console.log(actCom);
          this.actComplementariaService.deleteActComplementaria(actCom.id).subscribe(
            (res: any) => {
              this.actComplementaria = res['data'];
              console.log(this.actComplementaria);
              // this.obtenerEvdsPresentar();

              this.obtenerActComplementarias();
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
  obtenerTiposActividades() {
    this.tipoActService.getTipoActividades().subscribe((res: any) => {
      this.TiposActs = res.data;
      //console.log(this.TiposActs);
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
}
