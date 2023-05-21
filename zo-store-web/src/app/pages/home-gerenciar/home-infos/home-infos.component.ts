import { Component, OnInit } from '@angular/core';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-infos',
  templateUrl: './home-infos.component.html',
  styleUrls: [
    './home-infos.component.scss',
    '../../../shared/styles/default-form.scss'
  ]
})
export class HomeInfosComponent implements OnInit {
  infos = {
    qtdClientes: 0,
    qtdProdutos: 0,
    qtdVendas: 0,
    qtdTickets: 0,
  }

  constructor(
    private baseApi: BaseApiService
  ) { }

  ngOnInit() {
    this.buscarInformacoes()
  }

  buscarInformacoes() {
    this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutos").subscribe((res: any) => {
      this.infos.qtdProdutos = res?.length;
    })

    this.baseApi.get(environment.baseApi + "api/Produto/BuscarVendar").subscribe((res: any) => {
      this.infos.qtdVendas = res?.length;
    })

    this.baseApi.get(environment.baseApi + "api/Usuario/GetClientes").subscribe((res: any) => {
      this.infos.qtdClientes = res?.length;
    })

    this.baseApi.get(environment.baseApi + "api/Ticket/BuscarTickets?status=3").subscribe((res: any) => {
      this.infos.qtdTickets = res?.length;
    })
  }
}
