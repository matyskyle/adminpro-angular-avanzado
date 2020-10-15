import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

//RUTAS PAGES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AjustesUsuarioComponent } from './ajustes-usuario/ajustes-usuario.component';
import { FormularioComponent } from './formulario/formulario.component'
//RUTAS SHARED
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
//RUTAS COMPONENTS
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { platformBrowser } from '@angular/platform-browser';

//SERVICIOS
import { ServiceModule } from '../services/service.module';
import { PasswordValidationDirective } from './formulario/validations/password-validation.directive';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';;

@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AjustesUsuarioComponent,
        FormularioComponent,
        PasswordValidationDirective,
        PromesasComponent,
        RxjsComponent,
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ReactiveFormsModule,
      ChartsModule,
      BrowserModule,
      ServiceModule
    ]
})
export class PagesModule {}
