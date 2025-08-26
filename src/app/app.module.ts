import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpleadoCreateComponent } from './components/empleado/empleado-create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { PolizaFaltanteFormComponent } from './components/poliza-faltante-form/poliza-faltante-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/shared.module';
import { BusquedaEmpleadoModalComponent } from './components/busqueda-empleado-modal/busqueda-empleado-modal.component';
import { PolizaListadoComponent } from './components/poliza-listado/poliza-listado.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'poliza', component: PolizaFaltanteFormComponent },
  { path: 'empleado', component: EmpleadoCreateComponent },
  { path: 'listapoliza/:id/:name', component: PolizaListadoComponent },
  { path: 'busquedaemp', component: BusquedaEmpleadoModalComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    EmpleadoCreateComponent,
    PageNotFoundComponent,
    HomeComponent,
    PolizaFaltanteFormComponent,
    BusquedaEmpleadoModalComponent,
    PolizaListadoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
