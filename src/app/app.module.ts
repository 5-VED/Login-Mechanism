import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeServiceService } from './Services/employee-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ClientPaginationComponent } from './client-pagination/client-pagination.component';
import { ServerPaginationComponent } from './server-pagination/server-pagination.component';
import {AuthGuard} from "./Services/auth.guard";
import 'datatables.net-rowgroup-bs4'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomePageComponent,
    HeaderComponent,
    ClientPaginationComponent,
    ServerPaginationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
    ],
  providers: [EmployeeServiceService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
