import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { RegistroComponent } from './registro/registro.component';
import { ConstanciaComponent } from './constancia/constancia.component';
import { AcademicasComponent } from './academicas.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicasComponent,
    children: [
      { path: 'academicas', component: HomeComponent },
      { path: 'registrar', component: RegistroComponent },
      { path: 'evaluacion', component: EvaluacionComponent },
      { path: 'acreditacion', component: ConstanciaComponent },
      { path: '**', redirectTo: 'academicas' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicasRoutingModule { }
