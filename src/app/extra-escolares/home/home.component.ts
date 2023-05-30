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
  tipo: string = '';
  constructor(private router: Router, 
    private actComplementariaService: ActividadComplementariaService){
  }
  ngOnInit(): void {
    this.obtenerActComplementarias();
  }

  obtenerActComplementarias() {
    this.tipo = '2';
    this.actComplementariaService.getTipoActComplementarias(this.tipo).subscribe((res: any) => {
      this.complementarias = res.data;
      console.log(this.complementarias);
      // console.log(res);

    }, ((error: any) => {
      console.log(error);
    }));
  }

}

