import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { LatlngPipe } from './latlng.pipe';
import { ListComponent } from './list/list.component';
import { MapFormDirective } from './map-form.directive';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    HomeComponent,
    FormComponent,
    MapComponent,
    ListComponent,
    LatlngPipe,
    MapFormDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
