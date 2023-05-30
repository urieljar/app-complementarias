import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraEscolaresRoutingModule } from './extra-escolares-routing.module';
import { ExtraEscolaresComponent } from './extra-escolares.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroComponent } from './registro/registro.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { ConstanciaComponent } from './constancia/constancia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExtraEscolaresComponent,
    HomeComponent,
    NavbarComponent,
    RegistroComponent,
    EvaluacionComponent,
    ConstanciaComponent
  ],
  imports: [
    CommonModule,
    ExtraEscolaresRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExtraEscolaresModule { }
