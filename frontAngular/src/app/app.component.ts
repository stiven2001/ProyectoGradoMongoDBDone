import { Component } from '@angular/core';
import { AuthServiceService } from './home/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    mostrarNavbar = false;

  title = 'ROLES Y PERMISOS';

    constructor(private authService: AuthServiceService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(status => this.mostrarNavbar = status);
    this.authService.checkToken(); // revisa si ya hay token al iniciar
  }

  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}


}
