import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  credentials = {
    username: '',
    password: '',
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImJydW5vc2FiaW8iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjkzMTI5NDM3LCJleHAiOjE2OTMxMzMwMzd9.slWrZ4g2rKVrImXaiYEOIXE2Pp18ay1U41QCRRORbnM"

  };

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.register(this.credentials).subscribe(
      response => {
        if (response['token'] !== '') {
          this.router.navigate(['/auth']);
        } else {
          console.error('Erro no registro:', response.message);
        }
      },
      error => {
        console.error('Erro no registro:', error);
      }
    );
  }

  return(): void{
    this.router.navigate(['/auth']);
  }
}
