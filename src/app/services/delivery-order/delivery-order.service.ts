import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { DeliveryOrder } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryOrderService {
  private readonly _deliveryOrderUrl = 'delivery-order';

  private readonly _http = inject(HttpClient);

  getDeliveryOrderList(): Observable<TBaseResponse<DeliveryOrder[]>> {
    const url =
      environment.BASE_URL +
      this._deliveryOrderUrl +
      '?type=REQUEST&status=NEW';
    return this._http.get<TBaseResponse<DeliveryOrder[]>>(url);
  }
}
