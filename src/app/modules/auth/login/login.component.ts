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

  constructor(private authService: AuthService, private router: Router) {}

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


  logout(): void {
    this.authService.logout(); // Chama o método de logout do AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }
}
