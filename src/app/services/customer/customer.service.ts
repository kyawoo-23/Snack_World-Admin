import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TBaseResponse } from '@models/index';
import { Customer } from 'app/prisma-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly _customerUrl = 'customer';

  private readonly _http = inject(HttpClient);

  getCustomerList(): Observable<TBaseResponse<Customer[]>> {
    const url = environment.BASE_URL + this._customerUrl;
    return this._http.get<TBaseResponse<Customer[]>>(url);
  }
}
