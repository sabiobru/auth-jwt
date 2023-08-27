import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
  }

  getIfLogged() {
    this.isLogged = localStorage.getItem('isAuth');
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout();
    this.getIfLogged();
    this.cdr.detectChanges();
    this.router.navigate(['/auth']);
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }
}
