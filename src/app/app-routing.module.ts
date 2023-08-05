import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule)
  },
  {
    path: 'jefe-academica',
    loadChildren: () => import('./academicas/academicas.module').then(m => m.AcademicasModule)
  },
  {
    path: 'jefe-extra',
    loadChildren: () => import('./extra-escolares/extra-escolares.module').then(m => m.ExtraEscolaresModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
  },
  {
    path: 'coordinacion',
    loadChildren: () => import('./coordinador/coordinador.module').then(m => m.CoordinadorModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
