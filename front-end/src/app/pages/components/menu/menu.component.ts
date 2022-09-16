import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isScrollTop = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
    this.onWindowScroll()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
      this.isScrollTop = true
    else
      this.isScrollTop = false
  }
}
