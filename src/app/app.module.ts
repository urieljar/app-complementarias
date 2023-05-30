import {LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { AcademicasModule } from './academicas/academicas.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { ExtraEscolaresModule } from './extra-escolares/extra-escolares.module';
import { AdministracionModule } from './administracion/administracion.module';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    AcademicasModule,
    ExtraEscolaresModule,
    AlumnosModule,
    AdministracionModule,
    ComponentsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
