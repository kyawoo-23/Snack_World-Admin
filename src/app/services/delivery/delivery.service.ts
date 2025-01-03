import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { Delivery } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private readonly _deliveryUrl = 'delivery';

  private readonly _http = inject(HttpClient);

  startDelivery(deliveryId: string): Observable<TBaseResponse<Delivery>> {
    const url =
      environment.BASE_URL + this._deliveryUrl + `/${deliveryId}/start`;
    return this._http.post<TBaseResponse<Delivery>>(url, {});
  }

  endDelivery(deliveryId: string): Observable<TBaseResponse<Delivery>> {
    const url = environment.BASE_URL + this._deliveryUrl + `/${deliveryId}/end`;
    return this._http.post<TBaseResponse<Delivery>>(url, {});
  }

  getDeliveryList(): Observable<TBaseResponse<Delivery[]>> {
    const url = environment.BASE_URL + this._deliveryUrl;
    return this._http.get<TBaseResponse<Delivery[]>>(url);
  }

  getDeliveryDetails(deliveryId: string): Observable<TBaseResponse<Delivery>> {
    const url = environment.BASE_URL + this._deliveryUrl + `/${deliveryId}`;
    return this._http.get<TBaseResponse<Delivery>>(url);
  }

  createDelivery({
    deliveryOrderIds,
    deliveryCode,
    deliveryName,
    adminId,
  }: {
    deliveryOrderIds: string[];
    deliveryCode: string;
    deliveryName: string;
    adminId: string;
  }): Observable<TBaseResponse<Delivery>> {
    const url = environment.BASE_URL + this._deliveryUrl;
    return this._http.post<TBaseResponse<Delivery>>(url, {
      deliveryOrderIds,
      deliveryCode,
      deliveryName,
      adminId,
    });
  }
}
