import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authService/auth.service';
import { Cliente } from '../../cadastro-cliente/model/cadastro-cliente.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isScrollTop = true;
  usuarioMenu = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onWindowScroll()
    this.usuarioMenu = this.authService.usuarioLogado

    this.authService.usuarioLogadoMenu.subscribe(user => {
      this.usuarioMenu = user
    });
  }

  navigateLogin() {
    if(this.usuarioMenu == null) this.router.navigateByUrl("/login");

    this.authService.desconectar();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
      this.isScrollTop = true
    else
      this.isScrollTop = false
  }
}
