import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: [
    './produtos.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class ProdutosComponent implements OnInit {
  produtos: any = [
    {
      Nome: "",
      Descricao: "",
      Valor: 0,
      Imagem: ""
    }
  ]

  constructor(
    private baseApi: BaseApiService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutos").subscribe((res: any) => {
      this.produtos = res
    })
  }

  addItemCart(item: any) {
    this.cartService.adicionarItemCart(item)
  }
}
