import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: [
    './tickets-list.component.scss',
    '../../../shared/styles/default-form.scss'
  ]
})
export class TicketsListComponent implements OnInit {
  tickets: any = []

  constructor(
    private baseApi: BaseApiService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        if(val.url.includes("consultar-tickets")) {
          this.baseApi.get(environment.baseApi + `api/Ticket/BuscarTickets?status=${this.activatedroute.snapshot.paramMap.get("status")}`).subscribe((res: any) => {
            this.tickets = res
          })
        }
      }
    });
  }

  ngOnInit() {
    console.log("status oninit", this.activatedroute.snapshot.paramMap.get("status"))

    this.baseApi.get(environment.baseApi + `api/Ticket/BuscarTickets?status=${this.activatedroute.snapshot.paramMap.get("status")}`).subscribe((res: any) => {
      this.tickets = res
    })
  }

  openChatTicket(id: any) {
    this.router.navigateByUrl("/chat-ticket/" + id)
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
