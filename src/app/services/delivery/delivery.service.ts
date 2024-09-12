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

  createDelivery({
    deliveryOrderIds,
  }: {
    deliveryOrderIds: string[];
  }): Observable<TBaseResponse<Delivery>> {
    const url = environment.BASE_URL + this._deliveryUrl;
    return this._http.post<TBaseResponse<Delivery>>(url, { deliveryOrderIds });
  }
}
