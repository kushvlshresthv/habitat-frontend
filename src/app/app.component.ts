import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './service/auth.service';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    PopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.initAuthService();
    this.authService.loggedIn$.subscribe((value) => (this.isLoggedIn = value));
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Using Alt + N instead to avoid browser conflict
    const isAltPressed = event.altKey;
    const isNPressed = event.code === 'KeyN';
    const isHPressed = event.code == 'KeyH';

    if (isAltPressed && isNPressed) {
      event.preventDefault();
      this.router.navigate(['/create-todo']);
    } else if(isAltPressed && isHPressed) {
      event.preventDefault();
      this.router.navigate(['/create-habit'])
    }
  }


}
