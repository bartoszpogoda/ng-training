import { Component, OnInit } from '@angular/core';
import { Router, ResolveStart, ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  spinnerOn = false;

  constructor(router: Router) {
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ResolveStart) {
        this.spinnerOn = true;
      } else if (routerEvent instanceof ResolveEnd) {
        this.spinnerOn = false;
      }
    });
  }


}
