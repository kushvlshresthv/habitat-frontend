import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.loggedIn$.subscribe(value=> this.isLoggedIn = value)
  }
}
