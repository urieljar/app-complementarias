import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carreras } from 'src/app/models/carreras.model';
import { Departamento } from 'src/app/models/departamento.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { JefeDptoService } from 'src/app/services/jefe-dpto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public totalAlumnos: number = 0;
  public carrerasdisponibles: number = 0;
  public totalJefesDpto: number = 0;
  public totalCoordinadores: number = 0;
  carreras: Carreras[] = [];
  dptos: Departamento[] = [];
  constructor(
    private carreraService: CarrerasService, 
    private alumnoService: AlumnosService, 
    private coordinadorService: CoordinadorService,
    private dptoService: DepartamentosService, 
    private jefedptoService: JefeDptoService, 
    private router: Router) { }
  // inicio del componente
  ngOnInit(): void {
    //this.formularioReactivo();
    this.obtenerCarreras();
    this.obtenerDptos();
    this.Alumnos(1);
    this.Carreras();
    this.JefesDpto();
    this.coordinadores();
  }
  obtenerCarreras() {
    this.carreraService.getCarreras().subscribe((res: any) => {
      this.carreras = res.data;
     // console.log(this.carreras);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  obtenerDptos() {
    this.dptoService.getDptos().subscribe((res: any) => {
      this.dptos = res.data;
      //console.log(this.dptos);
     // console.log(res);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  Alumnos(index: number) {
    this.alumnoService.getAlumnosPaginado(index).subscribe((res: any) => {
      this.totalAlumnos = res.data.total;
      // console.log(this.totalAlumnos);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  coordinadores(){
    this.coordinadorService.contarCoordinadores().subscribe((res: any) => {
      this.totalCoordinadores = res.data;
      console.log(this.totalCoordinadores);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  
  Carreras(){
    this.carreraService.contarCarreras().subscribe((res: any) => {
      this.carrerasdisponibles = res.data;
      // console.log(this.carrerasdisponibles);
    }, ((error: any) => {
      console.log(error);
    }));
  }
  JefesDpto(){
    this.jefedptoService.contarJefeDpto().subscribe((res: any) => {
      this.totalJefesDpto = res.data;
      //console.log(this.totalJefesDpto);
    }, ((error: any) => {
      console.log(error);
    }));
  }
}
