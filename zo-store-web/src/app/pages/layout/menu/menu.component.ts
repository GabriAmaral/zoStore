import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authService/auth.service';
import { BaseApiService } from 'src/app/core/baseApi/base-api.service';
import { CartService } from 'src/app/core/cartService/cart.service';
import { environment } from 'src/environments/environment';
import { Cliente } from '../../cadastro-cliente/model/cadastro-cliente.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public opened: boolean = false;
  public animateOpen: boolean = false

  isScrollTop: any = true;

  usuarioMenu: any = null;
  
  cart: any = [];
  itensCart: any = []
  valorTotalCart = 0

  @Input() onlyUserInfos: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public authService: AuthService,
    public cartService: CartService,
    private baseApi: BaseApiService,
  ) { }

  ngOnInit() {
    this.onWindowScroll()
    this.usuarioMenu = this.authService.usuarioLogado

    this.authService.usuarioLogadoMenu.subscribe((user: any) => {
      this.usuarioMenu = user
    });

    this.cartService.cartEvent.subscribe((cart: any) => {
      this.cart = cart

      this.getItensCart()
    });

    this.cartService.buscarInfosCart().then(result => {
      this.cart = result || []

      this.getItensCart()
    })

    setTimeout(() => {
      this.animateOpen = true
    }, 100)
  }

  getItensCart() {
    this.itensCart = []
    this.valorTotalCart = 0

    if(this.cart.length > 0) {
      this.baseApi.get(environment.baseApi + "api/Produto/BuscarProdutos").subscribe((produtos: any) => {
        this.cart.forEach((item: number) => {
          let index = produtos?.findIndex((x: any) => x.id == item)
  
          if(index == -1) {
            this.cartService.removerItemCart(item)
          } else
            this.itensCart.push(produtos[index])
            this.valorTotalCart += produtos[index].valor
        });
      })
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
      this.isScrollTop = true
    else
      this.isScrollTop = false
  }
}
