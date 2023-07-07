import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraEscolaresRoutingModule } from './extra-escolares-routing.module';
import { ExtraEscolaresComponent } from './extra-escolares.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistroComponent } from './registro/registro.component';

import { ConstanciaComponent } from './constancia/constancia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoordinarComponent } from './coordinar/coordinar.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    ExtraEscolaresComponent,
    HomeComponent,
    NavbarComponent,
    RegistroComponent,
    CoordinarComponent,
    ConstanciaComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ExtraEscolaresRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExtraEscolaresModule { }
