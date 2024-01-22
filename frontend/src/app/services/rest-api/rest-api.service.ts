import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  async get(link: string) {
    return await firstValueFrom(this.http.get(link));
  }

  async getOne(link: string, id: string | null) {
    return await firstValueFrom(this.http.get(`${link}/${id}`));
  }

  async post(link: string, body: any) {
    return await firstValueFrom(this.http.post(link, body));
  }

  async put(link: string, id: string, body: any) {
    return await firstValueFrom(this.http.put(`${link}/${id}`, body));
  }

  async delete(link: String, id: String) {
    return await firstValueFrom(this.http.delete(`${link}/${id}`));
  }
}
