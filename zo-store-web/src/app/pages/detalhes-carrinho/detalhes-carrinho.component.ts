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
  templateUrl: './detalhes-carrinho.component.html',
  styleUrls: [
    './detalhes-carrinho.component.scss',
    '../../shared/styles/default-form.scss'
  ]
})
export class DetalhesCarrinhoComponent implements OnInit {

  cart: any = [];

  itensPaypal: any = []
  itensCart: any = [
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
    // {
    //   nome: "Asdd",
    //   valor: 1000,
    //   imagem: "https://st2.depositphotos.com/1005147/5192/i/450/depositphotos_51926417-stock-photo-hands-holding-the-sun-at.jpg"
    // },
  ]

  public payPalConfig?: IPayPalConfig;
  public waitingForPayment = false

  first = true

  valorTotalCart = 0

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    public cartService: CartService,
  ) {
    this.cart = []

    this.cartService.buscarInfosCart().then(result => {
      if(this.first) {
        this.cart = result || []
        this.first = true

        this.getItensCart()
      }
    })

    this.cartService.cartEvent.subscribe((cart: any) => {
      if(!this.first) {
        this.cart = cart
        this.getItensCart()
      }
    });
  }

  ngOnInit() {
  }

  getItensCart() {
    this.itensCart = []
    this.itensPaypal = []

    this.valorTotalCart = 0

    if(this.cart.length > 0) {
      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutos").subscribe((produtos: any) => {
        this.cart.forEach((item: number) => {
          let index = produtos?.findIndex((x: any) => x.id == item)
  
          if(index == -1) {
            this.cartService.removerItemCart(item)
          } else {
            let produto = produtos[index]
            this.itensCart.push(produto)
            
            this.itensPaypal.push({
              name: produto.nome,
              quantity: '1',
              category: 'Produto Digital',
              unit_amount: {
                currency_code: 'BRL',
                value: produto.valor.toString(),
              },
            })
            
            this.valorTotalCart += produtos[index].valor
          }
            
        });
      })
    }
  }

  configPaypalItens() {
    this.authService.buscarUsuario().then(user => {
      if(user) {
        console.log(user)

        this.cart.forEach((idProduto: any) => {
          this.baseApi.post(environment.baseApi + "api/Produto/LiberarProdutoCliente", { IdCliente: user.id, IdProduto: idProduto }).subscribe((res: any) => {
            if(res) {
              this.router.navigate(["/meus-produtos"])

              this.toastr.success("Produtos liberados com sucesso", "");
            } else {
              this.toastr.error("Ocorreu um erro ao tentar a liberação do produto", "");
            }
          })
        });
      }
    })

    // this.initConfig();
  }
 
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'BRL',
      clientId: 'AYLwkUFCoo3czWuuT_deFuSCMCOK1xk5mGaZWChYncNFzgvZRMv3RrRBi4BZRXtCJY77yjAVttcXCM3f',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'BRL',
              value: this.valorTotalCart.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'BRL',
                  value: this.valorTotalCart.toString()
                }
              }
            },

            items: this.itensPaypal
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);

        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.toastr.success("Pagamento efetuado com sucesso", "");
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
