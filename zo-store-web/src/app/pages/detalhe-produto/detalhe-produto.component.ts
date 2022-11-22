import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: [
    './detalhe-produto.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class DetalheProdutoComponent implements OnInit {
  produto: any = {
    Nome: "",
    Descricao: "",
    Valor: 0,
    Imagem: ""
  }

  constructor(
    private baseApi: BaseApiService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      let idProd = params['id']

      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProduto?id=" + idProd).subscribe((res: any) => {
        this.produto = res
      })
    });
  }

  ngOnInit() {
    
  }

  addItemCart(item: any) {
    this.cartService.adicionarItemCart(item)
  }
}
