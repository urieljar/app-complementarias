import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { JefedepartamentoComponent } from './jefedepartamento/jefedepartamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';
import { ActividadComplementariaComponent } from './actividad-complementaria/actividad-complementaria.component';
import { CrudActividadComponent } from './crud-actividad/crud-actividad.component';
import { EditarActividadComponent } from './editar-actividad/editar-actividad.component';


@NgModule({
  declarations: [
    AdministracionComponent,
    HomeComponent,
    NavbarComponent,
    PeriodosComponent,
    CarrerasComponent,
    DepartamentosComponent,
    JefedepartamentoComponent,
    AlumnosComponent,
    TipoActividadComponent,
    ActividadComplementariaComponent,
    CrudActividadComponent,
    EditarActividadComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class AdministracionModule { }
