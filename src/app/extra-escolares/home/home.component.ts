import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Complementarias } from 'src/app/models/complementarias.model';
import { ActividadComplementariaService } from 'src/app/services/actividad-complementaria.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  complementarias: Complementarias[] = [];
  tipo: string = '2';

  //variables paginado paginados
  public siguiente: boolean = false;
  public anterior: boolean = false;
  public totalActividades: number = 0;
  public paginaActual: number = 1;
  public totalPaginas: number = 0;
  public page: number = 1;
  //public isAll: boolean = false;
  constructor(private router: Router, 
    private actComplementariaService: ActividadComplementariaService){
  }
  ngOnInit(): void {
    this.obtenerActComplementarias(this.paginaActual);
  }
  obtenerActComplementarias(index: number) {
    //this.tipo = '2';
    this.actComplementariaService.getTipoActComplementarias(this.tipo, index).subscribe((res: any) => {
      this.complementarias = res.data.actividad;
      this.totalActividades = res.data.total;
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
      if (index == this.totalPaginas) {
        this.anterior = true;
        this.siguiente = true;
      }
      if (index > 1 && index < this.totalPaginas) {
        this.anterior = true;
        this.siguiente = false;
      }
      //console.log(this.complementarias);

    }, ((error: any) => {
      console.log(error);
    }));
  }
  numSequence(n: number): Array<number> {
    let m = n;
    return Array(m);
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
    this.obtenerActComplementarias(this.paginaActual);
    // if (this.isAll) {
    //   this.cargarAlumnos(this.paginaActual);
    // } else {
    //   this.buscarCarrera(this.carreraActual, this.paginaActual)
    // }

  }
}

