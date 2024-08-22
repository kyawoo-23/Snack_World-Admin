import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { AdminRole } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleService {
  private readonly _roleUrl = 'admin-roles';

  private readonly _http = inject(HttpClient);

  getAdminRoleList(): Observable<TBaseResponse<AdminRole[]>> {
    const url = environment.BASE_URL + this._roleUrl;
    return this._http.get<TBaseResponse<AdminRole[]>>(url);
  }
}
