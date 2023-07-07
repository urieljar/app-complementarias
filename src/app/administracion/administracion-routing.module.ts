import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { HomeComponent } from './home/home.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { JefedepartamentoComponent } from './jefedepartamento/jefedepartamento.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';
import { ActividadComplementariaComponent } from './actividad-complementaria/actividad-complementaria.component';
import { CrudActividadComponent } from './crud-actividad/crud-actividad.component';
import { EditarActividadComponent } from './editar-actividad/editar-actividad.component';

import { CoordinadoresComponent } from './coordinadores/coordinadores.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'periodos', component: PeriodosComponent },
      { path: 'carreras', component: CarrerasComponent },
      { path: 'departamentos', component: DepartamentosComponent },
      { path: 'jefes', component: JefedepartamentoComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'tipos-actividad', component: TipoActividadComponent },
      { path: 'complementaria', component: ActividadComplementariaComponent },
      { path: 'crud-actividad', component: CrudActividadComponent },
      { path: 'editar-actividad/:id', component: EditarActividadComponent },
      { path: 'coordinadores', component: CoordinadoresComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
