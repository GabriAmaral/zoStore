import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-home-gerenciar',
  templateUrl: './home-gerenciar.component.html',
  styleUrls: ['./home-gerenciar.component.scss']
})
export class HomeGerenciarComponent implements OnInit {
  public opened: boolean = false;
  public animateOpen: boolean = false

  constructor(private router: Router) { 
    setTimeout(() => {
      this.animateOpen = true
    }, 100)

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.opened = false
      }
    });
  }

  ngOnInit() {
  }

}
