import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLogged: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getIfLogged();
      }
    });
   }

  ngOnInit(): void {
    this.getIfLogged();
  }


  logout(): void {
    this.authService.logout();
    this.getIfLogged();
    this.cdr.detectChanges();
    this.router.navigate(['/auth']);
  }

  getIfLogged() {
    this.isLogged = localStorage.getItem('isAuth');
    this.cdr.detectChanges();
    if(this.isLogged === 'false'){
      this.logout()
    }
    this.cdr.detectChanges();
  }
}
