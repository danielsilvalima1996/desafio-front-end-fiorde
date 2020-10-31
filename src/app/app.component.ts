import { Component } from '@angular/core';
import { PoNavbarItem } from '@po-ui/ng-components';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public menus: Array<PoNavbarItem> = [
    { label: 'Home', link: '/home' },
    { label: 'Restaurantes', link: '/restaurantes' },
    { label: 'Pratos', link: '/pratos' }
  ];

}
