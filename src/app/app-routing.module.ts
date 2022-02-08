import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientPaginationComponent } from './client-pagination/client-pagination.component';
import { ServerPaginationComponent } from './server-pagination/server-pagination.component';
import {AuthGuard} from "./Services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'homepage',
    component: HomePageComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'clientpagination',
    component: ClientPaginationComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'serverpagination',
    component: ServerPaginationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
