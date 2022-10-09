import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authService/auth.service';
import { Cliente } from '../../cadastro-cliente/model/cadastro-cliente.model';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isScrollTop: any = true;
  usuarioMenu: any = null;

  @Input() typeUser: boolean = false;

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
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
      this.isScrollTop = true
    else
      this.isScrollTop = false
  }
}
