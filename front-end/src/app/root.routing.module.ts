import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro-cliente',
    component: CadastroClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
