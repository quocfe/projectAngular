import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from '../rest-api/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken!: string | null;
  public isAuthorized = false;
  public isAdmin!: boolean;
  url = 'http://localhost:3000/v1/api/auth/refreshToken';

  constructor(
    private rest: RestApiService,
    private router: Router,
    private location: Location
  ) {
    this.getAccessToken();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.accessToken && event.url === '/auth/login') {
          this.location.back();
        }
      }
    });
  }

  getAccessToken() {
    const token = localStorage.getItem('token');
    this.accessToken = token;
    return this.accessToken;
  }
  async refreshToken() {
    const refreshTokenDB: string | null = localStorage.getItem('refreshToken');
    const refreshToken = await this.rest.post(this.url, {
      refreshToken: refreshTokenDB,
    });
    return refreshToken;
  }

  logout() {
    this.isAuthorized = false;
  }
}
