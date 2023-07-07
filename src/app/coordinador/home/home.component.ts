import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActCoordinadaClase2 } from 'src/app/interfaces/act-coordinada.interface';
import { ActividadCoordinadas } from 'src/app/models/actividad-coordinada.model';
import { EvdComprobatoria } from 'src/app/models/evd-comprobatoria.model';
import { ActividadComplementariaService } from 'src/app/services/actividad-complementaria.service';
import { ActividadCoordinadaService } from 'src/app/services/actividad-coordinada.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  coordinador: any;
  actCoordinadas: ActividadCoordinadas[] =[];
  actCoordinada2 = new ActCoordinadaClase2();
  evdCompro: EvdComprobatoria[] = []
  constructor(
    private router: Router,
    private actCoordinadaService: ActividadCoordinadaService,
    private actComplementariaService: ActividadComplementariaService,
    ) { }
  ngOnInit(): void {
    this.coordinador = localStorage.getItem('rfc');
    this.obtenerActComplementarias();
  }
  obtenerActComplementarias() {
    //ojo aqui
    this.actCoordinadaService.getActividadesCoordinador(this.coordinador).subscribe((res: any) => {
      this.actCoordinadas = res.data;
     // console.log(this.actCoordinadas);
      // console.log(ress);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerEvdComprobatorias(evdComprobatorias: any) {
    console.log(evdComprobatorias);
    this.actComplementariaService.getEvdComprobatorias(evdComprobatorias).subscribe((res: any) => {
      this.evdCompro = res.data;
    }, ((error: any) => {
      console.log(error);
    }));
  }
}
