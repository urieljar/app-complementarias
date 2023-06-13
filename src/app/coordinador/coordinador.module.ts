import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinadorRoutingModule } from './coordinador-routing.module';
import { CoordinadorComponent } from './coordinador.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoordinadorComponent,
    HomeComponent,
    NavbarComponent,
    RegistrarComponent,
    EvaluacionComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    CoordinadorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoordinadorModule { }
