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
  produtoSelect: any = null;

  model: any = null

  constructor(
    private formBuilder: FormBuilder,
    private baseApi: BaseApiService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loadInfos(false)

    this.model = this.formBuilder.group({
      id: [ 0 ],
      idCliente: [ 0, Validators.required ],
      assunto: [ '', Validators.required ],
      mensagem: [ '', Validators.required ],
      status: [ 1 ],
      idProduto: [ 0 ],
    });
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

  onSubmit() {
    this.authService.buscarUsuario(false).then(user => {
      if(!user)
        return

      this.model.value.idCliente = user.id;
      this.model.value.idProduto = this.produtoSelect;

      this.baseApi.post(environment.baseApi + "api/Ticket/CriarNovoTicket", this.model.value).subscribe((res: any) => {
        if(res?.error) {
          this.toastr.error(res?.error.toString(), 'Ops');
  
          return
        }

        if(res) {
          this.toastr.success("Ticket Aberto com sucesso", "");
          // this.router.navigateByUrl("/gerenciar/consultar-produtos")

          this.baseApi.post(environment.baseApi + "api/Ticket/NovaMensagemTicket", {
            id: 0,
            idTicket: res,
            idRemetente: user.id,
            mensagem: this.model.value.mensagem
          }).subscribe((res: any) => {
            if(res?.error) {
              this.toastr.error(res?.error.toString(), 'Ops');
      
              return
            }

            if(res) {
              this.router.navigateByUrl("/meus-tickets")
            }
          })
        }
      })
    })
  }
}
