import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './service/auth.service';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LeftSidebarComponent, RightSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.initAuthService();
    this.authService.loggedIn$.subscribe(value=> this.isLoggedIn = value)
  }
}
