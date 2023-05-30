import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { HomeComponent } from './home/home.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent,
    children: [
      { path: 'actividades', component: HomeComponent },
      { path: 'registrarse', component: RegistrarseComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '**', redirectTo: 'actividades' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
