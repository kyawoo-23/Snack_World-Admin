import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TLoginRequest, TLoginResponse } from '@models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _authUrl = 'admin';

  private readonly _httpBackend = inject(HttpClient);

  constructor(handler: HttpBackend) {
    this._httpBackend = new HttpClient(handler);
  }

  login(request: TLoginRequest): Observable<TLoginResponse> {
    // console.log('Login request:', environment.BASE_URL);
    const url = environment.BASE_URL + this._authUrl + '/login';
    const res = this._httpBackend.post<TLoginResponse>(url, request);
    return res;
  }

  logout() {
    // Your logout code goes here
  }
}
