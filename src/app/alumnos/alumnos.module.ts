import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { HomeComponent } from './home/home.component';
import { AlumnosComponent } from './alumnos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';


@NgModule({
  declarations: [
    HomeComponent,
    AlumnosComponent,
    NavbarComponent,
    PerfilComponent,
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule
  ]
})
export class AlumnosModule { }
