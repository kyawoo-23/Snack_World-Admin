import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { Vendor } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private readonly _vendorUrl = 'vendor';

  private readonly _http = inject(HttpClient);

  getVendorList(): Observable<TBaseResponse<Vendor[]>> {
    const url = environment.BASE_URL + this._vendorUrl;
    return this._http.get<TBaseResponse<Vendor[]>>(url);
  }

  getVendorDetails(id: string): Observable<TBaseResponse<Vendor>> {
    const url = environment.BASE_URL + this._vendorUrl + '/' + id;
    return this._http.get<TBaseResponse<Vendor>>(url);
  }

  createVendor(request: Vendor): Observable<TBaseResponse<Vendor>> {
    const url = environment.BASE_URL + this._vendorUrl;
    return this._http.post<TBaseResponse<Vendor>>(url, request);
  }

  editVendorDetails(
    id: string,
    request: Vendor,
  ): Observable<TBaseResponse<Vendor>> {
    const url = environment.BASE_URL + this._vendorUrl + '/' + id;
    return this._http.patch<TBaseResponse<Vendor>>(url, request);
  }

  toggleVendorStatus(id: string): Observable<TBaseResponse<Vendor>> {
    const url =
      environment.BASE_URL + this._vendorUrl + '/' + id + '/toggle-status';
    return this._http.patch<TBaseResponse<Vendor>>(url, {});
  }
}
