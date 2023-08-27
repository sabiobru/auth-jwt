import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout(); // Chama o método de logout do AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }
}
