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
export class CartService {
  public cart: any = [];
  public cartEvent: any = new EventEmitter<any>();

  constructor(
    private router: Router, 
    private baseApi: BaseApiService,
    private toastr: ToastrService
  ) {
    this.buscarInfosCart().then(result => {
      this.cart = result || []
      
      this.cartEvent.emit(this.cart);
    })
  }

  buscarInfosCart(): Promise<any> {
    let promise = new Promise<any>((response, reject) => {
      let cart = this.getCookie("cart")

      if(cart) {
        cart = JSON.parse(cart)
      }

      response(cart)
    });

    return promise;
  }

  adicionarItemCart(item: any) {
    if(this.cart.findIndex((x: any) => x == item) != -1)
      this.toastr.error("Este item já está em seu carrinho", "Ops");
    else {
      this.cart.push(item)
      this.setCookie("cart", JSON.stringify(this.cart), 7)

      this.cartEvent.emit(this.cart);
    }
  }

  removerItemCart(item: any) {
    let index = this.cart.findIndex((x: any) => x == item);

    if(index != -1) {
      this.cart.splice(index, 1)
      this.setCookie("cart", JSON.stringify(this.cart), 7)
    }

    this.cartEvent.emit(this.cart)
  }

  limparCart() {
    this.cart = []
    this.deleteCookie("cart")

    this.cartEvent.emit(this.cart);
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

export const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString()
};
