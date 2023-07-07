import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraEscolaresComponent } from './extra-escolares.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';

import { ConstanciaComponent } from './constancia/constancia.component';
import { CoordinarComponent } from './coordinar/coordinar.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: ExtraEscolaresComponent,
    children: [
      { path: 'extraescolares', component: HomeComponent },
      { path: 'registrar', component: RegistroComponent },
      { path: 'coordinar', component: CoordinarComponent },
      { path: 'acreditacion', component: ConstanciaComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '**', redirectTo: 'extraescolares' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraEscolaresRoutingModule { }
