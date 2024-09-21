import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { VendorRemark } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorRemarkService {
  private readonly _vendorRemarkUrl = 'vendor-remark';

  private readonly _http = inject(HttpClient);

  getVendorRemarkReport({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): Observable<TBaseResponse<VendorRemark[]>> {
    const url =
      environment.BASE_URL +
      this._vendorRemarkUrl +
      `?startDate=${startDate}&endDate=${endDate}`;
    return this._http.get<TBaseResponse<VendorRemark[]>>(url);
  }

  getVendorRemarkList(id: string): Observable<TBaseResponse<VendorRemark[]>> {
    const url = environment.BASE_URL + this._vendorRemarkUrl + `/${id}`;
    return this._http.get<TBaseResponse<VendorRemark[]>>(url);
  }

  createVendorRemark(
    id: string,
    content: string,
  ): Observable<TBaseResponse<VendorRemark>> {
    const url = environment.BASE_URL + this._vendorRemarkUrl;
    return this._http.post<TBaseResponse<VendorRemark>>(url, {
      vendorId: id,
      content,
    });
  }
}
