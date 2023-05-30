import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraEscolaresComponent } from './extra-escolares.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { ConstanciaComponent } from './constancia/constancia.component';

const routes: Routes = [
  {
    path: '',
    component: ExtraEscolaresComponent,
    children: [
      { path: 'extraescolares', component: HomeComponent },
      { path: 'registrar', component: RegistroComponent },
      { path: 'evaluacion', component: EvaluacionComponent },
      { path: 'acreditacion', component: ConstanciaComponent },
      { path: '**', redirectTo: 'extraescolares' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraEscolaresRoutingModule { }
