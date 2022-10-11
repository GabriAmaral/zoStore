import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authService/auth.service';
import { Cliente } from '../../cadastro-cliente/model/cadastro-cliente.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isScrollTop: any = true;
  usuarioMenu: any = null;

  @Input() onlyUserInfos: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.onWindowScroll()
    this.usuarioMenu = this.authService.usuarioLogado

    this.authService.usuarioLogadoMenu.subscribe((user: any) => {
      this.usuarioMenu = user
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150)
      this.isScrollTop = true
    else
      this.isScrollTop = false
  }
}
