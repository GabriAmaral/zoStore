import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, Observable } from 'rxjs';
import { Cliente } from 'src/app/pages/cadastro-cliente/model/cadastro-cliente.model';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../baseApi/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioLogado: any = false;
  public usuarioLogadoMenu: any = new EventEmitter<Cliente>();

  constructor(
    private router: Router, 
    private baseApi: BaseApiService,
    private toastr: ToastrService
  ) {
    this.buscarUsuario().then(result => {
      if(result)
        this.fazerLogin(result)
    })
  }

  buscarUsuario(atualizar = false): Promise<any> {
    let promise = new Promise<any>((response, reject) => {
      let user = this.getCookie("user")

      if(this.usuarioLogado && !atualizar)
        return response(this.usuarioLogado)

      if(user) {
        let idUser = JSON.parse(user)

        this.baseApi.get(environment.baseApi + "api/Usuario/Get?user=" + idUser).subscribe((res: any) => {
          if(res?.error) {
            this.toastr.error("Ocorreu um erro ao tentar realizar o login", "Ops");
            response(false)
          }
    
          if(res) {
            response(res)

            if(atualizar) {
              this.fazerLogin(res)
            }
          }
        })
      } else {
        response(false)
      }
    });

    return promise;
  }

  userLogado(): Observable<boolean> {
    return from(new Promise<boolean>(resolve => {
      if(this.usuarioLogado) {
        resolve(this.usuarioLogado);
      } else {
        this.buscarUsuario().then(user => {
          resolve(user);
        });
      }
    }));
  }

  userIsAdmin(): Observable<boolean> {
    return from(new Promise<boolean>(resolve => {
      if(this.usuarioLogado) {
        resolve(this.usuarioLogado);
      } else {
        this.buscarUsuario().then(user => {
          if(user?.access == 1) {
            resolve(true);
          }
  
          resolve(false);
        });
      }
    }));
  }

  fazerLogin(usuario: any) {
    this.usuarioLogado = usuario;
    this.usuarioLogadoMenu.emit(usuario);

    this.setCookie("user", JSON.stringify(usuario.id), 7)
  }

  desconectar() {
    this.usuarioLogado = false;
    this.usuarioLogadoMenu.emit(null);

    this.router.navigateByUrl("/login")
    this.deleteCookie("user")
  }

  deleteCookie(nameCookie: any) {
    document.cookie = nameCookie +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  setCookie(nameCookie: any, valueCookie: any, time: number) {
    var t = '';

    if(time) {
      var n = new Date();
      n.setTime(n.getTime() + 24 * time * 60 * 60 * 1e3),
        (t = '; expires=' + n.toUTCString());
    }

    document.cookie = nameCookie + '=' + (valueCookie || '') + t + '; path=/';
  }

  getCookie(nameCookie: any) {
    for(var o = nameCookie + '=', i = document.cookie.split(';'), t = 0; t < i.length; t++) {
      for (var n = i[t]; ' ' == n.charAt(0); ) n = n.substring(1, n.length);
      if (0 == n.indexOf(o)) return n.substring(o.length, n.length);
    }

    return null;
  }
}
