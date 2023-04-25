import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos-cliente',
  templateUrl: './produtos-cliente.component.html',
  styleUrls: ['./produtos-cliente.component.scss']
})
export class ProdutosClienteComponent implements OnInit {

  produtos = [] as any

  constructor(
    public dialogRef: MatDialogRef<ProdutosClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseApi: BaseApiService
  ) {
    if(data.produtos.length)
      this.produtos = data.produtos
  }

  ngOnInit() {
  }

  removerProduto(prod: any) {
    this.baseApi.post(environment.baseApi + "api/Produto/DeletarProdutoCliente", { IdCliente: this.data.cliente, IdProduto: prod.id }).subscribe((res: any) => {
      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutosCliente?idCliente=" + this.data.cliente).subscribe((res: any) => {
        this.produtos = res
      })
    })
  }
}
