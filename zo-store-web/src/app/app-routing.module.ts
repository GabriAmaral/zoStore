import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/authGuard/authGuard';
import { AuthGuardAdmin } from './core/authGuard/authGuardAdmin';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { ConsultarProdutosComponent } from './pages/produto/consultar-produtos/consultar-produtos.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

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
  {
    path: 'cadastro-produto',
    component: CadastroProdutoComponent,
    canActivate: [ AuthGuard, AuthGuardAdmin ]
  },
  {
    path: 'consulta-produtos',
    component: ConsultarProdutosComponent,
    canActivate: [ AuthGuard, AuthGuardAdmin ]
  },
  {
    path: 'produtos',
    component: ProdutosComponent
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { 
  public static componentsDeclarations = [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    CadastroClienteComponent,
    CadastroProdutoComponent,
    ProdutosComponent,
    PerfilUsuarioComponent,
    ConsultarProdutosComponent
  ]
}