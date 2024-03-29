import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/authGuard/authGuard';
import { AuthGuardAdmin } from './core/authGuard/authGuardAdmin';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { CadastroProdutoComponent } from './pages/produto/cadastro-produto/cadastro-produto.component';
import { HomeGerenciarComponent } from './pages/home-gerenciar/home-gerenciar.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { AlterarProdutoComponent } from './pages/produto/alterar-produto/alterar-produto.component';
import { ConsultarProdutosComponent } from './pages/produto/consultar-produtos/consultar-produtos.component';
import { ConsultarClientesComponent } from './pages/cliente/consultar-clientes/consultar-clientes.component';
import { HomeInfosComponent } from './pages/home-gerenciar/home-infos/home-infos.component';
import { DetalhesCarrinhoComponent } from './pages/detalhes-carrinho/detalhes-carrinho.component';
import { DetalheProdutoComponent } from './pages/detalhe-produto/detalhe-produto.component';
import { ProdutosUsuarioComponent } from './pages/produtos-usuario/produtos-usuario.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ProdutosClienteComponent } from './pages/cliente/produtos-cliente/produtos-cliente.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { TicketsListComponent } from './pages/ticket/tickets-list/tickets-list.component';
import { SharedModule } from './shared/shared.module';
import { TicketsListUserComponent } from './pages/ticket/tickets-list-user/tickets-list-user.component';
import { TicketChatComponent } from './pages/ticket/ticket-chat/ticket-chat.component';

var routes = [
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
    path: 'produtos',
    component: ProdutosComponent
  },
  {
    path: 'produto/:id',
    component: DetalheProdutoComponent,
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'detalhes-carrinho',
    component: DetalhesCarrinhoComponent,
  },
  {
    path: 'meus-produtos',
    component: ProdutosUsuarioComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'novo-ticket',
    component: TicketComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'meus-tickets',
    component: TicketsListUserComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'chat-ticket/:id',
    component: TicketChatComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'gerenciar',
    component: HomeGerenciarComponent,
    canActivate: [ AuthGuard, AuthGuardAdmin ],
    children: [
      {
        path: '',
        component: HomeInfosComponent,
      },
      {
        path: 'cadastro-produto',
        component: CadastroProdutoComponent,
      },
      {
        path: 'consultar-produtos',
        component: ConsultarProdutosComponent,
      },
      {
        path: 'alterar-produto/:id',
        component: AlterarProdutoComponent,
      },
      {
        path: 'consultar-clientes',
        component: ConsultarClientesComponent
      },
      {
        path: 'consultar-tickets/:status',
        component: TicketsListComponent
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ 
    RouterModule,
    SharedModule
  ]
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
    HomeGerenciarComponent,
    ConsultarProdutosComponent,
    AlterarProdutoComponent,
    ConsultarClientesComponent,
    HomeInfosComponent,
    DetalhesCarrinhoComponent,
    DetalheProdutoComponent,
    ProdutosUsuarioComponent,
    TicketComponent,
    ProdutosClienteComponent,
    TicketsListComponent,
    TicketsListUserComponent,
    TicketChatComponent
  ]
}