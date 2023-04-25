import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { AuthService, cyrb53 } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes-carrinho',
  templateUrl: './ticket.html',
  styleUrls: [
    './ticket.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class TicketComponent implements OnInit {

  produtos: any = []
  produtoSelect = null;

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loadInfos(false)
  }

  loadInfos(atualizar: boolean) {
    this.authService.buscarUsuario(atualizar).then(user => {
      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutosCliente?idCliente=" + user.id).subscribe((res: any) => {
        this.produtos = res
      })
    })
  }

  ngOnInit() {
  }

 

}
