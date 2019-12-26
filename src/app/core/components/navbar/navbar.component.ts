import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() { this.authService.logout(); }

  reload() {
    let sidebar = document.getElementById('overlay');

    sidebar.style.height = "0";
    location.reload;
  }

  openSidebar() {
    let sidebar = document.getElementById('overlay');
    let closeBtn = document.getElementById('closeBtn');

    sidebar.style.height = "100%";

    setTimeout(() => {
      closeBtn.style.display = "block";
    }, 600)
  }

  closeSidebar() {
    let sidebar = document.getElementById('overlay');
    let closeBtn = document.getElementById('closeBtn');

    sidebar.style.height = "0";

    setTimeout(() => {
      closeBtn.style.display = "none";
    }, 400)
  }
}
