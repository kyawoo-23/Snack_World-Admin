import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { Variant } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  private readonly _variantUrl = 'variant';

  private readonly _http = inject(HttpClient);

  getVariantList(): Observable<TBaseResponse<Variant[]>> {
    const url = environment.BASE_URL + this._variantUrl;
    return this._http.get<TBaseResponse<Variant[]>>(url);
  }

  getVariantDetails(id: string): Observable<TBaseResponse<Variant>> {
    const url = environment.BASE_URL + this._variantUrl + '/' + id;
    return this._http.get<TBaseResponse<Variant>>(url);
  }

  createVariant(request: Variant): Observable<TBaseResponse<Variant>> {
    const url = environment.BASE_URL + this._variantUrl;
    return this._http.post<TBaseResponse<Variant>>(url, request);
  }

  editVariantDetails(
    id: string,
    request: Variant,
  ): Observable<TBaseResponse<Variant>> {
    const url = environment.BASE_URL + this._variantUrl + '/' + id;
    return this._http.patch<TBaseResponse<Variant>>(url, request);
  }
}
