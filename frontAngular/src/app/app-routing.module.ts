import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/components/login/login.component';
import { RegistroComponent } from './home/components/registro/registro.component';
import { DashboardComponent } from './home/components/dashboard/dashboard.component';
import { PerfilComponent } from './home/components/perfil/perfil.component';
import { AuthGuard } from './home/guards/auth,guard';


const routes: Routes = [  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
