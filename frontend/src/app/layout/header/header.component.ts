import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  constructor(
    public data: DataService,
    private router: Router,
    public authService: AuthService
  ) {
    this.data.getProfile();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !this.router.url.includes('login');
      }
    });
  }
  ngOnInit() {}

  async logout() {
    this.data.isLogined = false;
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
