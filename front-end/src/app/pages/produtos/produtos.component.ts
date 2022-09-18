import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  produtos = [
    {
      Nome: "",
      Descricao: "",
      Valor: 0,
      Imagem: ""
    }
  ]

  constructor(
    private baseApi: BaseApiService
  ) { }

  ngOnInit() {
    this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutos").subscribe((res: any) => {
      console.log(res)
      this.produtos = res
    })
  }


}
