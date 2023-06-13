import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegistroComponent } from './registro/registro.component';
import { ConstanciaComponent } from './constancia/constancia.component';
import { AcademicasComponent } from './academicas.component';
import { CoordinarComponent } from './coordinar/coordinar.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicasComponent,
    children: [
      { path: 'academicas', component: HomeComponent },
      { path: 'registrar', component: RegistroComponent },
      { path: 'coordinar', component: CoordinarComponent },
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
