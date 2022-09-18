import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/pages/cadastro-cliente/model/cadastro-cliente.model';
import { BaseApiService } from '../baseApi/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogado: Cliente = null;
  usuarioLogadoMenu = new EventEmitter<Cliente>();

  constructor(
    private router: Router,
    private baseApi: BaseApiService,
  ) { }

  fazerLogin(usuario) {
    this.usuarioLogado = usuario;
    this.usuarioLogadoMenu.emit(usuario);
  }

  desconectar() {
    this.usuarioLogado = null;
    this.usuarioLogadoMenu.emit(null);
  }
}
