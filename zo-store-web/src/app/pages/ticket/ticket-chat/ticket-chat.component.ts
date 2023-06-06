import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { asapScheduler } from 'rxjs';
import { AuthService } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: [
    './ticket-chat.component.scss',
    '../../../shared/styles/default-form.scss'
  ]
})
export class TicketChatComponent implements OnInit {
  user = { id: 1 } as any;

  infoTicket = null as any;
  messages: any = []

  idTicket = null as any

  constructor(
    private baseApi: BaseApiService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => {
      let idTicket = params['id']
      this.idTicket = idTicket

      this.authService.buscarUsuario(false).then(user => {
        this.user = user.id
      })

      this.baseApi.get(environment.baseApi + `api/Ticket/BuscarHistoricoTicket?idTicket=${idTicket}`).subscribe((res: any) => {
          this.messages = res
      })

      this.baseApi.get(environment.baseApi + `api/Ticket/BuscarInfosTicket?idTicket=${idTicket}`).subscribe((res: any) => {
        this.infoTicket = res
      })
      
    });
  }

  ngOnInit() {
    
  }

  enviarNovaMensagem(msg: string) {
    if(msg.trim() == "" || msg == null)
      this.toastr.success("Nenhuma mensagem foi digitada", "");

    this.baseApi.post(environment.baseApi + `api/Ticket/NovaMensagemTicket`, {
      id: 0,
      idTicket: this.idTicket,
      idRemetente: this.user,
      mensagem: msg
    }).subscribe((res: any) => {
      this.messages = res.value
    })
  }

  mudarStatusTicket(ticket: any) {
    var newTicket = Object.assign({}, ticket)

    newTicket.status = ticket.status == 1 ? 0 : 1

    newTicket.usuario = null
    newTicket.produto = null

    this.baseApi.post(environment.baseApi + `api/Ticket/UpdateTicket`, newTicket).subscribe((res: any) => {
      if(res) {
        this.toastr.success(`Ticket ${ ticket.status == 1 ? 'Fechado' : 'Reaberto' } com sucesso`, "");
        this.router.navigateByUrl("/gerenciar/consultar-tickets/" + newTicket.status)
      }
    })
  }
}
