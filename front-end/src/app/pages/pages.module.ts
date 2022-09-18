import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutosComponent } from './produtos/produtos.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    ...componentsDeclarations,
    ...pagesComponentsDeclarations
  ]
})
export class PagesModule { }

var pagesComponentsDeclarations = [
  HomeComponent,
  LoginComponent,
  CadastroClienteComponent,
  ProdutosComponent,
  CadastroProdutoComponent
]

var componentsDeclarations = [
  MenuComponent
]
