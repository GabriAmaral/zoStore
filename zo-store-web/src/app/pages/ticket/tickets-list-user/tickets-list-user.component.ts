import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tickets-list-user',
  templateUrl: './tickets-list-user.component.html',
  styleUrls: [
    './tickets-list-user.component.scss',
    '../../../shared/styles/default-form.scss'
  ]
})
export class TicketsListUserComponent implements OnInit {
  tickets: any = []

  constructor(
    private baseApi: BaseApiService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.buscarUsuario(false).then(user => {
      this.baseApi.get(environment.baseApi + `api/Ticket/BuscarTicketsCliente?idCliente=${user.id}`).subscribe((res: any) => {
        this.tickets = res
      })
    })
  }
}
