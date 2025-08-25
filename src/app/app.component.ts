import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Descodeuses-App';
  menu = [
    { name: 'Home', path: '/' },
    { name: 'To-Do', path: '/to-do' },
    { name: 'Profile', path: '' },
    { name: 'Utilisateurs', path: '/utilisateurs', role: "admin" },
    { name: 'To-Do Table', path: '/todo-table' },
    { name: 'Calculatrice', path: '/calculatrice' },
  ]
  constructor(public authService: AuthService, public route: Router) {

  }

  logout() {
    sessionStorage.clear(); // or localStorage.clear() — be consistent
    this.authService.isAdmin = false;
    this.authService.isLogin =false;
    this.route.navigateByUrl('/login'); // or homepage
  }
}
