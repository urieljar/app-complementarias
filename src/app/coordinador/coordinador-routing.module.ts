import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinadorComponent } from './coordinador.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinadorComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'registros', component: RegistrarComponent },
      { path: 'evaluacion', component: EvaluacionComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinadorRoutingModule { }
