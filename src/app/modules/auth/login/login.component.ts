//modules/auth/login/login.component
import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {
    username: '',
    password: ''
  };
  isLoggedIn: boolean = false;
  username: any = '';
  constructor(private authService: AuthService, private router: Router) {
    this.updateLoginStatus();
  }

  private updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  login(): void {
    this.authService.login(this.credentials).subscribe(
      response => {
        if (response.success) {
          this.router.navigate(['/home']); // Redireciona para a página inicial após o login bem-sucedido
        } else {
          console.error('Erro de autenticação:', response.message);
        }
      },
      error => {
        console.error('Erro de autenticação:', error);
      }
    );
  }
  register(): void {
    this.router.navigate(['/auth/register']);
  }

  logout(): void {
    this.authService.logout();
    this.updateLoginStatus();
    this.router.navigate(['/auth']);
  }
}
