import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { Admin } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly _accountUrl = 'admin';

  private readonly _http = inject(HttpClient);

  getAdminList(): Observable<TBaseResponse<Admin[]>> {
    const url = environment.BASE_URL + this._accountUrl;
    return this._http.get<TBaseResponse<Admin[]>>(url);
  }

  getAdminDetails(id: string): Observable<TBaseResponse<Admin>> {
    const url = environment.BASE_URL + this._accountUrl + '/' + id;
    return this._http.get<TBaseResponse<Admin>>(url);
  }

  getAdminProfile(): Observable<TBaseResponse<Admin>> {
    const url = environment.BASE_URL + this._accountUrl + '/profile';
    return this._http.get<TBaseResponse<Admin>>(url);
  }

  resetAdminPassword(id: string): Observable<TBaseResponse<Admin>> {
    const url =
      environment.BASE_URL + this._accountUrl + '/' + id + '/reset-password';
    return this._http.patch<TBaseResponse<Admin>>(url, {});
  }

  toggleAdminStatus(id: string): Observable<TBaseResponse<Admin>> {
    const url =
      environment.BASE_URL + this._accountUrl + '/' + id + '/toggle-status';
    return this._http.patch<TBaseResponse<Admin>>(url, {});
  }

  editAdminDetails(
    id: string,
    request: Admin,
  ): Observable<TBaseResponse<Admin>> {
    const url = environment.BASE_URL + this._accountUrl + '/' + id;
    return this._http.patch<TBaseResponse<Admin>>(url, request);
  }

  createAdmin(request: Admin): Observable<TBaseResponse<Admin>> {
    const url = environment.BASE_URL + this._accountUrl;
    return this._http.post<TBaseResponse<Admin>>(url, request);
  }
}
