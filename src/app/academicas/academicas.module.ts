import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AcademicasRoutingModule } from './academicas-routing.module';
import { ConstanciaComponent } from './constancia/constancia.component';
import { HomeComponent } from './home/home.component';

import { AcademicasComponent } from './academicas.component';
import { RegistroComponent } from './registro/registro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoordinarComponent } from './coordinar/coordinar.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    ConstanciaComponent,
    HomeComponent,
    CoordinarComponent,
    AcademicasComponent,
    RegistroComponent,
    NavbarComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    AcademicasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AcademicasModule { }
